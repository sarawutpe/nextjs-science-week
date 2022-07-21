const express = require('express');
const router = express.Router();
const { Op, Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');
const Certificate = require('../models/certificate_model');
const AwardAttachment = require('../models/award_attachment_model');
const formidable = require('formidable');
const uploadFile = require('../utils/upload_file');

// POST: Add Certificate
router.post('/certificate', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // Files is empty.
      if (!Object.keys(files).length) {
        const result = await Certificate.create(fields);
        res.json({ status: true, data: result });
      } else {
        if (error) {
          res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
        } else {
          // Upload
          const upload = await uploadFile.image(files.certificate_img);
          if (upload.status) {
            fields.certificate_img = upload.data;
            const result = await Certificate.create(fields);
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

// GET: Get Certificate
router.get('/certificate', async (req, res) => {
  try {
    const search = req.query.search;
    if (search) {
      const result = await Certificate.findAll({
        where: {
          [Op.or]: [
            {
              certificate_name: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              certificate_img: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      });
      res.json({ status: true, data: result });
    } else {
      const result = await Certificate.findAll();
      res.json({ status: true, data: result });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// convert to base64 encode
const base64_encode = (file) => {
  return 'data:image/png;base64,' + fs.readFileSync(file, 'base64');
};

// GET: Get Certificate By Type
router.get('/certificate/type', async (req, res) => {
  try {
    const certificate1 = await Certificate.findOne({ where: { certificate_type: 1 } });
    const certificate2 = await Certificate.findOne({ where: { certificate_type: 2 } });
    const certificate3 = await Certificate.findOne({ where: { certificate_type: 3 } });
    // convert image to base64
    var base64str1 = '';
    var base64str2 = '';
    var base64str3 = '';
    if (certificate1) {
      base64str1 = base64_encode(`./uploads/image/${certificate1?.certificate_img}`);
    }
    if (certificate2) {
      base64str2 = base64_encode(`./uploads/image/${certificate2?.certificate_img}`);
    }
    if (certificate3) {
      base64str3 = base64_encode(`./uploads/image/${certificate3?.certificate_img}`);
    }
    // res
    const data = {
      img_base64_type1: base64str1,
      img_base64_type2: base64str2,
      img_base64_type3: base64str3,
    };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update Certificate
router.put('/certificate/:id', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // Files is empty.
      if (!Object.keys(files).length) {
        const result = await Certificate.update(fields, {
          where: { certificate_id: req.params.id },
        });
        res.json({ status: true, data: result });
      } else {
        if (error) {
          res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
        } else {
          // Upload
          const upload = await uploadFile.image(files.certificate_img);
          if (upload.status) {
            fields.certificate_img = upload.data;
            const result = await Certificate.update(fields, {
              where: { certificate_id: req.params.id },
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

// DELETE: Delete Certificate
router.delete('/certificate/:id', async (req, res) => {
  try {
    const result = await Certificate.destroy({
      where: { certificate_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
