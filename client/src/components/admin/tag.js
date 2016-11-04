// 蓝色：#2db7f5
// 绿色：#87d068
// 黄色：#fa0
// 红色：#f50
// 橙色：#fb8c00

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  tags
} from '../../actions/tags';
import { random } from '../../util';
const colorArr = [
  '#2db7f5',
  '#87d068',
  '#fa0',
  '#f50',
  '#fb8c00'
];
class Tag extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(tags());
  }
  shouldComponentUpdate(nextProps) {
    return this.props.tagsData !== nextProps.tagsData;
  }
  render() {
    const id = '_id';
    const { tagsData } = this.props;
    const tagDom = tagsData.map(item =>
      (
      <div
        className="admin-tag"
        style={{ background: colorArr[random(0, 4)] }}
        key={item[id]}
      >
        {item.name}
      </div>
      )
    );
    return (
      <div>{tagDom}</div>
    );
  }
}
function mapToState(state) {
  return {
    tagsData: state.tags.tags
  };
}
Tag.propTypes = {
  dispatch: PropTypes.func,
  tagsData: PropTypes.array
};
export default connect(mapToState)(Tag);
