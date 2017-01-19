var React = require('react');
var Cookies = require('cookies-js');
var request = require('superagent');

var main = React.createClass({
	getInitialState: function(){
		return {
      username: '',
			password: '123',
      room: ''
		}
	},
  componentDidMount: function(){
    var me = this;
    var username = Cookies.get('username');
    me.setState({ username: username });
    me.getRoom(username);
  },
  getRoom: function(username){
    var me = this;
    var room = Cookies.get('room')
    /*if(room){
      me.setState({room: room});
      return;
    }*/
    request
      .get('/api/getRoom')
      .query({
        username: username
      })
      .end(function(err, res){
        if(res.body.status == 0){
          Cookies.set('room', res.body.data.roomNum)
          me.setState({room: res.body.data.roomNum});
        }
      })
  },
  goPlay: function(){
    var me = this;
    window.location.href = '#/play'
  },
	handleChange: function(e){
		this.setState({password: e.target.value})
	},
  render: function () {
  	var password = this.state.password;
    var room = this.state.room;
    return (
      <div className="create">
        <div className="list">
        	<div className="label">选择游戏</div>
        	<div className="content">你画我猜</div>	
        </div>
        <div className="list">
        	<div className="label">房间号</div>
        	<div className="content">{room}</div>	
        </div>
        <div className="list">
        	<div className="label">是否设置密码口令</div>
        	<div className="content">允许</div>	
        </div>
        <div className="list">
        	<div className="label">密码口令</div>
        	<div className="content">
        		{password}
        	</div>	
        </div>
        <div className="btn" onClick={this.goPlay}>创建房间</div>
      </div>
    )
  }
});

module.exports = main;