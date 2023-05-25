const Sequelize = require('sequelize');
const db = require('../configs/config');
const { nanoid } = require('nanoid');

  const File = db.define('File', {
    id: {
        type: Sequelize.STRING(10),
        autoincrement: false,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => nanoid(10)
    },
    filename: {
      type: Sequelize.STRING,
    },
    publicId: {
      type: Sequelize.STRING,
    },
    is_safe: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  })


module.exports = File;