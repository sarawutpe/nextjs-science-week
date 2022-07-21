const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Member = require('../models/member_model');
const School = require('../models/school_model');
const Admin = require('../models/admin_model');
const formidable = require('formidable');
const sequelizeUtil = require('../utils/sequelize_util');
const uploadFile = require('../utils/upload_file');

// POST: Add Member
router.post('/member', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // all fields
      const { username, email, password } = fields;
      // wait check account exists
      const result = await sequelizeUtil.checkAccountExist(username, email);
      if (result.status) {
        // if password ready!
        if (password) {
          fields.password = bcrypt.hashSync(password, 10);
        }
        // if image empty!
        if (!Object.keys(files).length) {
          // wait create
          const result = await Member.create(fields);
          res.json({ status: true, data: result });
        } else {
          // if error max file size
          if (error) {
            res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
          } else {
            // upload image
            const upload = await uploadFile.image(files.picture);
            if (upload.status) {
              fields.picture = upload.data;
              // wait create
              const result = await Member.create(fields);
              res.json({ status: true, data: result });
            } else {
              res.json({ status: false, data: upload.data });
            }
          }
        }
      } else {
        res.json({ status: false, data: result.data });
      }
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Member
router.get('/member', async (req, res) => {
  try {
    const search = req.query.search;
    const result = await Member.findAll({
      include: {
        model: School,
        require: true,
      },
      where: search && {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            phone_number: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });

    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Member By Id
router.get('/member/:id', async (req, res) => {
  try {
    // TODO
    const result = await Member.findOne({
      include: {
        model: School,
        require: true,
      },
      where: {
        member_id: req.params.id,
      },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// Update Member
router.put('/member/:id', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // all fields
      const { username, email, password } = fields;
      // wait check account exists
      const result = await sequelizeUtil.checkAccountExist(username, email);
      // if username and email available!
      if (result.status) {
        // if password ready!
        if (password) {
          fields.password = bcrypt.hashSync(password, 10);
        }
        // if image empty!
        if (!Object.keys(files).length) {
          // wait update
          const result = await Member.update(fields, {
            where: { member_id: req.params.id },
          });
          res.json({ status: true, data: result });
        } else {
          // if error max file size
          if (error) {
            res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
          } else {
            // upload image
            const upload = await uploadFile.image(files.picture);
            if (upload.status) {
              fields.picture = upload.data;
              // wait update
              const result = await Member.update(fields, {
                where: { member_id: req.params.id },
              });
              res.json({ status: true, data: null });
            } else {
              res.json({ status: false, data: upload.data });
            }
          }
        }
      } else {
        res.json({ status: false, data: result.data });
      }
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete Member
router.delete('/member/:id', async (req, res) => {
  try {
    const result = await Member.destroy({ where: { member_id: req.params.id } });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Add Initial Admin
router.get('/initial/admin', async (req, res) => {
  try {
    const result = await Admin.findOne({ where: { level: 1 } });
    if (result) {
      res.json({ status: false, data: 'ปฏิเสธการเข้าถึง!' });
    } else {
      const hashPassword = bcrypt.hashSync('1234', 10);
      const create = await Admin.create({
        username: 'admin',
        password: hashPassword,
        name: 'แอดมิน',
        picture: '',
        email: 'admin@example.com',
        type: 'admin',
        level: 1,
        suspend: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      if (create) {
        res.json({ status: true, data: 'ตั้งค่าบัญชีแอดมินสำเร็จ...' });
      } else {
        res.json({ status: true, data: 'เกิดข้อผิดพลาด!' });
      }
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// POST: Add Admin
router.post('/admin', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // all fields
      const { username, email, password } = fields;
      // wait check account exists
      const result = await sequelizeUtil.checkAccountExist(username, email);
      if (result.status) {
        // if password ready!
        if (password) {
          fields.password = bcrypt.hashSync(password, 10);
        }
        // if image empty!
        if (!Object.keys(files).length) {
          // wait create
          const result = await Admin.create(fields);
          res.json({ status: true, data: result });
        } else {
          // if error max file size
          if (error) {
            res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
          } else {
            // upload image
            const upload = await uploadFile.image(files.picture);
            if (upload.status) {
              fields.picture = upload.data;
              // wait create
              const result = await Admin.create(fields);
              res.json({ status: true, data: result });
            } else {
              res.json({ status: false, data: upload.data });
            }
          }
        }
      } else {
        res.json({ status: false, data: result.data });
      }
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Admin
router.get('/admin', async (req, res) => {
  try {
    const search = req.query.search;
    const result = await Admin.findAll({
      where: search && {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Admin By Id
router.get('/admin/:id', async (req, res) => {
  try {
    const result = await Admin.findOne({ where: { admin_id: req.params.id } });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update Admin
router.put('/admin/:id', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // all fields
      const { username, email, password } = fields;
      // wait check account exists
      const result = await sequelizeUtil.checkAccountExist(username, email);
      // if username and email available!
      if (result.status) {
        // if password ready!
        if (password) {
          fields.password = bcrypt.hashSync(password, 10);
        }
        // if image empty!
        if (!Object.keys(files).length) {
          // wait update
          const result = await Admin.update(fields, {
            where: { admin_id: req.params.id },
          });
          res.json({ status: true, data: result });
        } else {
          // if error max file size
          if (error) {
            res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
          } else {
            // upload image
            const upload = await uploadFile.image(files.picture);
            if (upload.status) {
              fields.picture = upload.data;
              // wait update
              const result = await Admin.update(fields, {
                where: { admin_id: req.params.id },
              });
              res.json({ status: true, data: result });
            } else {
              res.json({ status: false, data: upload.data });
            }
          }
        }
      } else {
        res.json({ status: false, data: result.data });
      }
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete Admin
router.delete('/admin/:id', async (req, res) => {
  try {
    const adminNullSafety = await Admin.findOne({ where: { admin_id: req.params.id } });
    if (adminNullSafety.level == 1) {
      res.json({ status: false, data: 'ไม่สามารถลบแอดมิน!' });
    } else {
      const result = await Admin.destroy({ where: { admin_id: req.params.id } });
      res.json({ status: true, data: result });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
