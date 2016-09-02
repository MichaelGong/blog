import React, { Component, PropTypes } from 'react';
import { Button, message, Form, Input, Upload, Icon } from 'antd';
import { connect } from 'react-redux';
import { getUpToken } from '../../actions/info';

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
  }
  render() {
    var me = this;
    const { uptoken } = this.props;
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
      }]
    });
    const uploadProps = {
      name: 'file',
      showUploadList: true,
      action: 'http://up.qiniu.com',
      listType: 'picture',
      data: {
        token: uptoken
      },
      onChange: function(info) {
        console.log(info);
        me.setState({
          fileList: info.fileList.slice(-1).map(file => {
            if (file.response) {
              file.url = 'http://ocppy2pfa.bkt.clouddn.com/' + file.response.hash;
            }
            return file;
          }).filter(file => {
            if (file.response) {
              return file.status === 'done';
            }
            return true;
          })
        });
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功。`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败。`);
        }
      }
    };
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
            <div style={{ height: 180 }}>
              <Dragger {...uploadProps} fileList={this.state.fileList}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
              </Dragger>
            </div>
          </div>
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}
Info.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  uptoken: PropTypes.string
};

function mapToState(state) {
  return {
    uptoken: state.info.uptoken
  };
}
export default connect(mapToState)(createForm()(Info));
