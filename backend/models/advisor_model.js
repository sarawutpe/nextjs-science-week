const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const Advisor = sequelize.define('advisors', {
  advisor_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  competition_id: {
    type: Sequelize.INTEGER(11),
  },
  advisor_name: {
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
  await Advisor.sync({ force: false });
})();

module.exports = Advisor;
