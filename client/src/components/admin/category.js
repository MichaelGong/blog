import React, { Component, PropTypes } from 'react';
import { Card, Col, Row, Modal, Form, Input, message, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { categoryAction, categoryUpdateAction, emptyCategoryUpdate } from '../../actions/navBar';
import { isArray } from '../../util';

const FormItem = Form.Item;
const createForm = Form.create;

const createStyle = {
  icon: {
    width: 30,
    height: 30,
    lineHeight: '30px'
  },
  plus: {
    padding: 24,
    color: '#ccc',
    fontSize: 30,
    cursor: 'pointer'
  },
  card: {
    textAlign: 'center',
    margin: 5,
    cursor: 'pointer'
  }
};

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      show: false, // 控制动画是否显示
      categoryItem: {}
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(categoryAction(true));
  }
  componentDidUpdate() {
    const { dispatch, updateCategory } = this.props;
    if (updateCategory && updateCategory.code === 200) {
      this.toggleModal(null);
      dispatch(categoryAction(true));
      message.success('更新成功!');
    } else if (updateCategory) {
      message.error(updateCategory.mseeage);
    }
    dispatch(emptyCategoryUpdate());
  }
  toggleModal(item) {
    this.setState({
      visible: !this.state.visible,
      show: !this.state.show,
      categoryItem: item || {}
    });
  }
  // 创建动画form
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
        delay={100}
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
  // 创建category
  createCategory() {
    const { category } = this.props;
    let id = '_id';
    if (isArray(category)) {
      return category.map(item =>
        (
        <Col lg={{ span: 6 }} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8 }} key={item[id]}>
          <Card
            style={createStyle.card}
            title={item.name}
            onClick={() => this.toggleModal(item)}
          >
            <p className="category-item">{item.desc}</p>
            <p className="category-item">创建时间：{item.createTime || '--'}</p>
            <p className="category-item">更新时间：{item.updateTime || '--'}</p>
            <div className="category-action clearfix">
              <Icon type="edit" style={createStyle.icon} />
              <Icon type="delete" style={createStyle.icon} />
            </div>
          </Card>
        </Col>
        )
      );
    }
    return '';
  }
  // 更新分类 或者 添加分类
  updateCatogory() {
    console.log(this.state.categoryItem);
    const id = '_id';
    const { dispatch, form } = this.props;
    form.validateFields((errors, values) => {
      var data = {};
      if (errors) {
        return;
      }
      if (!errors) {
        data.id = this.state.categoryItem[id];
        data.name = values.categoryName;
        data.desc = values.categoryDesc;
      }
      dispatch(categoryUpdateAction(data.id, data.name, data.desc));
    });
  }
  render() {
    const queueFormDom = this.createQueueForm();
    const categoryDom = this.createCategory();
    return (
      <div>
        <Row>
          {categoryDom}
          <Col lg={{ span: 6 }} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8 }} key="card-add">
            <Card
              style={{ textAlign: 'center', margin: 5 }}
              title="添加分类"
            >
              <div style={createStyle.plus} onClick={() => this.toggleModal()}>
                <Icon type="plus" />
              </div>
            </Card>
          </Col>
        </Row>
        <Modal
          title="修改分类信息"
          visible={this.state.visible}
          onOk={() => this.updateCatogory()}
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
    category: state.navBar.category,
    updateCategory: state.navBar.updateCategory
  };
}
Category.propTypes = {
  dispatch: PropTypes.func,
  form: PropTypes.object.isRequired,
  category: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  updateCategory: PropTypes.object
};
export default connect(mapToState)(createForm()(Category));
