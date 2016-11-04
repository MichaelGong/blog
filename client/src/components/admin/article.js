import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  Table,
  Icon,
  Modal,
  message,
  Button
} from 'antd';
import {
  articleAllAction,
  deleteArticleByIdAction,
  emptyDeleteArticleByIdAction
} from '../../actions/article';
import {
  categoryAction
} from '../../actions/navBar';
import {
  getTime,
  isArray
} from '../../util';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalVisible: false, // 删除弹出框是否显示
      editModalVisible: false // 编辑弹出框是否显示
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(articleAllAction());
    dispatch(categoryAction(true));
  }
  componentDidUpdate() {
    const {
      deleteArticleData,
      dispatch
    } = this.props;
    if (deleteArticleData && deleteArticleData.code === 200) { // 删除文章
      this.cancelDeleteArticleModal();
      dispatch(emptyDeleteArticleByIdAction());
      dispatch(articleAllAction());
      message.success('删除成功!');
    } else if (deleteArticleData) {
      message.error(deleteArticleData.message);
      dispatch(emptyDeleteArticleByIdAction());
    }
  }
  // 根据id获取分类名称
  getCategoryName(id) {
    const { categoryData } = this.props;
    const idStr = '_id';
    if (!isArray(categoryData)) return '--';
    const categoryDataItem = categoryData.filter(item => item[idStr] === id);
    return categoryDataItem[0].name;
  }
  // 展示删除文章弹出框
  showDeleteArticleModal(item) {
    let id = '_id';
    this.setState({
      deleteArticleId: item[id],
      deleteModalVisible: true
    });
  }
  // 隐藏删除文章弹出框
  cancelDeleteArticleModal() {
    this.setState({
      deleteModalVisible: false,
      deleteArticleId: null
    });
  }
  // 删除文章
  deleteArticle() {
    const { dispatch } = this.props;
    dispatch(deleteArticleByIdAction([this.state.deleteArticleId]));
  }
  // 批量删除文章
  deleteArticles() {
    let id = '_id';
    if (this.state.selectedRows.length === 0) return;
    const { dispatch } = this.props;
    dispatch(deleteArticleByIdAction(this.state.selectedRows.map(item => item[id])));
  }
  // 是否显示
  isShow(text) {
    return text ? '是' : '否';
  }
  render() {
    let me = this;
    let id = '_id';
    // 列
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '分类',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: text => this.getCategoryName(text)
    }, {
      title: '是否显示',
      dataIndex: 'isShow',
      key: 'isShow',
      render: text => this.isShow(text)
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: text => getTime(text)
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: text => getTime(text)
    }, {
      title: '阅读数',
      dataIndex: 'readNum',
      key: 'readNum'
    }, {
      title: '评论数',
      dataIndex: 'commentNum',
      key: 'commentNum'
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => <span style={{ fontSize: 16 }}>
        <Icon
          type="delete"
          className="cursor"
          style={{ marginRight: 10 }}
          onClick={() => this.showDeleteArticleModal(record)}
        />
        <Link
          to={`/admin/write?articleId=${record[id]}`}
        >
          <Icon type="edit" className="cursor" />
        </Link>
      </span>
    }];
    // 多选框
    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        console.log('onChange:',
          `selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        me.setState({
          selectedRows: selectedRows
        });
      },
      onSelect(record, selected, selectedRows) {
        console.log('onSelect:', record, selected, selectedRows);
      },
      onSelectAll(selected, selectedRows, changeRows) {
        console.log('onSelectAll:', selected, selectedRows, changeRows);
      }
    };
    const { allArticlesData } = this.props;

    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={() => this.deleteArticles()}
        >
          批量删除
        </Button>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={allArticlesData}
        />
        <Modal
          title="提示"
          visible={this.state.deleteModalVisible}
          onOk={() => this.deleteArticle()}
          onCancel={() => this.cancelDeleteArticleModal()}
        >
          确定删除该文章吗？
        </Modal>
      </div>
    );
  }
}

function mapToState(state) {
  return {
    allArticlesData: state.article.allArticles,
    categoryData: state.navBar.category,
    deleteArticleData: state.article.deleteArticle
  };
}
Article.propTypes = {
  dispatch: PropTypes.func,
  tagsData: PropTypes.array,
  allArticlesData: PropTypes.array,
  categoryData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  deleteArticleData: PropTypes.object
};
export default connect(mapToState)(Article);
