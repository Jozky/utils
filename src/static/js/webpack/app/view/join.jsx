var React = require('react');
var Cookies = require('cookies-js');

var main = React.createClass({
  /*{this.props.children}*/
  getInitialState: function(){
  	return {
  		password: 1001,
  	}
  },
  handleChange: function(e){
  	this.setState({password: e.target.value})
  },
  componentDidMount: function(){
  	var password = document.getElementById("password");
    //var aaa = document.getElementById("aaa");
  	setTimeout(function(){
  		//aaa.focus();
  	},2000)
  },
  joinRoom: function(){
    Cookies.set('room', this.state.password)
    window.location.href = '#/play';
  },
  render: function () {
  	var password = this.state.password;
    return (
      <div className="join">
        <input type="tel" id="password" value={password} onChange={this.handleChange}/>
        <div className="btn" onClick={this.joinRoom}>加入</div>
      </div>
    )
  }
});

module.exports = main;