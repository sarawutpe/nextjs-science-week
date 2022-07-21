const express = require('express');
const router = express.Router();
const { Op, Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');
const Activity = require('../models/activity_model');
const ActivityLevel = require('../models/activty_level_model');
const Program = require('../models/program_model');
const Coordinator = require('../models/coordinator_model');
const AwardAttachment = require('../models/award_attachment_model');
const formidable = require('formidable');
const uploadFile = require('../utils/upload_file');

// POST: Add Activity
router.post('/activity', async (req, res) => {
  try {
    const result = await Activity.create(req.body);
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GEt: Activity Details
router.get('/activity-detail/:id', async (req, res) => {
  try {
    const result = await Program.findAll({
      include: [
        {
          model: ActivityLevel,
          require: true,
        },
      ],
      where: {
        activity_id: {
          [Op.eq]: req.params.id,
        },
      },
      order: [
        [ActivityLevel, 'activity_level_id', 'ASC'],
      ],
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Activity with search
router.get('/activity', async (req, res) => {
  try {
    const search = req.query.search;
    const result = await Activity.findAll({
      where: {
        [Op.and]: [
          search && {
            activity_name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Activity By Admin Id with search
router.get('/activity/admin/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const search = req.query.search;
    const result = await Activity.findAll({
      where: {
        [Op.and]: [
          {
            admin_id: {
              [Op.eq]: id,
            },
          },
          search && {
            activity_name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Activity By Id
router.get('/activity/:id', async (req, res) => {
  try {
    const result = await Activity.findAll({
      include: [
        {
          model: ActivityDoc,
          require: true,
        },
        {
          model: ActivityLink,
          require: true,
        },
      ],
      where: {
        activity_id: req.params.id,
      },
    });
    res.json({ status: true, data: result[0] });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update Activity
router.put('/activity/:id', async (req, res) => {
  try {
    const result = await Activity.update(req.body, {
      where: { activity_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete Activity By Id
router.delete('/activity/:id', async (req, res) => {
  try {
    const result = await Activity.destroy({
      where: { activity_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// POST: Add Activity Level
router.post('/activity-level', async (req, res) => {
  try {
    const result = await ActivityLevel.create(req.body);
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Activity Level
router.get('/activity-level', async (req, res) => {
  try {
    const result = await ActivityLevel.findAll();
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Activity Level By Id
router.get('/activity-level/:id', async (req, res) => {
  try {
    const result = await ActivityLevel.findOne({
      where: { activity_level_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update Activity Level By Id
router.put('/activity-level/:id', async (req, res) => {
  try {
    const result = await ActivityLevel.update(req.body, {
      where: { activity_level_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete Activity Level By Id
router.delete('/activity-level/:id', async (req, res) => {
  try {
    const result = await ActivityLevel.destroy({
      where: { activity_level_id: req.params.id },
    });
    res.json({ status: true, data: null });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});
// END


// DELETE: Coordinator
router.delete('/coordinator/:id', async (req, res) => {
  try {
    const result = await Coordinator.destroy({
      where: { coordinator_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// POST: Add award attachement
router.post('/award-attachment', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // Files is empty.
      if (!Object.keys(files).length) {
        const result = await AwardAttachment.create(fields);
        res.json({ status: true, data: result });
      } else {
        if (error) {
          res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
        } else {
          // Upload
          const upload = await uploadFile.document(files.award_attachment_path);
          if (upload.status) {
            fields.award_attachment_path = upload.data;
            const result = await AwardAttachment.create(fields);
            res.json({ status: true, data: result });
          } else {
            res.json({ status: false, data: upload.data });
          }
        }
      }
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Award Attachement
router.get('/award-attachment', async (req, res) => {
  try {
    const search = req.query.search;
    if (search) {
      const result = await AwardAttachment.findAll({
        where: {
          [Op.or]: [
            {
              award_attachment_name: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              award_attachment_path: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      });
      res.json({ status: true, data: result });
    } else {
      const result = await AwardAttachment.findAll();
      res.json({ status: true, data: result });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get Award Attachement By Id
router.get('/award-attachment/:id', async (req, res) => {
  try {
    const result = await AwardAttachment.findOne({ where: { award_attachment_id: req.params.id } });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update Award Attachement
router.put('/award-attachment/:id', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // Files is empty.
      if (!Object.keys(files).length) {
        const result = await AwardAttachment.update(fields, {
          where: { award_attachment_id: req.params.id },
        });
        res.json({ status: true, data: result });
      } else {
        if (error) {
          res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
        } else {
          // Upload
          const upload = await uploadFile.document(files.award_attachment_path);
          if (upload.status) {
            fields.award_attachment_path = upload.data;
            const result = await AwardAttachment.update(fields, {
              where: { award_attachment_id: req.params.id },
            });
            res.json({ status: true, data: result });
          } else {
            res.json({ status: false, data: upload.data });
          }
        }
      }
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete Award Attachement
router.delete('/award-attachment/:id', async (req, res) => {
  try {
    const result = await AwardAttachment.destroy({
      where: { award_attachment_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
