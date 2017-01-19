var React = require('react');
var Ueditor = require('../../../component/ueditor.jsx');
var indexService = require('../../../../../service/index.js');
var moment = require('moment');
import { Form, Select, Input, Button, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const App = Form.create()(React.createClass({

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="title"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 20 }}
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input your title!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="content"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 20 }}
                >
                    <Ueditor value={content} id={"content"} height="200" disabled={false}/>
                </FormItem>

                <FormItem wrapperCol={{ span: 8, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        {type}
                    </Button>
                </FormItem>
            </Form>
        );
    },
}));

module.exports = App;