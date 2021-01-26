const express = require('express');
const File = require('../models/File');

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, replace, value } = req.body;
  const products = await File.readFile('db.json');
  let status = false;
  const arr = products.map((item) => {
    if (item.id === id && item[replace] !== value) {
      status = true;
      // eslint-disable-next-line no-param-reassign
      item[replace] = value;
    }
    // eslint-disable-next-line no-param-reassign
    // item += '\n';
    return item;
  });

  if (!status) {
    return res.json({
      status: 403,
      message:
        'Продукт не найден или вы пытаетесь заменить на одинаковые данные',
    });
  }
  const result = await File.updFile('db.json', JSON.stringify(arr));
  return res.json(result);
});

module.exports = router;
