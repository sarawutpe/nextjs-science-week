const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const CompetitionResult = sequelize.define('competition_results', {
  competition_result_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  program_id: {
    type: Sequelize.INTEGER(11),
  },
  competition_id: {
    type: Sequelize.INTEGER(11),
  },
  award_level_id: {
    type: Sequelize.STRING(255),
  },
  amount: {
    type: Sequelize.FLOAT(10,2),
  },
  proof_of_payment: {
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
  await CompetitionResult.sync({ force: false });
})();

module.exports = CompetitionResult;
