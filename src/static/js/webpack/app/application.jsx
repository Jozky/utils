var React = require("react");
var RouterDom = require('react-dom');
var less = require('./application.less');

var Application = React.createClass({
  render: function () {
    var location = this.props.location;
    var children = this.props.children;
    return (
      <div className="app">
        {children}
      </div>
    );
  }
});

module.exports = Application;
