const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const FormRegisterActivity = sequelize.define('form_register_activity', {
  form_activity_response_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  program_id: {
    type: Sequelize.STRING(255),
  },
  name: {
    type: Sequelize.STRING(255),
  },
  email: {
    type: Sequelize.STRING(255),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

(async () => {
  await FormRegisterActivity.sync({ force: false });
})();

module.exports = FormRegisterActivity;
