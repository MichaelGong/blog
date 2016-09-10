import React, { Component, PropTypes } from 'react';
import { Button, message, Form, Input, Upload, Icon } from 'antd';
import { connect } from 'react-redux';
import {
  info,
  getUpToken,
  updateInfo,
  resetUpdateInfo,
  setFileListAction
} from '../../actions/info';

const createForm = Form.create;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUpToken());
    dispatch(info());
  }
  componentDidUpdate() {
    var updateInfoState = this.props.updateInfo;
    var isupdateInfo = this.props.isupdateinfo;
    const { dispatch } = this.props;
    if (isupdateInfo) {
      if (+updateInfoState.code === 200) {
        message.success('更新成功！');
      } else {
        message.error(updateInfoState.message);
      }
      dispatch(resetUpdateInfo());
    }
  }
  // 提交基本信息
  handleSubmit(e) {
    var id = '_id';
    var infoId = this.props.infoData[id];
    const { fileList } = this.props;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      var data = {};
      if (errors) {
        return;
      }
      if (fileList.length !== 0) {
        if (fileList[0].url) {
          data.headpic = fileList[0].url;
        }
      }
      if (!errors) {
        data.signature = values.signature;
      }
      data.id = infoId;
      const { dispatch } = this.props;
      dispatch(updateInfo(data));
    });
  }
  createUploadProps() {
    const { dispatch, uptoken } = this.props;
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
        dispatch(setFileListAction(filelistTemp));
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
    const { infoData, fileList } = this.props;
    const { getFieldProps, getFieldError } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    };
    const signature = getFieldProps('signature', {
      rules: [{
        required: true,
        min: 1,
        message: '请输入个性签名'
      }],
      initialValue: infoData.oneWord
    });
    const uploadProps = this.createUploadProps();
    return (
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="个性签名"
          hasFeedback
          help={(getFieldError('signature') || []).join(', ')}
        >
          <Input {...signature} placeholder="请输入个性签名" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="个人头像"
        >
          <div>
            <div>
              <Dragger {...uploadProps} fileList={fileList}>
                <p className="ant-upload-drag-icon" style={{ marginTop: 15 }}>
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
              </Dragger>
            </div>
          </div>
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" onClick={(e) => this.handleSubmit(e)}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={(e) => this.handleCancel(e)}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}
Info.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  uptoken: PropTypes.string,
  infoData: PropTypes.object,
  updateInfo: PropTypes.object,
  isupdateinfo: PropTypes.bool,
  fileList: PropTypes.array
};

function mapToState(state) {
  return {
    uptoken: state.info.uptoken,
    infoData: state.info.info,
    updateInfo: state.info.updateInfo,
    isupdateinfo: state.info.isupdateinfo,
    fileList: state.info.fileList
  };
}
export default connect(mapToState)(createForm()(Info));
