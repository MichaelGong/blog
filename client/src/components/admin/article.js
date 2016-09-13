import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Article extends Component {
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
Article.propTypes = {
  dispatch: PropTypes.func,
  tagsData: PropTypes.array
};
export default connect(mapToState)(Article);
