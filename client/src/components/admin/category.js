import React, { Component, PropTypes } from 'react';
// import { Button, message, Form, Input, Upload, Icon } from 'antd';
import { connect } from 'react-redux';
import { categoryAction } from '../../actions/navBar';

class Category extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(categoryAction(true));
  }
  render() {
    const { category } = this.props;
    console.log(category);
    return (
      <div>234</div>
    );
  }
}
function mapToState(state) {
  return {
    category: state.navBar.category
  };
}
Category.propTypes = {
  dispatch: PropTypes.func,
  category: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};
export default connect(mapToState)(Category);
