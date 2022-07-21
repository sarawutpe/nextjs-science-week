const Sequelize = require("sequelize");
const sequelize = require("../db_config");

const AwardAttachment = sequelize.define("award_attachments", {
  award_attachment_id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  award_attachment_name: {
    type: Sequelize.STRING(255),
  },
  award_attachment_path: {
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
  await AwardAttachment.sync({ force: false });
})();

module.exports = AwardAttachment;