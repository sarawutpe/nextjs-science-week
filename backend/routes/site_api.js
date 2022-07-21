const express = require('express');
const router = express.Router();
const Site = require('../models/site_model');
const formidable = require('formidable');
const uploadFile = require('../utils/upload_file');

// GET: Get Site By Id
router.get('/site/', async (req, res) => {
  try {
    const result = await Site.findOne();
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update Site By Id
router.put('/site/', async (req, res) => {
  try {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const form = new formidable.IncomingForm({ maxFileSize: maxFileSize });
    form.parse(req, async (error, fields, files) => {
      // check current site
      const currentSite = await Site.findOne();
      const siteId = currentSite?.site_id;
      if (currentSite) {
        // update one
        if (!Object.keys(files).length) {
          const result = await Site.update(fields, {
            where: { site_id: siteId },
          });
          res.json({ status: true, data: result });
        } else {
          if (error) {
            res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
          } else {
            // Upload
            const upload = await uploadFile.image(files.site_banner);
            if (upload.status) {
              fields.site_banner = upload.data;
              const result = await Site.update(fields, {
                where: { site_id: siteId },
              });
              res.json({ status: true, data: result });
            } else {
              res.json({ status: false, data: upload.data });
            }
          }
        }
      } else {
        // create one
        if (!Object.keys(files).length) {
          const result = await Site.create(fields);
          res.json({ status: true, data: result });
        } else {
          if (error) {
            res.json({ status: false, data: `ขนาดไฟล์สูงสุด ${maxFileSize}` });
          } else {
            // Upload
            const upload = await uploadFile.image(files.site_banner);
            if (upload.status) {
              fields.site_banner = upload.data;
              const result = await Site.create(fields);
              res.json({ status: true, data: result });
            } else {
              res.json({ status: false, data: upload.data });
            }
          }
        }
      }
    });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
