const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const News = require('../models/news_model');
const formidable = require('formidable');
const uploadFile = require('../utils/upload_file');

// POST: Add News
router.post('/news', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // Files is empty.
      if (!Object.keys(files).length) {
        const result = await News.create(fields);
        res.json({ status: true, data: result });
      } else {
        if (error) {
          res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
        } else {
          // Upload
          const upload = await uploadFile.image(files.news_img);
          if (upload.status) {
            fields.news_img = upload.data;
            const result = await News.create(fields);
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

// GET: Get News
router.get('/news', async (req, res) => {
  try {
    const search = req.query.search;
    if (search) {
      const result = await News.findAll({
        where: {
          [Op.or]: [
            {
              news_topic: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              news_desc: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      });
      res.json({ status: true, data: result });
    } else {
      const result = await News.findAll();
      res.json({ status: true, data: result });
    }
  } catch (error) {
    res.json({ error: true, data: error.name });
  }
});

// GET: Get News By Id
router.get('/news/:id', async (req, res) => {
  try {
    const result = await News.findOne({
      where: { news_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ error: true, data: error.name });
  }
});

// PUT: Update News
router.put('/news/:id', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // Files is empty.
      if (!Object.keys(files).length) {
        const result = await News.update(fields, {
          where: { news_id: req.params.id },
        });
        res.json({ status: true, data: result });
      } else {
        if (error) {
          res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
        } else {
          // Upload
          const upload = await uploadFile.image(files.news_img);
          if (upload.status) {
            fields.news_img = upload.data;
            const result = await News.update(fields, {
              where: { news_id: req.params.id },
            });
            res.json({ status: true, data: result });
          } else {
            res.json({ status: false, data: upload.data });
          }
        }
      }
    });
  } catch (error) {
    res.json({ error: true, data: error.name });
  }
});

// DELETE: Delete News By Id
router.delete('/news/:id', async (req, res) => {
  try {
    const result = await News.destroy({
      where: { news_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ error: true, data: error.name });
  }
});

module.exports = router;
