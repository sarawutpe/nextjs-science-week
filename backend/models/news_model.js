const Sequelize = require('sequelize');
const sequelize = require('../db_config');

const News = sequelize.define('news', {
  news_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  news_topic: {
    type: Sequelize.STRING(255),
  },
  news_img: {
    type: Sequelize.STRING(255),
  },
  news_desc: {
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
  await News.sync({ force: false });
})();

module.exports = News;
