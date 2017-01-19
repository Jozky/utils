exports.index = function (req, res) {
  res.redirect('/login');
};

exports.login = function (req, res) {
  res.render("login", {
    title: 'login首页'
  })
};

exports.manager = function (req, res) {
  if(req.session['username']){
    res.render("manager", {
      title: 'manager首页',
      username: req.session['username']
    })
  }else{
    res.redirect('/login');
  }
  
};
