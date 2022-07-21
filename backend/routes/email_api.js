const express = require('express');
const router = express.Router();
const { Op, Sequelize, QueryTypes, where } = require('sequelize');
const Member = require('../models/member_model');
const Program = require('../models/program_model');
const Competition = require('../models/competition_model');
const nodeMailer = require('../utils/node_mailer.js');
require('dotenv').config();

// Multi send email
const multiSendEmail = async (subject, message, emailList) => {
  try {
    if (emailList.length) {
      for await (const [i] of emailList.entries()) {
        await nodeMailer(
          '<mr.sarawutpe@gmail.com>',
          `${emailList[i].member?.email}`,
          `${subject}`,
          'แจ้งข่าวสาร',
          `${message}`
        );
      }
      return { status: true, data: null };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
};

// GET: Send Email To Member
router.post('/send', async (req, res) => {
  try {
    const { activity, activity_level, subject, message } = req.body;
    const emailListQuery = await Program.findAll({
      include: {
        attributes: ['competition_id'],
        model: Competition,
        require: true,
        include: {
          attributes: ['email'],
          model: Member,
          required: true,
        },
      },
      group: ['email'],
      where: {
        [Op.and]: [
          {
            activity_id: {
              [Op.eq]: activity,
            },
          },
          {
            activity_level_id: {
              [Op.eq]: activity_level,
            },
          },
        ],
      },
    });

    // parse to json
    var parseJson = JSON.parse(JSON.stringify(await emailListQuery));
    var emailList = await parseJson[0]?.competitions;

    if (emailList?.length) {
      // wait sent email
      const sendResult = await multiSendEmail(subject, message, emailList);
      // response
      if (sendResult?.status) {
        res.json({ status: true, data: 'ส่งอีเมล์สำเร็จ' });
      } else {
        res.json(sendResult);
      }
    } else {
      res.json({ status: false, data: 'ไม่พบอีเมล์สำหรับกิจกรรมนี้' });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
