const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const Participant = sequelize.define('participants', {
  participant_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  competition_id: {
    type: Sequelize.INTEGER(11),
  },
  participant_name: {
    type: Sequelize.STRING(255),
  },
  participant_active: {
    type: Sequelize.TINYINT(1),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

(async () => {
  await Participant.sync({ force: false });
})();

module.exports = Participant;
