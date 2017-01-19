var Result = require("../../util/result/index.js");
const fs = require('fs');

/**
 *  拉取地区信息
 * @param req
 * @param res
 */
exports.getRegionData = function (req,res) {

    fs.readFile('./store/region.json', (err, data) => {
        if (err) throw err;
        var hello  = new Buffer(data);
        console.log("in callback")

        return res.send(hello.toString());
    });
    console.log("test")

}

/**
 * 数据保存到文件中
 * @param data
 * @constructor
 */
var SaveDataInFile = function (data) {

}