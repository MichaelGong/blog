import React, { Component, PropTypes } from 'react';
import { Card, Col, Row, Modal, Form, Input } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { categoryAction } from '../../actions/navBar';
import { isArray } from '../../util';

const FormItem = Form.Item;
const createForm = Form.create;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      show: false,
      categoryItem: {}
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(categoryAction(true));
  }
  toggleModal(item) {
    this.setState({
      visible: !this.state.visible,
      show: !this.state.show,
      categoryItem: item || {}
    });
  }
  createQueueForm() {
    const { getFieldProps, getFieldError } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    const categoryName = getFieldProps('categoryName', {
      rules: [{
        required: true,
        min: 1,
        message: '请输入个类别名称'
      }],
      initialValue: this.state.categoryItem.name || ''
    });
    const categoryDesc = getFieldProps('categoryDesc', {
      rules: [{
        required: true,
        min: 1,
        message: '请输入类别描述'
      }],
      initialValue: this.state.categoryItem.desc || ''
    });
    return (
      <QueueAnim
        component={Form}
        className="ant-form ant-form-horizontal"
        type="right"
        delay={300}
      >
        {this.state.show ? [
          <FormItem
            key="item1"
            {...formItemLayout}
            label="分类名称："
            style={{ marginTop: 20 }}
            help={(getFieldError('categoryName') || []).join(', ')}
          >
            <Input {...categoryName} type="text" placeholder="请输入分类名称" />
          </FormItem>,
          <FormItem
            key="item2"
            {...formItemLayout}
            label="分类描述："
            help={(getFieldError('categoryDesc') || []).join(', ')}
          >
            <Input {...categoryDesc} type="text" placeholder="请输入分类描述" />
          </FormItem>
        ] : null}
      </QueueAnim>
    );
  }
  createCategory() {
    const { category } = this.props;
    let id = '_id';
    if (isArray(category)) {
      return category.map(item =>
        (
        <Col lg={{ span: 6 }} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8 }} key={item[id]}>
          <Card
            style={{ textAlign: 'center', cursor: 'pointer', margin: 5 }}
            title={item.name}
            onClick={() => this.toggleModal(item)}
          >
            <p className="category-item">{item.desc}</p>
            <p className="category-item">创建时间：{item.createTime || '--'}</p>
            <p className="category-item">更新时间：{item.updateTime || '--'}</p>
          </Card>
        </Col>
        )
      );
    }
    return '';
  }
  render() {
    const queueFormDom = this.createQueueForm();
    const categoryDom = this.createCategory();
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
          {queueFormDom}
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
  form: PropTypes.object.isRequired,
  category: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};
export default connect(mapToState)(createForm()(Category));
