const Sequelize = require("sequelize");
const sequelize = require("../db_config");

const Admin = sequelize.define("admins", {
  admin_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING(255),
  },
  password: {
    type: Sequelize.STRING(60),
  },
  name: {
    type: Sequelize.STRING(255),
  },
  picture: {
    type: Sequelize.STRING(255),
  },
  email: {
    type: Sequelize.STRING(255),
  },
  type: {
    type: Sequelize.STRING(5),
  },
  level: {
    type: Sequelize.TINYINT(1),
  },
  suspend: {
    type:  Sequelize.TINYINT(1),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  }
});

(async () => {
  await Admin.sync({ force: false });
})();

module.exports = Admin;