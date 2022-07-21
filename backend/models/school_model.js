const Sequelize = require('sequelize');
const sequelize = require('../db_config');
const Member = require('./member_model');

const School = sequelize.define('schools', {
  school_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  school_type: {
    type: Sequelize.TINYINT(1),
  },
  name: {
    type: Sequelize.STRING(255),
  },
  address: {
    type: Sequelize.STRING(255),
  },
  sub_district: {
    type: Sequelize.STRING(255),
  },
  district: {
    type: Sequelize.STRING(255),
  },
  province: {
    type: Sequelize.STRING(255),
  },
  postcode: {
    type: Sequelize.CHAR(5),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

// Associations School and Member
School.hasMany(Member, { foreignKey: 'school_id' });
Member.belongsTo(School, { foreignKey: 'school_id' });

(async () => {
  await School.sync({ force: false });
})();

module.exports = School;
