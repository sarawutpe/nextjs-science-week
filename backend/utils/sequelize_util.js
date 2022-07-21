const Member = require('../models/member_model');
const Admin = require('../models/admin_model');

module.exports = {
  // check account exists
  checkAccountExist: async (username, email) => {
    try {
      // find one account
      const memberUsernameExists = await Member.findOne({ where: { username: username ? username : '' } });
      const memberEmailExists = await Member.findOne({ where: { email: email ? email : '' } });
      const adminUsernameExists = await Admin.findOne({ where: { username: username ? username : '' } });
      const adminEmailExists = await Admin.findOne({ where: { email: email ? email : '' } });
      // response
      if ((memberUsernameExists && memberEmailExists) || (adminUsernameExists && adminEmailExists)) {
        return { status: false, data: 'ชื่อผู้ใช้และอีเมลนี้ถูกใช้งานแล้ว' };
      } else if (memberUsernameExists || adminUsernameExists) {
        return { status: false, data: 'มีชื่อผู้ใช้นี้อยู่แล้ว' };
      } else if (memberEmailExists || adminEmailExists) {
        return { status: false, data: 'อีเมลนี้ถูกใช้งานแล้ว' };
      }
      return { status: true, data: null };
    } catch (error) {
      return { status: false, data: error.name };
    }
  },
};
