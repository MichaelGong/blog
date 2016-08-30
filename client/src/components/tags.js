import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { tags } from '../actions/tags';
import './navBar.less';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.currentId = '';
    // this.setCurrentId = this.setCurrentId.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(tags());
  }
  setCurrentId(id) {
    this.setState({
      currentId: id
    });
  }
  render() {
    const { tagData, tagid, categoryid } = this.props;
    let tagsDom = tagData.map(item => {
      let idTmp = '_id';
      let id = item[idTmp];
      return (
        <Link
          to={`/list/${categoryid}/${id}`}
          key={`tags-${id}`}
          title={item.name}
          className={id === tagid ? 'tag active' : 'tag'}
        >
          {item.name}
        </Link>
      );
    });
    return (<div>{tagsDom}</div>);
  }
}

function mapToState(state) {
  return {
    tagData: state.tags.tags
  };
}
Tags.propTypes = {
  dispatch: PropTypes.func,
  tagData: PropTypes.array,
  tagid: PropTypes.string,
  categoryid: PropTypes.string,
  params: PropTypes.object
};
export default connect(mapToState)(Tags);
