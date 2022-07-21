const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const FormScienceDayResponse = sequelize.define('form_science_day_responses', {
  form_science_day_response_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  form_science_day_survey_id: {
    type: Sequelize.INTEGER(11),
  },
  form_science_day_id: {
    type: Sequelize.INTEGER(11),
  },
  response: {
    type: Sequelize.STRING(255),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

(async () => {
  await FormScienceDayResponse.sync({ force: false });
})();

module.exports = FormScienceDayResponse;
