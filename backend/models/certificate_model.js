const Sequelize = require("sequelize");
const sequelize = require("../db_config");

const Certificate = sequelize.define("certificates", {
  certificate_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  certificate_name: {
    type: Sequelize.STRING(255),
  },
  certificate_type: {
    type: Sequelize.TINYINT,
  },
  certificate_img: {
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
  await Certificate.sync({ force: false });
})();

module.exports = Certificate;