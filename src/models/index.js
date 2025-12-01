// src/models/index.js
const { sequelize, Sequelize } = require('../config/database');
const Note = require('./Note');

module.exports = { sequelize, Sequelize, Note };