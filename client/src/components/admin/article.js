import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Icon,
  Modal
} from 'antd';
import {
  articleAllAction
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
      deleteModalVisible: false
    });
  }
  // 删除文章
  deleteArticle() {
    console.log(this.state.deleteArticleId);
  }
  render() {
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
        <Icon type="edit" className="cursor" />
      </span>
    }];
    // 多选框
    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
      },
      onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
      }
    };
    const {
      allArticlesData
    } = this.props;

    return (
      <div>
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
    categoryData: state.navBar.category
  };
}
Article.propTypes = {
  dispatch: PropTypes.func,
  tagsData: PropTypes.array,
  allArticlesData: PropTypes.array,
  categoryData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};
export default connect(mapToState)(Article);
