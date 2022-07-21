const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const FormScienceDaySurvey = sequelize.define('form_science_day_survey', {
  form_science_day_survey_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  id_card: {
    type: Sequelize.CHAR(13),
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

(async () => {
  await FormScienceDaySurvey.sync({ force: false });
})();

module.exports = FormScienceDaySurvey;
