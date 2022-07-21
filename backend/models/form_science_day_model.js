const Sequelize = require("sequelize");
const sequelize = require("../db_config");
const FormScienceDayRadio = require('../models/form_science_day_radio_model');
const FormScienceDayResponse = require("./form_science_day_response_model");

const FormScienceDay = sequelize.define("form_science_days", {
  form_science_day_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  no: {
    type: Sequelize.INTEGER(11),
  },
  type: {
    type: Sequelize.TINYINT(1),
  },
  name: {
    type: Sequelize.STRING(255),
  },
  required: {
    type: Sequelize.TINYINT(1),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  }
});

// Associations Form Science Day and Form Form Science Day Radio
FormScienceDay.hasMany(FormScienceDayRadio, { foreignKey: 'form_science_day_id' });
FormScienceDayRadio.belongsTo(FormScienceDay, { foreignKey: 'form_science_day_id' });

// Associations Form Science Day and Form Form Science Day Response
FormScienceDay.hasMany(FormScienceDayResponse, { foreignKey: 'form_science_day_id' });
FormScienceDayResponse.belongsTo(FormScienceDay, { foreignKey: 'form_science_day_id' });

(async () => {
  await FormScienceDay.sync({ force: false });
})();

module.exports = FormScienceDay;