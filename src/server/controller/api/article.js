var Article = require("../../model/article");
var Result = require("../../util/result/index.js");
var log = require("node-express-logger");

var code = {
  "0": "success",
  "-1": "参数异常",
  "-5": "数据库异常"
}

exports.add = function(req, res){
  var reqBody = req.body;
  if(!reqBody.title || reqBody.title == ""){
    return res.json(Result("-1", [], code['-1']));
  }
  if(!reqBody.author || reqBody.author == ""){
    return res.json(Result("-1", [], code['-1']));
  }
  if(!reqBody.content || reqBody.content == ""){
    return res.json(Result("-1", [], code['-1']));
  }
  if(!reqBody.point || reqBody.point == ""){
    return res.json(Result("-1", [], code['-1']));
  }
  if(!reqBody.create_time || reqBody.create_time == ""){
    return res.json(Result("-1", [], code['-1']));
  }
  log.Warn(reqBody)
  Article.create({
    title: reqBody.title,
    author: reqBody.author,
    content: reqBody.content,
    point: reqBody.point,
    create_time: reqBody.create_time
  }).then(function(result){
    log.Warn('article-add-success');
    res.json(Result('0', [], code['0']));
  }).catch(function(err){
    log.Warn('article-add-error');
    log.Warn(err.message);
    res.json(Result('-5', [], code['-5']));
  });
}

exports.del = function(req, res){
  var id = req.query.id;
  Article.destroy({
    where: {
      id: id
    }
  }).then(function(result){
    if(result == 0){
      log.Warn('article-del-success');
      log.Warn('该数据库没有这条数据');
      res.json(Result('0', [], code['0']));
    }else{
      log.Warn('article-del-success');
      res.json(Result('0', [], code['0']));
    }
  }).catch(function(err){
    log.Warn('article-del-error');
    log.Warn(err.message);
    res.json(Result('-5', [], code['-5']));
  });
}

exports.update = function(req, res){
  var id = parseInt(req.body.id);
  var title = req.body.title;
  var content = req.body.content;

  if(id == "" || !id){
    return res.json(Result("-1", [], code['-1']));
  }
  if(title == "" || !title){
    return res.json(Result("-1", [], code['-1']));
  }
  if(content == "" || !content){
    return res.json(Result("-1", [], code['-1']));
  }
  Article.update({
    title: title,
    content: content
  }, {
    where: {
      id: id
    }
  }).then(function(result){
    log.Warn('article-update-success');
    res.json({
      status: 0,
      data: result,
      msg: "success"
    });
  }).catch(function(err){
    log.Warn('article-update-error');
    log.Warn(err.message);
    res.json(Result('-5', [], code['-5']));
  })
}

exports.find = function(req, res){
  var pageNo = parseInt(req.query.pageNo);
  var pageSize = parseInt(req.query.pageSize);

  if(pageNo == "" || !pageNo){
    return res.json(Result("-1", [], code['-1']));
  }
  if(pageSize == "" || !pageSize){
    return res.json(Result("-1", [], code['-1']));
  }
  
  var total = 0;

  Article.findAll({ 
    offset: ((pageNo-1)*pageSize), 
    limit: pageSize,
    order: [['id', 'DESC']] 
  }).then(function(result){

    Article.count().then(function(num){
      log.Warn('article-find-success');
      total = num;
      res.json({
        status: 0,
        data: result,
        msg: total
      });
    }).catch(function(err){
      log.Warn('article-find-error');
      log.Warn(err.message);
      res.json(Result('-5', [], code['-5']));
    })
    
  }).catch(function(err){
    log.Warn('article-find-error');
    log.Warn(err.message);
    res.json(Result('-5', [], code['-5']));
  });

}

exports.findById = function(req, res){
  var id = parseInt(req.query.id);

  if(id == "" || !id){
    return res.json(Result("-1", [], code['-1']));
  }
  
  var total = 0;

  Article.findById(id).then(function(result){
    log.Warn('article-findById-success');
    res.json({
      status: 0,
      data: result,
      msg: total
    });
    
  }).catch(function(err){
    log.Warn('article-findById-error');
    log.Warn(err.message);
    res.json(Result('-5', [], code['-5']));
  });

}
