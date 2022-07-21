const express = require('express');
const router = express.Router();
const { Op, Sequelize, QueryTypes } = require('sequelize');
const School = require('../models/school_model');

// POST: Add School
router.post('/school', async (req, res) => {
  try {
    await School.create(req.body);
    if (req?.body?.account === 'user') {
      res.json({ status: true, data: 'เพิ่มโรงเรียนสำเร็จ' });
    } else {
      res.json({ status: true, data: null });
    }
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// GET: Get School
router.get('/school', async (req, res) => {
  try {
    const { search } = req.query;
    const result = await School.findAll({
      where: {
        [Op.and]: [
          search && {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      order: [['name', 'ASC']],
    });

    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// PUT: Update School
router.put('/school/:id', async (req, res) => {
  try {
    const result = await School.update(req.body, {
      where: { school_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

// DELETE: Delete School
router.delete('/school/:id', async (req, res) => {
  try {
    const result = await School.destroy({
      where: { school_id: req.params.id },
    });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: error.name });
  }
});

module.exports = router;
