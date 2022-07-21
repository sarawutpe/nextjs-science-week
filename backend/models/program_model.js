const Sequelize = require('sequelize');
const sequelize = require('../db_config');
const Coordinator = require('./coordinator_model');
const Documents = require('./documents_model');
const Links = require('./links_model');
const Competition = require('./competition_model');
const CompetitionResult = require('./competition_results_model');

const Program = sequelize.define('programs', {
  program_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  activity_id: {
    type: Sequelize.INTEGER(11),
  },
  activity_level_id: {
    type: Sequelize.INTEGER(11),
  },
  limit_per_advisor: {
    type: Sequelize.INTEGER(11),
  },
  limit_per_team: {
    type: Sequelize.INTEGER(11),
  },
  limit_per_school: {
    type: Sequelize.INTEGER(11),
  },
  limit_per_program: {
    type: Sequelize.INTEGER(11),
  },
  apply_from: {
    type: Sequelize.DATE,
  },
  apply_to: {
    type: Sequelize.DATE,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  result_date: {
    type: Sequelize.DATE,
  },
  location: {
    type: Sequelize.STRING(255),
  },
  confirm: {
    type: Sequelize.BOOLEAN,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

// Associations Programs and Documents
Program.hasMany(Documents, { foreignKey: 'program_id' });
Documents.belongsTo(Program, { foreignKey: 'program_id' });

// Associations Programs and Coordinator
Program.hasMany(Coordinator, { foreignKey: 'program_id' });
Coordinator.belongsTo(Program, { foreignKey: 'program_id' });

// Associations Programs and Links
Program.hasMany(Links, { foreignKey: 'program_id' });
Links.belongsTo(Program, { foreignKey: 'program_id' });

// Associations Program and Competition
Program.hasMany(Competition, { foreignKey: 'program_id' });
Competition.belongsTo(Program, { foreignKey: 'program_id' });

// Associations Program and Competition Result
Program.hasMany(CompetitionResult, { foreignKey: 'program_id' });
CompetitionResult.belongsTo(Program, { foreignKey: 'program_id' });

(async () => {
  await Program.sync({ force: false });
})();

module.exports = Program;
