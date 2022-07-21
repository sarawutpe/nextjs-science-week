const Sequelize = require("sequelize");
const sequelize = require("../db_config");

const Site = sequelize.define("sites", {
  site_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  site_title: {
    type: Sequelize.STRING(255),
  },
  site_header: {
    type: Sequelize.STRING(255),
  },
  site_banner: {
    type: Sequelize.STRING(255),
  },
  site_footer: {
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
  await Site.sync({ force: false });
})();

module.exports = Site;
