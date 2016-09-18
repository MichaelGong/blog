import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { articleAllAction } from '../actions/article';
import Tags from './tags';
import { getTimeLeft } from '../util';
import './list.less';

class ListApp extends Component {
  componentWillMount() {
    this.tag = 0; // 是否是第一次进来
    this.getArticles(this.props.params.tagid);
  }
  // shouldComponentUpdate(nextProps) {
  //   console.log('shouldComponentUpdate', this.props.params.tagid, nextProps.params.tagid);
  //   return this.tag === 0 || this.props.params.tagid !== nextProps.params.tagid;
  // }
  componentWillUpdate(nextProps) { // 在初始化渲染的时候，该方法不会调用
    if (this.props.params.tagid !== nextProps.params.tagid) {
      this.tag++;
      this.getArticles(nextProps.params.tagid);
    }
  }
  getArticles(tagid) {
    const { dispatch, params } = this.props;
    dispatch(articleAllAction(params.categoryid, tagid));
  }
  render() {
    let articleDom = null;
    let id = '_id';
    const { articles, categoryData } = this.props;
    if (articles.length === 0) {
      articleDom = '暂无数据';
    } else {
      articleDom = articles.map(item =>
        (
        <li className="clearfix" key={item[id]}>
          <a href="#" className="wrap-img"></a>
          <div>
            <p className="list-top">{getTimeLeft(item.createTime)}</p>
            <h4 className="list-title">
              <Link
                to={`/view/detail/${item[id]}`}
              >
                {item.title}
              </Link>
            </h4>
            <div className="list-footer">
              <span>阅读数：{item.readNum}</span>
              <span className="list-footer-left">评论数：{item.commentNum}</span>
              <span className="list-footer-left">所属类别：{categoryData[item.categoryId]}</span>
            </div>
          </div>
        </li>
        )
      );
    }
    return (
      <div className="list-fluid">
        <div className="list-header">
          <div className="tags dark">
            <Tags
              tagid={this.props.params.tagid}
              categoryid={this.props.params.categoryid || 'all'}
            />
          </div>
        </div>
        <div className="list-container">
          <ul className="list-article clearfix have-img">
            {articleDom}
          </ul>
        </div>
      </div>
    );
  }
}
function mapToState(state) {
  return {
    articles: state.article.allArticles,
    categoryData: state.navBar.category
  };
}
ListApp.propTypes = {
  dispatch: PropTypes.func,
  articles: PropTypes.array,
  categoryData: PropTypes.object,
  params: PropTypes.object
};
export default connect(mapToState)(ListApp);
