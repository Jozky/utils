webpackJsonp([1],{

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var main = React.createClass({
	  displayName: "main",

	  componentDidMount: function componentDidMount() {},
	  goCreate: function goCreate() {
	    window.location.href = "#/create";
	  },
	  goJoin: function goJoin() {
	    window.location.href = "#/join";
	  },
	  render: function render() {

	    return React.createElement(
	      "div",
	      { className: "home" },
	      React.createElement(
	        "div",
	        { className: "head" },
	        React.createElement(
	          "div",
	          { className: "lf" },
	          React.createElement("img", { src: "http://wx.qlogo.cn/mmopen/qSViaMp3TGy5ibkHDGnIXqHLZibMAFnmpnFZDWmFLQqt6a8T4NJFHCJyMIBqOyR34dNCs77LkfQvKxYE92pkiaUCbVKcicHfsNMTR/0" })
	        ),
	        React.createElement(
	          "div",
	          { className: "rg" },
	          React.createElement(
	            "p",
	            { className: "p1" },
	            "\u554A\u98DE\u7684\u5C0F\u8774\u8776"
	          ),
	          React.createElement(
	            "p",
	            { className: "p2" },
	            "20\u5C4016\u80DC"
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "body" },
	        React.createElement(
	          "div",
	          { className: "btn1", onClick: this.goCreate },
	          "\u521B\u5EFA\u623F\u95F4"
	        ),
	        React.createElement(
	          "div",
	          { className: "btn2", onClick: this.goJoin },
	          "\u8FDB\u5165\u623F\u95F4"
	        ),
	        React.createElement(
	          "div",
	          { className: "btn3" },
	          "\u9762\u5BF9\u9762\u5EFA\u623F "
	        )
	      )
	    );
	  }
	});

	module.exports = main;

/***/ }

});