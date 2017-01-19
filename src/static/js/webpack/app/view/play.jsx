var React = require('react');
var Cookies = require('cookies-js');

function Pos(x,y) {
  this.x=x;this.y=y;
}

function Path(pts,lw,color) {
  this.pts = pts;
  this.lw = lw || canvas.lw;
  this.color = color || canvas.color;
}
var Ctl = function(canvas, ctx){
  this.canvas = canvas;
  this.ctx = ctx;
};
Ctl.prototype.drawPts = function(ctx, pts){
  var me = this;
  if(pts instanceof Path || pts.pts){
    var color = pts.color,lw = pts.lw;
    pts = pts.pts;
  }
  var p1 = pts[0];
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.moveTo(p1.x, p1.y);
  pts.slice(1).forEach(function(v){
      me.ctx.lineTo(v.x,v.y);
  });
  this.ctx.lineWidth = lw || this.canvas.lw;
  this.ctx.strokeStyle = color || this.canvas.color;
  this.ctx.stroke();
  this.ctx.restore();
}
Ctl.prototype.init = function(){
  this.canvas.paths=[];
  this.canvas.pts=[];
  this.canvas.color = 'black';
  this.canvas.lw = 1;
}
Ctl.prototype.addPos = function(x, y){
  this.canvas.pts.push(new Pos(x, y));
}
Ctl.prototype.clearPos = function(){
  this.canvas.pts = [];
}

var main = React.createClass({
  /*{this.props.children}*/
  getInitialState: function(){
    return {
      canvas: "",
      ctx: "",
      socket: "",
      ctl: "",
      start: false,
      ready: false,
      rounds: 0,
      key: 0,
      username: Cookies.get('username'),
      room: Cookies.get('room'),
      time: 0
    }
  },
  componentDidMount: function(){
    this.initCanvas();
  },
  initSocket: function(){ //监听socket事件
    var me = this;
    me.state.socket.on('import', function(msg, roomData){
      console.log(msg);
      console.log(roomData);
    })
    me.state.socket.on('paint paths',function (paths) {
      paths = JSON.parse(paths)
      me.state.ctx.clearRect(0,0,canvas.width,canvas.height);
      for(var k in paths)
          Ctl.drawPts(me.state.ctx, paths[k]);
    })
    me.state.socket.on('paint pts',function (pts) {
      pts = JSON.parse(pts)
      if(!pts) return;
      me.state.ctl.drawPts(me.state.ctx, pts);
    });

    me.state.socket.on('someBodyReady',function (data) {
      console.log(data)
      for(var i=0; i<data.length; i++){
        if(data[i].ready && me.state.username == data[i].username){
          me.setState({ready: true});
        }
      }
    });
    me.state.socket.on('start',function (personList) {
      var key;
      for(var i=0; i<personList.length;i++){
        if(me.state.username == personList[i].username){
            key = i;
        }
      }
      me.setState({
        start: true,
        rounds: 1,
        key: key,
        time: (key+1)==1?"60":"0"
      })
    })
    me.state.socket.on('newRounds', function(data){

    })
  },
  GetStartUser: function(){
    var me = this;

  },
  initCanvas: function(){ //初始化画布
    var me = this;
    var canvas = document.getElementById('canvas');
    this.setState({
      socket: io.connect(),
      canvas: canvas,
      ctx: canvas.getContext('2d'),
      ctl: new Ctl(canvas, canvas.getContext('2d'))
    }, function(){
      me.state.ctl.init();
      me.state.canvas.width = canvas.parentElement.clientWidth;
      me.state.canvas.height = canvas.parentElement.clientHeight;
      me.state.canvas.paths = canvas.pts = [];
      me.canvasEvent(me.state.canvas);
      var username = me.state.username;
      var room = me.state.room;

      me.initSocket();
      me.state.socket.emit('join', {
        username: username,
        roomNum: room
      });
    })
  },
  canvasEvent: function(canvas){ //画画事件监控
    var me = this;
    var difTop = canvas.offsetParent.offsetParent.offsetTop
    canvas.addEventListener("mousedown", function(e){
      console.log("down");
      var x = e.offsetX;
      var y = e.offsetY;
      this.mousedown = {x: x, y: y};
    })
    canvas.addEventListener("mouseup", function(e){
      console.log("up");
      me.state.socket.emit('paint',JSON.stringify({data:new Path(this.pts),status:'end'}));
      me.state.ctl.clearPos();
      delete this.mousedown;
    })
    canvas.addEventListener("mousemove", function(e){
      var x = e.offsetX;
      var y = e.offsetY;
      if(this.mousedown){
        me.state.ctl.addPos(x, y);
        me.state.ctl.drawPts(me.state.ctx, this.pts)
        me.state.socket.emit('paint', JSON.stringify({data: new Path(this.pts), status: 'ing'}))
      }
    })
    canvas.addEventListener("touchstart", function(e){
      console.log("down");
      /*var scrollTop = document.body.scrollTop;*/
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY - difTop;
      this.mousedown = {x: x, y: y};
    })
    canvas.addEventListener("touchend", function(e){
      console.log("up");
      me.state.socket.emit('paint',JSON.stringify({data:new Path(this.pts),status:'end'}));
      me.state.ctl.clearPos();
      delete this.mousedown;
    })
    canvas.addEventListener("touchmove", function(e){
      /*var scrollTop = document.body.scrollTop;
      if(scrollTop = 0){
        e.preventDefault();
      }*/
      e.preventDefault();
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY - difTop;
      if(this.mousedown){
        me.state.ctl.addPos(x, y);
        me.state.ctl.drawPts(me.state.ctx, this.pts);
        me.state.socket.emit('paint', JSON.stringify({data: new Path(this.pts), status: 'ing'}));
      }
    })
  },
  startGame: function(){ //准备好开始游戏
    var me = this;
    me.state.socket.emit('ready')
  },
  render: function () {
    var me = this;
    var start = me.state.start;
    var ready = me.state.ready;
    var time = me.state.time;
    return (
      <div className="play">
        <div className="head">等待玩家准备：5/7</div>
        <div className="body">
        	<div className={start?"talk hide":"talk"}>
        		<div className="talkList">
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
	        		<div className="list">小思：快快快开始吧</div>
	        		<div className="list">骏腾：开始鸡巴，上个厕所先</div>
        		</div>
        		<div className="talkFoot">
        			<div className="start" onClick={this.startGame}>{ready?"取消准备":"准备"}</div>
        			<div className="tips">长按玩家头像可以将其踢出房间</div>
        			<div className="message-box">
        				<input type="text" placeholder="点我点我" />
        				<div className="send">发送</div>
        			</div>
        		</div>
        	</div>
        	<div className="canvas-box">
            <canvas id="canvas"></canvas>
            <div className="time">{time}s</div>
          </div>
        </div>
        <div className="foot">
          <div className="userList">
            <div className="list">
              <div className="user">
                <p className="p1">未准备</p>
                <img src="http://wx.qlogo.cn/mmopen/icXCwo9ntwibiaj2hmEZ7ayupsFv7xU1RyNzHChhbepMxh9RgYMkfom93Tuqgw6OoYBenbzuic9UmCEDgCaGwmhu2PYUB0zMMaZS/0" />
                <p className="p1">小虾米</p>
              </div>
            </div>
            <div className="list">
              <div className="user">
                <p className="p1">未准备</p>
                <img src="http://wx.qlogo.cn/mmopen/icXCwo9ntwibiaj2hmEZ7ayupsFv7xU1RyNzHChhbepMxh9RgYMkfom93Tuqgw6OoYBenbzuic9UmCEDgCaGwmhu2PYUB0zMMaZS/0" />
                <p className="p1">小虾米</p>
              </div>
            </div>
            <div className="list">
              <div className="user">
                <p className="p1">未准备</p>
                <img src="http://wx.qlogo.cn/mmopen/icXCwo9ntwibiaj2hmEZ7ayupsFv7xU1RyNzHChhbepMxh9RgYMkfom93Tuqgw6OoYBenbzuic9UmCEDgCaGwmhu2PYUB0zMMaZS/0" />
                <p className="p1">小虾米</p>
              </div>
            </div>
            <div className="list">
              <div className="user">
                <p className="p1">未准备</p>
                <img src="http://wx.qlogo.cn/mmopen/icXCwo9ntwibiaj2hmEZ7ayupsFv7xU1RyNzHChhbepMxh9RgYMkfom93Tuqgw6OoYBenbzuic9UmCEDgCaGwmhu2PYUB0zMMaZS/0" />
                <p className="p1">小虾米</p>
              </div>
            </div>
            <div className="list">
              <div className="user">
                <p className="p1">未准备</p>
                <img src="http://wx.qlogo.cn/mmopen/icXCwo9ntwibiaj2hmEZ7ayupsFv7xU1RyNzHChhbepMxh9RgYMkfom93Tuqgw6OoYBenbzuic9UmCEDgCaGwmhu2PYUB0zMMaZS/0" />
                <p className="p1">小虾米</p>
              </div>
            </div>
            <div className="list">
              <div className="user">
                <p className="p1">未准备</p>
                <img src="http://wx.qlogo.cn/mmopen/icXCwo9ntwibiaj2hmEZ7ayupsFv7xU1RyNzHChhbepMxh9RgYMkfom93Tuqgw6OoYBenbzuic9UmCEDgCaGwmhu2PYUB0zMMaZS/0" />
                <p className="p1">小虾米</p>
              </div>
            </div>
            <div className="list">
              <div className="user">
                <p className="p1">未准备</p>
                <img src="http://wx.qlogo.cn/mmopen/icXCwo9ntwibiaj2hmEZ7ayupsFv7xU1RyNzHChhbepMxh9RgYMkfom93Tuqgw6OoYBenbzuic9UmCEDgCaGwmhu2PYUB0zMMaZS/0" />
                <p className="p1">小虾米</p>
              </div>
            </div>
            <div className="list">
              <div className="user">
                <p className="p1">未准备</p>
                <img src="http://wx.qlogo.cn/mmopen/icXCwo9ntwibiaj2hmEZ7ayupsFv7xU1RyNzHChhbepMxh9RgYMkfom93Tuqgw6OoYBenbzuic9UmCEDgCaGwmhu2PYUB0zMMaZS/0" />
                <p className="p1">小虾米</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = main;