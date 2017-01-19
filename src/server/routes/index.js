module.exports = function (app) {

  var web = require('./web.js');
  var api = require('./api.js');

  app.use('/', web);

  app.use('/api', api);
}