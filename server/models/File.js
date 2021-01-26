const fs = require('fs');

class File {
  async readFile(path) {
    this.path = path;
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  }

  async updFile(path, json) {
    this.path = path;
    return new Promise((resolve, reject) => {
      fs.writeFile(path, json, (err) => {
        if (err) reject(err);
        resolve({ status: 200, message: 'Данные успешно обновлены!' });
      });
    });
  }
}

const file = new File();

module.exports = file;
