const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.send('Say Hi! v3');
  } catch (error) {
    res.send(error.name);
  }
});

module.exports = router;
