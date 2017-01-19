webpackJsonp([6],{

/***/ 1040:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _antd = __webpack_require__(250);

	var React = __webpack_require__(1);
	var Ueditor = __webpack_require__(1041);
	var indexService = __webpack_require__(1002);
	var moment = __webpack_require__(430);

	var FormItem = _antd.Form.Item;
	var Option = _antd.Select.Option;

	var App = _antd.Form.create()(React.createClass({
	  displayName: 'App',

	  getInitialState: function getInitialState() {
	    return {
	      title: "",
	      content: ""
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this.checkId();
	  },
	  componentDidMount: function componentDidMount() {},
	  componentWillUnmount: function componentWillUnmount() {},
	  checkId: function checkId() {
	    var me = this;
	    if (this.props.params.id) {
	      me.getArticle();
	    }
	  },
	  getArticle: function getArticle() {
	    var me = this;
	    var id = this.props.params.id;
	    indexService.findArticleById(id).then(function (res) {
	      if (res.status == 0) {
	        me.setState({
	          title: res.data.title,
	          content: unescape(res.data.content)
	        });
	        me.props.form.setFieldsValue({
	          title: res.data.title
	        });
	        try {
	          UE.getEditor('content').setContent(unescape(res.data.content));
	        } catch (e) {
	          console.log('warn');
	        }
	      } else {
	        _antd.message.info(res.msg);
	      }
	    });
	  },
	  handleSubmit: function handleSubmit(e) {
	    var me = this;
	    e.preventDefault();
	    this.props.form.validateFields(function (err, values) {
	      var content = UE.getEditor('content').getContent();
	      if (!err && content != "") {
	        me.saveArticle(values);
	      } else {
	        _antd.message.info('请输入标题和内容');
	      }
	    });
	  },

	  saveArticle: function saveArticle(obj) {
	    if (this.props.params.id) {
	      this.updateArticle(obj);
	    } else {
	      this.addArticle(obj);
	    }
	  },
	  addArticle: function addArticle(obj) {
	    var data = {
	      title: obj.title,
	      content: escape(UE.getEditor('content').getContent()),
	      author: window.user.username,
	      point: "23",
	      create_time: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
	    };
	    indexService.articleAdd(data).then(function (res) {
	      if (res.status == 0) {
	        _antd.message.info(res.msg);
	      } else {
	        _antd.message.info(res.msg);
	      }
	    });
	  },
	  updateArticle: function updateArticle(obj) {
	    var data = {
	      id: this.props.params.id,
	      title: obj.title,
	      content: escape(UE.getEditor('content').getContent())
	    };
	    indexService.updateArticle(data).then(function (res) {
	      if (res.status == 0) {
	        _antd.message.info(res.msg);
	      } else {
	        _antd.message.info(res.msg);
	      }
	    });
	  },
	  render: function render() {
	    var getFieldDecorator = this.props.form.getFieldDecorator;


	    var title = !this.props.params.id ? "" : this.state.title;
	    var content = !this.props.params.id ? "" : this.state.content;

	    var type = !this.props.params.id ? "添加" : "修改";

	    return React.createElement(
	      _antd.Form,
	      { onSubmit: this.handleSubmit },
	      React.createElement(
	        FormItem,
	        {
	          label: 'title',
	          labelCol: { span: 2 },
	          wrapperCol: { span: 20 }
	        },
	        getFieldDecorator('title', {
	          rules: [{ required: true, message: 'Please input your title!' }]
	        })(React.createElement(_antd.Input, null))
	      ),
	      React.createElement(
	        FormItem,
	        {
	          label: 'content',
	          labelCol: { span: 2 },
	          wrapperCol: { span: 20 }
	        },
	        React.createElement(Ueditor, { value: content, id: "content", height: '200', disabled: false })
	      ),
	      React.createElement(
	        FormItem,
	        { wrapperCol: { span: 8, offset: 2 } },
	        React.createElement(
	          _antd.Button,
	          { type: 'primary', htmlType: 'submit' },
	          type
	        )
	      )
	    );
	  }
	}));

	module.exports = App;

/***/ },

/***/ 1041:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var Ueditor = React.createClass({
	    displayName: 'Ueditor',

	    componentDidMount: function componentDidMount() {
	        var me = this;
	        UE.delEditor(this.props.id);
	        var editor = UE.getEditor(this.props.id, {
	            //工具栏
	            toolbars: [['fullscreen', 'source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'simpleupload', 'horizontal', 'date', 'time']],
	            lang: "zh-cn"
	            //字体
	            , 'fontfamily': [{ label: '', name: 'songti', val: '宋体,SimSun' }, { label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai' }, { label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei' }, { label: '', name: 'heiti', val: '黑体, SimHei' }, { label: '', name: 'lishu', val: '隶书, SimLi' }, { label: '', name: 'andaleMono', val: 'andale mono' }, { label: '', name: 'arial', val: 'arial, helvetica,sans-serif' }, { label: '', name: 'arialBlack', val: 'arial black,avant garde' }, { label: '', name: 'comicSansMs', val: 'comic sans ms' }, { label: '', name: 'impact', val: 'impact,chicago' }, { label: '', name: 'timesNewRoman', val: 'times new roman' }]
	            //字号
	            , 'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
	            enableAutoSave: false,
	            autoHeightEnabled: false,
	            initialFrameHeight: this.props.height,
	            initialFrameWidth: '100%',
	            readonly: this.props.disabled
	        });

	        editor.ready(function (ueditor) {
	            var value = me.props.value ? me.props.value : '<p></p>';
	            editor.setContent(value);
	        });
	    },
	    render: function render() {
	        return React.createElement('script', { id: this.props.id, name: 'content', type: 'text/plain' });
	    }
	});
	module.exports = Ueditor;

/***/ }

});