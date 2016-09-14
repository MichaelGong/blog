import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class Article extends Component {
  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }];

    return (
      <div>MM</div>
    );
  }
}

function mapToState(state) {
  return {
    tagsData: state.tags.tags
  };
}
Article.propTypes = {
  dispatch: PropTypes.func,
  tagsData: PropTypes.array
};
export default connect(mapToState)(Article);
