const Sequelize = require('sequelize');
const db = require("../configs/config");
const { v4: uuidv4 } = require('uuid');
//const { Sequelize } = require('sequelize');

 const File = db.define('File', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    filename: {
      type: Sequelize.STRING,
    },
    publicId: {
      type: Sequelize.STRING,
    },
  });


 module.exports = File;