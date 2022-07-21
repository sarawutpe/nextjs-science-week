const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const FormScienceDayRadio = sequelize.define('form_science_day_radioes', {
  form_science_day_radio_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  form_science_day_id: {
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
  await FormScienceDayRadio.sync({ force: false });
})();

module.exports = FormScienceDayRadio;
