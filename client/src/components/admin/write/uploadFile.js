import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { message, Button, Upload, Icon, Modal, Input, Row, Col } from 'antd';
import {
  getUpTokenAction // 获取上传token
} from '../../../actions/info';

const Dragger = Upload.Dragger;
class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false, // 弹出框是否显示
      uploadFileList: [], // 上传的文件的列表
      imgUrl: '' // input框中的图片链接
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUpTokenAction());
  }
  // input框中的图片链接
  onImgUrlChange(e) {
    if (!e.target.value) return;
    this.setState({
      imgUrl: e.target.value
    });
  }
  // 控制弹出框是否显示
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  // 向父级传送上传的图片列表
  transferImglist() {
    const { getUpImgList } = this.props;
    const state = this.state;
    if (state.uploadFileList.length > 0 || state.imgUrl) {
      let imgArr = Object.assign([], state.uploadFileList);
      this.toggleModal();
      if (state.imgUrl) {
        imgArr.push({
          url: state.imgUrl
        });
      }
      getUpImgList(imgArr);
      // 初始化数据
      this.setState({
        uploadFileList: [],
        imgUrl: ''
      });
    }
  }
  createUploadProps() {
    const { uptoken } = this.props;
    let self = this;
    return {
      name: 'file',
      showUploadList: true,
      action: 'http://up.qiniu.com',
      listType: 'picture',
      data: {
        token: uptoken
      },
      onChange: function(infos) {
        let filelistTemp = infos.fileList.slice(-1).map(file => {
          if (file.response) {
            file.url = 'http://ocppy2pfa.bkt.clouddn.com/' + file.response.hash;
          }
          return file;
        }).filter(file => {
          if (file.response) {
            return file.status === 'done';
          }
          return true;
        });
        self.setState({
          uploadFileList: filelistTemp
        });
        if (infos.file.status !== 'uploading') {
          // console.log(infos.file, infos.fileList);
        }
        if (infos.file.status === 'done') {
          message.success(`${infos.file.name} 上传成功。`);
        } else if (infos.file.status === 'error') {
          message.error(`${infos.file.name} 上传失败。`);
        }
      }
    };
  }
  render() {
    const uploadProps = this.createUploadProps();
    return (
      <div style={{ width: '100%' }}>
        <Button
          type="ghost"
          size="large"
          style={{ width: '100%' }}
          onClick={() => this.toggleModal()}
        >
          <Icon type="upload" />
          <span style={{ fontSize: 12 }}>{this.props.text || '添加图片'}</span>
        </Button>
        <Modal
          title="添加图片"
          visible={this.state.modalVisible}
          onOk={() => this.transferImglist()}
          onCancel={() => this.toggleModal()}
        >
          <div>请输入图片地址：</div>
          <Row style={{ marginTop: 5 }}>
            <Col xs={1}>
              <Icon
                type="picture"
                style={{ fontSize: 16, marginTop: 5 }}
              />
            </Col>
            <Col xs={23}>
              <Input
                type="text"
                placeholder="请输入图片地址"
                value={this.state.imgUrl}
                onChange={(e) => this.onImgUrlChange(e)}
              />
            </Col>
          </Row>
          <div style={{ margin: '5px 0' }}>或者直接上传图片</div>
          <Dragger {...uploadProps} fileList={this.state.uploadFileList}>
            <p className="ant-upload-drag-icon" style={{ marginTop: 15 }}>
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
            <p className="ant-upload-hint">支持单个或批量上传</p>
          </Dragger>
        </Modal>
      </div>
    );
  }

}

function mapToState(state) {
  return {
    uptoken: state.info.uptoken
  };
}
UploadFile.propTypes = {
  dispatch: PropTypes.func,
  uptoken: PropTypes.string,
  getUpImgList: PropTypes.func.isRequired,
  text: PropTypes.string
};
export default connect(mapToState)(UploadFile);
