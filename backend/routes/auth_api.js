const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('../jwt');
const nodeMailer = require('../utils/node_mailer.js');
const Member = require('../models/member_model');
const Admin = require('../models/admin_model');
const sequelizeUtil = require('../utils/sequelize_util');
require('dotenv').config();

// Test Login
router.post('/test/login', async (req, res) => {
  try {
    const payload = { auth: true, id: 1, level: 1 };
    const token = jwt.sign(payload, 60);
    res.json({ status: true, data: token });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Check Login
const checkLogin = async (username) => {
  const resultMember = await Member.findOne({ where: { username: username } });
  const resultAdmin = await Admin.findOne({ where: { username: username } });
  return resultMember ? resultMember : resultAdmin;
};

// POST: Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Wait check login
    const result = await checkLogin(username);
    // if account not exists
    if (result) {
      // check suspend = false
      if (!result.suspend) {
        // compare password
        const comparePassword = bcrypt.compareSync(password, result.password);
        if (comparePassword) {
          // res
          const user = {
            id: result.type === 'member' ? result.member_id : result.admin_id,
            username: result.username,
            type: result.type,
            level: result.type === 'admin' ? result.level : null,
          };
          res.json({ status: true, data: user });
        } else {
          res.json({ status: false, data: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }
      } else {
        res.json({ status: false, data: 'บัญชีผู้ใช้ถูกระงับการใช้งาน', result: result });
      }
    } else {
      res.json({ status: false, data: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// POST: Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    // fetch
    const email = req.body.email;
    const memberEmailExists = await Member.findOne({ where: { email: email } });
    const adminEmailExists = await Admin.findOne({ where: { email: email } });
    // check result
    const result = memberEmailExists ? memberEmailExists : adminEmailExists;
    // if email not empty
    if (result) {
      const payload = {
        action: 'reset-password',
        id: result.member_id ? result.member_id : result.admin_id,
        type: result.type,
      };
      // expires in 30 minutes
      const token = jwt.sign(payload, 30);
      const host = process.env.URL;
      const resetPasswordLink = `${host}/auth/reset_password?token=${token}`;
      // send to mail
      await nodeMailer(
        'mr.sarawutpe@gmail.com',
        `${email}`,
        'Reset your nextapp password',
        'คำขอรีเซ็ตรหัสผ่าน nextapp ของคุณ',
        `<b>ลิ้งก์หมดอายุใน 30 นาที</b> <br> <a href="${resetPasswordLink}">ลิ้งก์สำหรับรีเซ็ตรหัสผ่านของคุณ</a>`
      );
      res.json({ status: true, data: 'ระบบได้ส่งลิ้งก์รีเซ็ตรหัสผ่านไปยังอีเมล' });
    } else {
      res.json({ status: false, data: 'ไม่พบอีเมลในระบบ' });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Test verify-token
router.get('/test/verify-token/:token', jwt.verify, (req, res) => {
  try {
    res.json({ auth: req.auth, id: req.id, level: req.level });
  } catch (error) {
    res.json({ error: true, data: error.name });
  }
});

// GET: Validate JSON Web Tokens
router.get('/access-token', jwt.verify, (req, res) => {
  try {
    res.json({ auth: req.auth, id: req.id, level: req.level });
  } catch (error) {
    res.json({ error: true, data: error.name });
  }
});

// GET: Get Account By Username
router.get('/account/:username', async (req, res) => {
  try {
    const { username, level } = req.body;
    if (level === 1 || level === 2 || level === 3 || level === 4 || level === 5) {
      const result = await Admin.findOne({ where: { username: username } });
      res.json({ status: true, data: result });
    } else if (level === 'null') {
      const result = await Member.findOne({ where: { username: username } });
      res.json({ status: true, data: result });
    } else {
      res.json({ status: true, data: 'เกิดข้อผิดพลาด' });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Verify reset password
router.get('/reset-password/:token', jwt.verifyResetPassword, (req, res) => {
  try {
    res.json({ status: true, action: req.action, id: req.id, type: req.type });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// update new password
const updatePassword = async (id, type, password) => {
  if (type === 'member') {
    const result = await Member.update(
      { password: password },
      { where: { member_id: id } }
    );
    return result;
  } else if (type === 'admin') {
    const result = await Admin.update(
      { password: password },
      { where: { admin_id: id } }
    );
    return result;
  }
};

// POST: Verify TOKEN and reset password
router.put(
  '/reset-password/:token/:password',
  jwt.verifyResetPassword,
  async (req, res) => {
    try {
      // hash password
      const password = bcrypt.hashSync(req.params.password, 10);
      // note req.id and req.type get from jwt
      const result = await updatePassword(req.id, req.type, password);
      // response
      if (result) {
        res.json({ status: true, data: 'รีเซ็ตรหัสผ่านสำเร็จ' });
      } else {
        res.json({ status: false, data: 'เกิดข้อผิดพลาด' });
      }
    } catch (error) {
      res.json({ status: false, data: error.name });
    }
  }
);

// POST: Register
router.post('/register', async (req, res) => {
  try {
    const { username, email } = req.body;
    // wait check account exists
    const result = await sequelizeUtil.checkAccountExist(username, email);
    // if username and email available!
    if (result.status) {
      // hash password
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      await Member.create(req.body);
      res.json({ status: true, data: 'ลงทะเบียนสำเร็จ' });
    } else {
      res.json({ status: false, data: result.data });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Check Account Find current password
const findCurrentPassword = async (id, type) => {
  if (type === 'member') {
    const result = await Member.findOne({ where: { member_id: id } });
    return result;
  } else if (type === 'admin') {
    const result = await Admin.findOne({ where: { admin_id: id } });
    return result;
  } else {
    return null;
  }
};

// Update new password
const updataNewPassword = async (id, hashPassword, type) => {
  if (type === 'member') {
    const result = await Member.update(
      { password: hashPassword },
      { where: { member_id: id } }
    );
    return result;
  } else if (type === 'admin') {
    const result = await Admin.update(
      { password: hashPassword },
      { where: { admin_id: id } }
    );
    return result;
  } else {
    return null;
  }
};

// PUT: Update password member and admin by check current password
router.put('/password/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, current_password, new_password } = req.body;
    // Find current password
    const account = await findCurrentPassword(id, type);
    // Compare current password
    const comparePassword = bcrypt.compareSync(current_password, account.password);
    if (comparePassword) {
      //  Set new password
      const hashPassword = bcrypt.hashSync(new_password, 10);
      const result = await updataNewPassword(id, hashPassword, type);
      // Check update password result
      if (result) {
        res.json({ status: true, data: 'เปลี่ยนรหัสผ่านสำเร็จ' });
      } else {
        res.json({ status: false, data: result });
      }
    } else {
      res.json({ status: false, data: 'รหัสผ่านเดิมไม่ถูกต้อง' });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
