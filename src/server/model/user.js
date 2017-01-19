var Sequelize = require('sequelize');
var sequelize = require("../common/mysql/sequelize");

var User = sequelize.define('user', {
  id: {
    'type': Sequelize.INTEGER(10), // 字段类型
    'primaryKey': true
  },
  name: {
    'type': Sequelize.CHAR(10)
  },
  password: {
    'type': Sequelize.CHAR(10)
  }
},{
  // 自定义表名
  'freezeTableName': true,
  'tableName': 'user',
  // 是否需要增加createdAt、updatedAt、deletedAt字段
  'timestamps': false
});

module.exports = User;