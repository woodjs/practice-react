const fs = require('fs');
const express = require('express');
const File = require('../models/File');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const products = await File.readFile('db.json');
  const result = { data: [] };
  products.forEach((item) => {
    result.data.push(item);
  });
  res.json(result);
});

module.exports = router;
