const Sequelize = require('sequelize');
const sequelize = require('../db_config');
const Program = require('./program_model');
const FormActivity = require('./form_activity_model');

const Activity = sequelize.define('activities', {
  activity_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  admin_id: {
    type: Sequelize.INTEGER(11),
  },
  activity_name: {
    type: Sequelize.STRING(255),
  },
  activity_type: {
    type: Sequelize.TINYINT(1),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

// Associations Activity and Program
Activity.hasMany(Program, { foreignKey: 'activity_id' });
Program.belongsTo(Activity, { foreignKey: 'activity_id' });

// Associations Activity and Form Activity
Activity.hasMany(FormActivity, { foreignKey: 'activity_id' });
FormActivity.belongsTo(Activity, { foreignKey: 'activity_id' });

(async () => {
  await Activity.sync({ force: false });
})();

module.exports = Activity;
