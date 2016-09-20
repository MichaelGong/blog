import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Select } from 'antd';
import { Markdown, MarkdownEditor } from 'react-markdown2';
import $ from 'jquery';
import 'marked';
import 'prettify';
import editormd from 'editormd';
import 'editormd.css';
const FormItem = Form.Item;
const Option = Select.Option;

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      md: '#sadfa'
    };
  }
  textAreaChangeHandler(e) {
    console.log(e.target);
    this.setState({
      md: e.target.value
    });
    this.renderMD(e.target.value);
  }
  renderMD(md) {
    if ($('#editormd').length > 0) {
      $('#editormd').html('');
      editormd().markdownToHTML('editormd', {
        markdown: md, // + "\r\n" + $("#append-test").text(),
        // htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode: 'style,script,iframe',  // you can filter tags decode
        // toc             : false,
        tocm: true,    // Using [TOCM]
        tocContainer: '#article-sideBar-content' // 自定义 ToC 容器层
      });
    }
  }
  render() {
    let textAreaHeight = document.body.clientHeight - 200;
    return (
      <div>
        <FormItem style={{ marginBottom: 8 }}>
          <Input placeholder="请输入文章标题" style={{ width: '100%' }} />
        </FormItem>
        <Row gutter={16}>
          <Col span={6}>
            <Select style={{ width: '100%' }} defaultValue="">
              <Option value="" disabled selected="selected">--请选择分类--</Option>
              <Option value="jack">jack</Option>
              <Option value="lucy">lucy</Option>
              <Option value="sdfsdf">sfsdf</Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginTop: 10, height: textAreaHeight }}>
          <Col span={12} style={{ height: '100%' }}>
            <textarea
              className="textarea-editor"
              value={this.state.md}
              onChange={(e) => this.textAreaChangeHandler(e)}
            ></textarea>
          </Col>
          <Col span={12} style={{ height: '100%' }}>
            <div style={{ height: '100%', overflow: 'auto' }}>
              <div id="editormd">
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapToState(state) {
  return {
    tagsData: state.tags.tags
  };
}
Write.propTypes = {
  dispatch: PropTypes.func,
  tagsData: PropTypes.array
};
export default connect(mapToState)(Write);
