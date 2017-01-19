var config = require('config');
var Sequelize = require('sequelize');

var database = config.get('sequelize.database');
var username = config.get('sequelize.username');
var password = config.get('sequelize.password');
var options = config.get('sequelize.options');

module.exports = new Sequelize(database, username, password, options);
