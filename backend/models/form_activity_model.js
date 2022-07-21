const Sequelize = require("sequelize");
const sequelize = require("../db_config");
const FormActivityResponse = require("./form_activity_response_model");
const FormActivityRadio = require("../models/form_activity_radio_model");

const FormActivity = sequelize.define("form_activities", {
  form_activity_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  activity_id: {
    type: Sequelize.INTEGER(11),
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
FormActivity.hasMany(FormActivityRadio, { foreignKey: 'form_activity_id' });
FormActivityRadio.belongsTo(FormActivity, { foreignKey: 'form_activity_id' });

// Associations Form Activity and Form Activity Response
FormActivity.hasMany(FormActivityResponse, { foreignKey: 'form_activity_id' });
FormActivityResponse.belongsTo(FormActivity, { foreignKey: 'form_activity_id' });

(async () => {
  await FormActivity.sync({ force: false });
})();

module.exports = FormActivity;