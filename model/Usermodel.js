
const Sequelize = require('sequelize');
const db = require('../configs/config');
const {nanoid} = require('nanoid');

const User = db.define('User', {
        id: {
            type: Sequelize.STRING(10),
            autoincrement: false,
            allowNull: false,
            primaryKey: true,
            defaultValue: () => nanoid(10)
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            min: 6,
            max: 20
        },
        role: {
            type: Sequelize.ENUM('user', 'admin'),
            allowNull: false
          },
});


module.exports = User;
