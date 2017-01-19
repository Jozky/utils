var Sequelize = require('sequelize');
var sequelize = require("../common/mysql/sequelize");

var article = sequelize.define('article', {
  id: {
    'type': Sequelize.INTEGER(11), // 字段类型
    'primaryKey': true
  },
  title: {
    'type': Sequelize.CHAR
  },
  author: {
    'type': Sequelize.CHAR
  },
  content: {
    'type': Sequelize.TEXT
  },
  point: {
    'type': Sequelize.CHAR
  },
  create_time: {
    'type': Sequelize.CHAR
  }
},{
  // 自定义表名
  'freezeTableName': true,
  'tableName': 'article',
  // 是否需要增加createdAt、updatedAt、deletedAt字段
  'timestamps': false
});

module.exports = article;