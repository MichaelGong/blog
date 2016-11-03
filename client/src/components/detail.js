import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getArticleByIdAction } from '../actions/article';
import $ from 'jquery';
import 'marked';
import 'prettify';
import editormd from 'editormd';
import 'editormd.css';
import './detail.less';

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      showTOC: true
    };
    this.toggleTOC = this.toggleTOC.bind(this);
  }
  componentWillMount() {
    const { dispatch, params } = this.props;
    dispatch(getArticleByIdAction(params.articleid));
  }
  toggleTOC() {
    this.setState({
      showTOC: !this.state.showTOC
    });
  }
  render() {
    const { articleDetail } = this.props;
    this.content = articleDetail.content;

    if (this.props.articleDetail.content
      && $('#markedDOM').length > 0
      && $('#markedDOM').children().length === 0) {
      editormd().markdownToHTML('markedDOM', {
        markdown: this.props.articleDetail.content, // + "\r\n" + $("#append-test").text(),
        // htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode: 'style,script,iframe',  // you can filter tags decode
        // toc             : false,
        tocm: true,    // Using [TOCM]
        tocContainer: '#article-sideBar-content' // 自定义 ToC 容器层
      });
    }

    return (
      <div className={this.state.showTOC ? 'article showTOC' : 'article hideTOC'}>
        <div className="article-container">
          <h1 className="title">{articleDetail.title}</h1>
          <div className="meta-top">
            <span>字数000</span>
            <span>阅读{articleDetail.readNum}</span>
            <span>评论{articleDetail.commentNum}</span>
          </div>
          <div
            id="markedDOM"
            className="article-content"
          >
          </div>
        </div>
        <div id="article-sideBar" className="article-sideBar">
          <h1 className="article-sideBar-title">目录</h1>
          <div id="article-sideBar-content" className="markdown-body editormd-preview-container">
          </div>
        </div>
        <div
          className={this.state.showTOC ?
            'article-sideBar-toggle close' : 'article-sideBar-toggle show'}
          onClick={this.toggleTOC}
        >
          <span className="article-sideBar-toggle-line"></span>
          <span className="article-sideBar-toggle-line"></span>
          <span className="article-sideBar-toggle-line"></span>
        </div>
      </div>
    );
  }
}

function mapToState(state) {
  return {
    articleDetail: state.article.articleDetail
  };
}
Detail.propTypes = {
  dispatch: PropTypes.func,
  articleDetail: PropTypes.object,
  params: PropTypes.object
};
export default connect(mapToState)(Detail);
