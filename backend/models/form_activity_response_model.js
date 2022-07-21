const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const FormActivityResponse = sequelize.define('form_activity_responses', {
  form_activity_response_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: Sequelize.INTEGER(11),
  },
  form_activity_id: {
    type: Sequelize.INTEGER(11),
  },
  response: {
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
  await FormActivityResponse.sync({ force: false });
})();

module.exports = FormActivityResponse;
