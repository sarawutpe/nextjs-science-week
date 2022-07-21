const Sequelize = require("sequelize");
const sequelize = require("../db_config");
const Program = require('./program_model');

const ActivityLevel = sequelize.define("activity_levels", {
  activity_level_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(255),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  }
});

// Associations Activity and Program
ActivityLevel.hasMany(Program, { foreignKey: 'activity_level_id' });
Program.belongsTo(ActivityLevel, { foreignKey: 'activity_level_id' });

(async () => {
  await ActivityLevel.sync({ force: false });
})();

module.exports = ActivityLevel;