const connection = require('./DBConnectionService');
const dictionary = require('./dictionary');

class DBService {
  static clearEmptyData(data) {
    const yesNoKeys = ['hasChildren', 'hasInternet', 'hasBreakfast', 'hasDinner', 'hasEveningMeal', 'hasSnack'];
    const dateKeys = ['dateBorn', 'passDate'];

    let retVal = {};
    for (const key in data) {
      let element = data[key];

      if (dateKeys.includes(key) && !element) {
        element = null;
      }

      if (yesNoKeys.includes(key)) {
        element = element == 'on';
      }

      retVal[key] = element;

    }
    return retVal;
  }

  static beautifyRecord(row) {
    const yesNoKeys = ['hasChildren', 'hasInternet', 'hasBreakfast', 'hasDinner', 'hasEveningMeal', 'hasSnack'];

    let retVal = {};
    for (const key in row) {
      const element = row[key];

      if (yesNoKeys.includes(key)) {
        retVal[key] = dictionary.getById('yesNo', element);
      } 
      else if (key == 'passGender') {
        retVal[key] = dictionary.getById('gender', element);
      }
      else if (key == 'hotelRoom') {
        retVal[key] = dictionary.getById('hotelRoom', element);
      }
      else if (key == 'dateBorn' && element) {
        retVal[key] = (new Date(element)).toLocaleDateString();
      }
      else if (key == 'passDate' && element) {
        retVal[key] = (new Date(element)).toLocaleDateString();
      }
      else if (!element) {
        retVal[key] = '-';
      }
      else {
        retVal[key] = element;
      }
      
    }

    return retVal;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM form_data;`;
      let query = connection.query(sql, (err, result, field) => {
        if(err) return reject(err);

        resolve(result);
      });
    });
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM form_data WHERE id = ?;`;
      let query = connection.query(sql, [id], (err, result, field) => {
        if(err) return reject(err);

        resolve(result[0] || []);
      });
    });
  }

  static insert(data) {
    let validData = this.clearEmptyData(data);
    return connection.query(
      `INSERT INTO form_data SET ?`, validData
    );
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM form_data where id = ?`;
      let query = connection.query(sql, [id], (err, result, field) => {
        if(err) return reject(err);

        resolve(result);
      });
    });
  }

  static update(id, data) {
    let validData = this.clearEmptyData(data);
    return connection.query(
      'UPDATE `form_data` SET ? WHERE (`id` = '+ Number(id) +')', validData
    );
  }

}

module.exports = DBService;