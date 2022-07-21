const Sequelize = require("sequelize");
const sequelize = require("../db_config");
const CompetitionResult= require('./competition_results_model');

const AwardLevel = sequelize.define("award_levels", {
  award_level_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  award_level_name: {
    type: Sequelize.STRING(255),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  }
});

// Associations Award Level and Competition Result
AwardLevel.hasMany(CompetitionResult, { foreignKey: 'award_level_id' });
CompetitionResult.belongsTo(AwardLevel, { foreignKey: 'award_level_id' });

(async () => {
  await AwardLevel.sync({ force: false });
})();

module.exports = AwardLevel;