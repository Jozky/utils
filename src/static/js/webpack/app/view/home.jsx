var React = require('react');

var main = React.createClass({
  componentDidMount: function(){

  },
  goCreate: function(){
  	window.location.href = "#/create"
  },
  goJoin: function(){
  	window.location.href = "#/join"
  },
  render: function () {
    
    return (
      <div className="home">
        <div className="head">
        	<div className="lf"><img src="http://wx.qlogo.cn/mmopen/qSViaMp3TGy5ibkHDGnIXqHLZibMAFnmpnFZDWmFLQqt6a8T4NJFHCJyMIBqOyR34dNCs77LkfQvKxYE92pkiaUCbVKcicHfsNMTR/0" /></div>
        	<div className="rg">
        		<p className="p1">啊飞的小蝴蝶</p>
        		<p className="p2">20局16胜</p>
        	</div>
        </div>
        <div className="body">
        	<div className="btn1" onClick={this.goCreate}>创建房间</div>
        	<div className="btn2" onClick={this.goJoin}>进入房间</div>
        	<div className="btn3">面对面建房 </div>
        </div>
      </div>
    )
  }
});

module.exports = main;