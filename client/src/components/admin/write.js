import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Select, Tag } from 'antd';
import { random, debounce } from '../../util';
import {
  searchTags
} from '../../actions/tags';
// import { Markdown, MarkdownEditor } from 'react-markdown2';
import $ from 'jquery';
/* eslint-disable */
import 'marked';
import 'prettify';
import editormd from 'editormd';
import 'editormd.css';
/* eslint-enable */
const FormItem = Form.Item;
const Option = Select.Option;

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      md: '# sadfa',
      choosenTags: [],
      tagsList: []
    };
  }
  componentDidMount() {
    this.renderMD(this.state.md);
  }
  textAreaChangeHandler(e) {
    this.setState({
      md: e.target.value
    });
    this.renderMD(e.target.value);
  }
  // 搜索标签
  tagInputKeyPress(e) {
    const { dispatch } = this.props;
    if (e.key === 'Enter' || e.charCode === '13') { // 监听enter键
      console.log('按了enter键：', e.target.value);
      if (e.target.value) {
        dispatch(searchTags(e.target.value.split(',').join('|')));
        // this.setState({
        //   tagsList: [
        //     { id: 1, name: '胜多负少', isShow: true },
        //     { id: 2, name: '发光时代水电费', isShow: true },
        //     { id: 3, name: '合法固定', isShow: true }
        //   ]
        // });
      }
    }
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  chooseTagItem(item) {
    this.state.choosenTags.push(item);
    this.setState({
      choosenTags: this.state.choosenTags
    });
  }
  renderMD(md) {
    console.log('--------------------------------------');
    if ($('#editormd').length > 0) {
      $('#editormd').html('');
      editormd().markdownToHTML('editormd', {
        markdown: md, // + "\r\n" + $("#append-test").text(),
        toc: false,
        // htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode: 'style,script,iframe'  // you can filter tags decode
      });
    }
  }
  render() {
    const id = '_id';
    const { searchTagsArr } = this.props;
    const tagColorArr = ['blue', 'green', 'yellow', 'red'];
    let textAreaHeight = document.body.clientHeight - 200;
    // 搜索出来的标签数组
    const dropdownDom = searchTagsArr.map(item =>
      (
      <li
        key={item[id]}
        className="ant-select-dropdown-menu-item"
        onClick={() => this.chooseTagItem(item)}
      >
        {item.name}
      </li>
      )
    );
    const TagsDom = this.state.choosenTags.map(item =>
      (
      <Tag closable color={tagColorArr[random(0, 3)]} key={item[id]}>{item.name}</Tag>
      )
    );
    return (
      <div>
        <Row gutter={16}>
          <Col xs={12} sm={6}>
            <FormItem style={{ marginBottom: 8 }}>
              <Input placeholder="请输入文章标题" style={{ width: '100%' }} />
            </FormItem>
          </Col>
          <Col xs={12} sm={6}>
            <FormItem style={{ marginBottom: 8 }}>
              <Select style={{ width: '100%' }} defaultValue="">
                <Option value="" disabled selected="selected">--请选择分类--</Option>
                <Option value="jack">jack</Option>
                <Option value="lucy">lucy</Option>
                <Option value="sdfsdf">sfsdf</Option>
                <Option value="yiminghe">yiminghe</Option>
              </Select>
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <div className="tags-container">
              {TagsDom}
              <Input
                placeholder="请输入标签"
                className="tag-input"
                onKeyPress={(e) => this.tagInputKeyPress(e)}
              />
              <div
                className="ant-select-dropdown dropdown-write-tags"
                style={{ display: searchTagsArr.length > 0 ? 'block' : 'none' }}
              >
                <ul className="ant-select-dropdown-menu write-tags">
                  {dropdownDom}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 10, height: textAreaHeight }}>
          <Col xs={24} sm={12} style={{ height: '100%' }}>
            <textarea
              className="textarea-editor"
              value={this.state.md}
              onChange={(e) => this.textAreaChangeHandler(e)}
            ></textarea>
          </Col>
          <Col xs={0} sm={12} style={{ height: '100%' }}>
            <div className="editor-container">
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
    searchTagsArr: state.tags.searchTags // 搜索出来的标签数组
  };
}
Write.propTypes = {
  dispatch: PropTypes.func,
  searchTagsArr: PropTypes.array
};
export default connect(mapToState)(Write);
