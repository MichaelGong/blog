import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  LinkedStateMixin
} from 'react-addons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Form, Input, Row, Col, Select, Tag, message, Button } from 'antd';
import UploadFile from './uploadFile';
import { random, closest, isArray } from '../../../util';
import {
  searchTagsAction,
  addTagsAction,
  emptyAddTagsAction
} from '../../../actions/tags';
import {
  categoryAction
} from '../../../actions/navBar';
import {
  saveArticleAction,
  emptySaveArticleAction
} from '../../../actions/article';
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
      searchTagShow: false,
      createTagShow: false
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.linkState = LinkedStateMixin.linkState.bind(this);
    this.closeTagSearch = this.closeTagSearch.bind(this);
    this.clearData = this.clearData.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(categoryAction(true));
  }
  componentDidMount() {
    this.renderMD(this.state.md);
    window.addEventListener('click', this.closeTagSearch, false);
  }
  componentDidUpdate() {
    const { dispatch, addTags, saveArticle } = this.props;
    if (addTags) {
      if (+addTags.code === 200) {
        message.success('标签创建成功！');
        dispatch(searchTagsAction(this.tagInput.refs.input.value.split(',').join('|')));
      } else {
        message.error(addTags.message);
      }
      dispatch(emptyAddTagsAction());
    }
    if (saveArticle) {
      if (saveArticle.code === 200) {
        message.success('提交成功！');
        this.clearData();
      } else {
        message.error(saveArticle.message);
      }
      dispatch(emptySaveArticleAction());
    }
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.closeTagSearch, false);
  }
  // 监听title文字内容的改变
  onTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }
  // 监听选择分类
  onCategoryChange(value) {
    let valueObj = JSON.parse(value);
    let id = '_id';
    this.setState({
      category: value,
      categoryId: valueObj[id],
      categoryName: valueObj.name
    });
    // console.log(e.target.value, item);
  }
  // 获取上传的图片列表
  getUpImgList(imgArr) {
    let str = '';
    let editor = document.querySelector('#textarea-editor');
    let md = this.state.md;
    imgArr.forEach(item => {
      str += `![](${item.url})\r\n`;
    });
    str = md.substring(0, editor.selectionStart)
          + '\r\n' + str + '\r\n' + md.substring(editor.selectionEnd);
    this.setState({
      md: str
    });
    this.renderMD(str);
  }
  clearData() {
    this.setState({
      title: '',
      md: '',
      choosenTags: [],
      category: '',
      categoryId: '',
      categoryName: ''
    });
  }
  // 关闭搜索框
  closeTagSearch(e) {
    if (!closest(e.target, '.ant-select-dropdown-menu.write-tags, .tags-container')) {
      this.setState({
        searchTagShow: false
      });
    }
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
      if (e.target.value) {
        dispatch(searchTagsAction(e.target.value.split(',').join('|')));
        this.setState({
          searchTagShow: true
        });
      }
    }
  }
  // 选中某一个标签
  chooseTagItem(item, index) {
    const { searchTagsArr } = this.props;
    this.state.choosenTags.push(item);
    this.setState({
      choosenTags: this.state.choosenTags
    });
    searchTagsArr.splice(index, 1);
    this.tagInput.refs.input.value = '';
    this.forceUpdate(); // 强制更新 choosenTags是个数组
  }
  // 删除选中的tag
  delChoosenTag(tagId) {
    let id = '_id';
    this.setState({
      choosenTags: this.state.choosenTags.filter(item => {
        if (item[id] === tagId) {
          return false;
        }
        return true;
      })
    });
  }
  // 创建标签
  createTag() {
    if (!this.tagInput.refs.input.value) return;
    const { dispatch } = this.props;
    dispatch(addTagsAction(this.tagInput.refs.input.value.split(',')));
    this.setState({
      createTagShow: false
    });
  }
  // 提交数据
  submitArticle() {
    const { dispatch } = this.props;
    dispatch(saveArticleAction({
      title: this.state.title,
      content: this.state.md,
      tags: this.state.choosenTags,
      categoryId: this.state.categoryId,
      categoryName: this.state.categoryName
    }));
  }
  // 生成markdown
  renderMD(md) {
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
    const self = this;
    const { searchTagsArr, category } = this.props;
    const tagColorArr = ['blue', 'green', 'yellow', 'red'];
    let textAreaHeight = document.body.clientHeight - 200;
    // 搜索出来的标签数组
    const dropdownDom = searchTagsArr.map((item, index) => {
      if (self.state.choosenTags.length === 0) {
        return (
          <li
            key={item[id]}
            className="ant-select-dropdown-menu-item"
            onClick={() => this.chooseTagItem(item, index)}
          >
            {item.name}
          </li>
        );
      }
      for (let i = 0; i < self.state.choosenTags.length; i++) {
        let choosenItem = self.state.choosenTags[i];
        if (item[id] === choosenItem[id]) {
          return (
            <li
              key={item[id]}
              className="ant-select-dropdown-menu-item isChoosen"
            >
              {item.name}
            </li>
          );
        }
        return (
          <li
            key={item[id]}
            className="ant-select-dropdown-menu-item"
            onClick={() => this.chooseTagItem(item, index)}
          >
            {item.name}
          </li>
        );
      }
      return item;
    });
    const TagsDom = this.state.choosenTags.map(item =>
      (
      <Tag
        key={item[id]}
        closable
        color={tagColorArr[random(0, 3)]}
        afterClose={() => this.delChoosenTag(item[id])}
      >
        {item.name}
      </Tag>
      )
    );
    // console.log(category);
    let selectDom = [<Option key="disabled" value="" disabled selected="selected">-请选择分类-</Option>];
    if (isArray(category)) {
      selectDom = selectDom.concat(category.map(item =>
        (
        <Option
          key={item[id]}
          value={JSON.stringify(item)}
        >
          {item.name}
        </Option>
        )
      ));
    }
    return (
      <div className="clearfix">
        <Row gutter={16}>
          <Col xs={12} sm={6}>
            <FormItem style={{ marginBottom: 8 }}>
              <Input
                placeholder="请输入文章标题"
                style={{ width: '100%' }}
                value={this.state.title}
                onChange={(e) => this.onTitleChange(e)}
              />
            </FormItem>
          </Col>
          <Col xs={12} sm={6}>
            <FormItem style={{ marginBottom: 8 }}>
              <Select
                style={{ width: '100%' }}
                defaultValue=""
                value={this.state.category}
                onChange={(value) => this.onCategoryChange(value)}
              >
                {selectDom}
              </Select>
            </FormItem>
          </Col>
          <Col xs={18} sm={9}>
            <div className="tags-container">
              {TagsDom}
              <Input
                placeholder="请输入标签"
                className="tag-input"
                onKeyPress={(e) => this.tagInputKeyPress(e)}
                ref={(ref) => { this.tagInput = ref; }}
              />
              <div
                className="ant-select-dropdown dropdown-write-tags"
                style={{ display: this.state.searchTagShow ? 'block' : 'none' }}
              >
                <ul className="ant-select-dropdown-menu write-tags">
                  {dropdownDom}
                  <li
                    style={{
                      display: (searchTagsArr.length > 0) ? 'none' : 'inline-block'
                    }}
                    key="createTag"
                    className="ant-select-dropdown-menu-item"
                    onClick={() => this.createTag()}
                  >
                    创建该标签
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xs={6} sm={3}>
            <UploadFile getUpImgList={(imgArr) => this.getUpImgList(imgArr)} />
          </Col>
        </Row>
        <Row style={{ marginTop: 10, height: textAreaHeight }}>
          <Col xs={24} sm={12} style={{ height: '100%' }}>
            <textarea
              id="textarea-editor"
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
        <Button
          type="primary"
          size="large"
          loading={this.state.iconLoading}
          onClick={() => this.submitArticle()}
          style={{ float: 'right', marginTop: 15 }}
        >
          保存提交
        </Button>
      </div>
    );
  }
}

function mapToState(state) {
  return {
    searchTagsArr: state.tags.searchTags, // 搜索出来的标签数组
    addTags: state.tags.addTags,
    category: state.navBar.category,
    saveArticle: state.article.saveArticle // 保存文章的返回值
  };
}
Write.propTypes = {
  dispatch: PropTypes.func,
  searchTagsArr: PropTypes.array,
  addTags: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  category: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  saveArticle: PropTypes.object
};
export default connect(mapToState)(Write);
