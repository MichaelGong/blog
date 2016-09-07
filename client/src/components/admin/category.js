import React, { Component, PropTypes } from 'react';
import { Card, Col, Row, Modal } from 'antd';
import { connect } from 'react-redux';
import { categoryAction } from '../../actions/navBar';
import { isArray } from '../../util';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(categoryAction(true));
  }
  toggleModal() {
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    const { category } = this.props;
    let categoryDom;
    let id = '_id';
    if (isArray(category)) {
      categoryDom = category.map(item =>
        (
        <Col lg={{ span: 6 }} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8 }} key={item[id]}>
          <Card
            style={{ textAlign: 'center', cursor: 'pointer', margin: 5 }}
            title={item.name}
            onClick={() => this.toggleModal()}
          >
            <p className="category-item">{item.desc}</p>
            <p className="category-item">创建时间：{item.createTime || '--'}</p>
            <p className="category-item">更新时间：{item.updateTime || '--'}</p>
          </Card>
        </Col>
        )
      );
    }
    return (
      <div>
        <Row>
          {categoryDom}
        </Row>
        <Modal
          title="修改分类信息"
          visible={this.state.visible}
          onOk={() => this.toggleModal()}
          onCancel={() => this.toggleModal()}
        >
          <p>弹出框</p>
        </Modal>
      </div>
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
