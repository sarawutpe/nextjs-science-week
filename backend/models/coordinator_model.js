const Sequelize = require("sequelize");
const sequelize = require("../db_config");

const Coordinator = sequelize.define("coordinators", {
  coordinator_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  program_id: {
    type: Sequelize.INTEGER(11),
  },
  coordinator_name: {
    type: Sequelize.STRING(255),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  }
});

(async () => {
  await Coordinator.sync({ force: false });
})();

module.exports = Coordinator;