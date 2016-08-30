import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { category } from '../actions/navBar';
import { info } from '../actions/info';
import Tags from './tags';
import './navBar.less';

class NavBar extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(category());
    dispatch(info());
  }
  render() {
    let categoryDom = null;
    const { categoryData, infoData, params } = this.props;
    categoryDom = Object.keys(categoryData).map((item) =>
      (
      <li key={'category' + item} className={params.categoryid === item ? 'active' : ''}>
        <Link
          to={`/view/list/${item}`}
        >
          {categoryData[item]}
        </Link>
      </li>
      )
    );
    return (
      <div>
        <div className="navbar navbar-fixed navbar-bg">
          <a className="navbar-logo"></a>
          <p className="navbar-motto" dangerouslySetInnerHTML={{ __html: infoData.oneWord }}></p>
          <ul className="navbar-category">
            <li
              key={'categoryAll'}
              className={(params.categoryid === 'all' ||
                params.categoryid === undefined) ? 'active' : ''}
            >
              <Link
                to={'/view/list/all'}
              >
                全部分类
              </Link>
            </li>
            {categoryDom}
          </ul>
          <div className="tags navbar-bottom">
            <a className="tags-title display block">TAGS</a>
            <Tags />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

function mapToState(state) {
  return {
    categoryData: state.navBar.category,
    infoData: state.info.info
  };
}
NavBar.propTypes = {
  dispatch: PropTypes.func,
  categoryData: PropTypes.object,
  children: PropTypes.object,
  infoData: PropTypes.object,
  params: PropTypes.object
};
export default connect(mapToState)(NavBar);
