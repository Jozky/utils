var Admin = require("../../model/admin");
var Result = require("../../util/result/index.js");
var log = require("node-express-logger");

var code = {
  "0": "success",
  "-1": "参数异常",
  "-2": "密码错误",
  "-5": "数据库异常"
}

exports.login = function (req, res) {
  var reqBody = req.body;
  if(reqBody.username == ""){
    return res.json(Result("-1", [], code['-1']));
  }
  if(reqBody.password == ""){
    return res.json(Result("-1", [], code['-1']));
  }

  Admin.findOne({
    where: {
      username: reqBody.username
    }
  }).then(function(result){
    if(result == null){
      log.Warn('admin-login-warn-username-error')
      return res.json(Result("-1", result, code['-1']));
    }
    log.Warn(true)
    if(reqBody.password == result.password){
      req.session["username"] = reqBody.username;
      return res.json(Result("0", [], code['0']));
    }else {
      return res.json(Result("-2", result, code['-2']));
    }
    
  }).catch(function(err){
    log.Warn('admin-login-error');
    log.Warn(err.message);
    res.json(Result('-5', [], code['-5']));
  })
  
}

exports.logout = function (req, res) {
  req.session["username"] = false;
  return res.json(Result("0", [], code['0']));
}
