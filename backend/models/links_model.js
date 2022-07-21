const Sequelize = require("sequelize");
const sequelize = require("../db_config");

const Links = sequelize.define("links", {
  link_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  program_id: {
    type: Sequelize.INTEGER(11),
  },
  link_name: {
    type: Sequelize.STRING(255),
  },
  link_src: {
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
  await Links.sync({ force: false });
})();

module.exports = Links;