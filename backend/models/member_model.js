const Sequelize = require("sequelize");
const sequelize = require("../db_config");
const Competition = require('./competition_model');

const Member = sequelize.define("members", {
  member_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  school_id: {
    type: Sequelize.INTEGER(11)
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
  phone_number: {
    type: Sequelize.STRING(255),
  },
  address: {
    type: Sequelize.STRING(255),
  },
  type: {
    type: Sequelize.STRING(6),
  },
  suspend: {
    type: Sequelize.BOOLEAN,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  }
});

// Associations Member and Competition
Member.hasMany(Competition, { foreignKey: 'member_id' });
Competition.belongsTo(Member, { foreignKey: 'member_id' });

(async () => {
  await Member.sync({ force: false });
})();

module.exports = Member;