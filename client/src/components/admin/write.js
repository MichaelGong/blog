import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Write extends Component {
  render() {
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
Write.propTypes = {
  dispatch: PropTypes.func,
  tagsData: PropTypes.array
};
export default connect(mapToState)(Write);
