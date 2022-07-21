const Sequelize = require("sequelize");
const sequelize = require("../db_config");

const Documents = sequelize.define("documents", {
  document_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  program_id: {
    type: Sequelize.INTEGER(11),
  },
  document_name: {
    type: Sequelize.STRING(255),
  },
  document_src: {
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
  await Documents.sync({ force: false });
})();

module.exports = Documents;