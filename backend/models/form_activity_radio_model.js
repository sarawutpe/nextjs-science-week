const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const FormActivityRadio = sequelize.define('form_activity_radioes', {
  form_activity_radio_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  form_activity_id: {
    type: Sequelize.INTEGER(11),
  },
  name: {
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
  await FormActivityRadio.sync({ force: false });
})();

module.exports = FormActivityRadio;
