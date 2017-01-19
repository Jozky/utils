var Sequelize = require('sequelize');
var sequelize = require("../common/mysql/sequelize");

var Admin = sequelize.define('admin', {
  id: {
    'type': Sequelize.INTEGER, // 字段类型
    'primaryKey': true
  },
  username: {
    'type': Sequelize.CHAR
  },
  password: {
    'type': Sequelize.CHAR
  },
  create_time: {
    'type': Sequelize.CHAR
  }
},{
  // 自定义表名
  'freezeTableName': true,
  'tableName': 'admin',
  // 是否需要增加createdAt、updatedAt、deletedAt字段
  'timestamps': false
});

module.exports = Admin;