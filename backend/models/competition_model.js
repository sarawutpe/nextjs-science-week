const Sequelize = require('sequelize');
const sequelize = require('../db_config');
const Advisor = require('./advisor_model');
const Participant = require('./participant_model');
const CompetitionResult = require('./competition_results_model');

const Competition = sequelize.define('competitions', {
  competition_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: Sequelize.INTEGER(11),
  },
  program_id: {
    type: Sequelize.INTEGER(11),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

// Associations Competition and Advisor
Competition.hasMany(Advisor, { foreignKey: 'competition_id' });
Advisor.belongsTo(Competition, { foreignKey: 'competition_id' });

// Associations Competition and Participant
Competition.hasMany(Participant, { foreignKey: 'competition_id' });
Participant.belongsTo(Competition, { foreignKey: 'competition_id' });

// Associations Competition and Competition Result
Competition.hasOne(CompetitionResult, { foreignKey: 'competition_id' });
CompetitionResult.belongsTo(Competition, {foreignKey: 'competition_id'});

(async () => {
  await Competition.sync({ force: false });
})();

module.exports = Competition;
