var User = require("../../model/user");

exports.add = function(req, res){
  User.findOne({
    where: {
      name: 1
    }
  }).then(function(result){
    res.json(result);
  })
}

exports.del = function(req, res){
  User.findOne({
    where: {
      name: 1
    }
  }).then(function(result){
    res.json(result);
  })
}

exports.update = function(req, res){
  User.findOne({
    where: {
      name: 1
    }
  }).then(function(result){
    res.json(result);
  })
}

exports.find = function(req, res){
  var pageNo = parseInt(req.query.pageNo);
  var pageSize = parseInt(req.query.pageSize);
  
  var total = 0;

  User.count().then(function(num){
    total = num;
  })

  User.findAll({ offset: ((pageNo-1)*pageSize), limit: pageSize }).then(function(result, err){
    console.log(111111111111111111)
    res.json({
      status: 0,
      data: result,
      msg: total
    });
  }).then(function(err){
    console.log(22222222222222)
    console.log(err)
  })


}
