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
    if (reqBody.username == "") {
        return res.json(Result("-1", [], code['-1']));
    }
    if (reqBody.password == "") {
        return res.json(Result("-1", [], code['-1']));
    }
    
    if (reqBody.username == "admin") {
        req.session["username"] = "admin";
        return res.json(Result("0", [], code['0']));
    }

    return res.json(Result('-5', [], code['-5']));

}

exports.logout = function (req, res) {
    req.session["username"] = false;
    return res.json(Result("0", [], code['0']));
}
