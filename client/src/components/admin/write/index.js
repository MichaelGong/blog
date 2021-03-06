import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  LinkedStateMixin
} from 'react-addons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Form, Input, Row, Col, Select, Tag, message, Button, Radio } from 'antd';
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
  emptySaveArticleAction,
  getArticleByIdAction,
  emptyGetArticleByIdAction,
  updateArticleAction,
  emptyUpdateArticleAction
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
      md: '',
      choosenTags: [],
      searchTagShow: false,
      createTagShow: false,
      coverImg: '', // 封面图片
      isShow: 1 // '是否显示'
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
    const { dispatch, location } = this.props;
    if (location.query.articleId) {
      dispatch(getArticleByIdAction(location.query.articleId));
    }
    this.renderMD(this.state.md);
    window.addEventListener('click', this.closeTagSearch, false);
  }
  componentDidUpdate() {
    const { dispatch, addTags, saveArticle, articleDetail, updateArticle } = this.props;
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

    if (articleDetail) {
      this.setArticleDetail(articleDetail);
      dispatch(emptyGetArticleByIdAction());
    }

    if (updateArticle) {
      if (+updateArticle.code === 200) {
        message.success('文章更新成功！');
        this.clearData();
      } else {
        message.error(updateArticle.message);
      }
      dispatch(emptyUpdateArticleAction());
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
    const { category } = this.props;
    let id = '_id';
    this.setState({
      category: value,
      categoryId: value,
      categoryName: category.filter(item => item[id] === value).name
    });
  }
  // 文章详情初始化
  setArticleDetail(articleDetail) {
    const { location } = this.props;
    this.setState({
      articleId: location.query.articleId,
      title: articleDetail.title,
      md: articleDetail.content,
      categoryId: articleDetail.categoryId,
      categoryName: articleDetail.categoryName,
      category: {
        _id: articleDetail.categoryId,
        name: articleDetail.categoryName
      },
      choosenTags: articleDetail.tags,
      coverImg: articleDetail.img,
      isShow: articleDetail.isShow
    });
    this.renderMD(articleDetail.content);
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
  // 获取上传的封面图片列表
  getUpImgCover(imgArr) {
    this.setState({
      coverImg: imgArr[0].url
    });
  }
  // 设置是否显示
  setIsShow(e) {
    this.setState({
      isShow: e.target.value
    });
  }
  // 清空数据
  clearData() {
    this.setState({
      title: '',
      md: '',
      choosenTags: [],
      category: '',
      categoryId: '',
      categoryName: ''
    });
    this.renderMD('');
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
    // 更新文章
    if (this.state.articleId) {
      dispatch(updateArticleAction({
        articleId: this.state.articleId,
        title: this.state.title,
        content: this.state.md,
        tags: this.state.choosenTags,
        categoryId: this.state.categoryId,
        categoryName: this.state.categoryName
      }));
    } else { // 创建文章
      dispatch(saveArticleAction({
        title: this.state.title,
        content: this.state.md,
        tags: this.state.choosenTags,
        categoryId: this.state.categoryId,
        categoryName: this.state.categoryName,
        img: this.state.coverImg,
        isShow: this.state.isShow
      }));
    }
  }
  // 清空封面图片
  clearCoverImg() {
    this.setState({
      coverImg: ''
    });
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
    let selectDom = [];
    if (isArray(category)) {
      selectDom = selectDom.concat(category.map(item =>
        (
        <Option
          key={item[id]}
          value={item[id]}
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
                placeholder="请选择分类"
                value={this.state.categoryId}
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
          <Col xs={24} md={10} style={{ height: '100%' }}>
            <textarea
              id="textarea-editor"
              className="textarea-editor"
              value={this.state.md}
              onChange={(e) => this.textAreaChangeHandler(e)}
            ></textarea>
          </Col>
          <Col xs={0} md={10} style={{ height: '100%' }}>
            <div className="editor-container">
              <div id="editormd">
              </div>
            </div>
          </Col>
          <Col md={4} style={{ height: '100%' }}>
            <Col sm={{ span: 24 }} md={{ span: 22, offset: 2 }}>
              <UploadFile
                text="上传封面图片"
                getUpImgList={(imgArr) => this.getUpImgCover(imgArr)}
              />
              {this.state.coverImg ?
                <div className="coverimg">
                  <img
                    src={this.state.coverImg}
                    alt="只能有一张封面"
                    title="点击删除"
                    className="coverimg-img"
                    onClick={() => this.clearCoverImg()}
                  />
                </div>
                : ''
              }
              <div style={{ marginTop: 8 }}>
                是否显示：
                <Radio.Group
                  defaultValue="1"
                  size="large"
                  onChange={(e) => this.setIsShow(e)}
                >
                  <Radio.Button value="1">显示</Radio.Button>
                  <Radio.Button value="0">不显示</Radio.Button>
                </Radio.Group>
              </div>
            </Col>
          </Col>
        </Row>
        <Col sm={24} md={20}>
          <Button
            type="primary"
            size="large"
            loading={this.state.iconLoading}
            onClick={() => this.submitArticle()}
            style={{ float: 'right', marginTop: 15 }}
          >
            保存提交
          </Button>
        </Col>
      </div>
    );
  }
}

function mapToState(state) {
  return {
    searchTagsArr: state.tags.searchTags, // 搜索出来的标签数组
    addTags: state.tags.addTags,
    category: state.navBar.category,
    saveArticle: state.article.saveArticle, // 保存文章的返回值
    articleDetail: state.article.articleDetail, // 获取文章详情
    updateArticle: state.article.updateArticle // 更新文章
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
  saveArticle: PropTypes.object,
  location: PropTypes.object,
  articleDetail: PropTypes.object,
  updateArticle: PropTypes.object
};
export default connect(mapToState)(Write);
