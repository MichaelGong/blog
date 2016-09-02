import React, { Component, PropTypes } from 'react';
import { Button, message, Form, Input, Upload, Icon } from 'antd';
import { connect } from 'react-redux';
import { getUpToken, updateInfo } from '../../actions/info';

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
  handleSubmit(e) {
    var me = this;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      var data = {};
      if (errors) {
        console.log(errors);
        return;
      }
      console.log(errors, me.state.fileList);
      if (me.state.fileList.length !== 0) {
        if (me.state.fileList[0].url) {
          data.headpic = me.state.fileList[0].url;
        }
      }
      if (!errors) {
        data.signature = values.signature;
      }
      data.id = '57a9567e8cca2b1fc8d789bb';
      const { dispatch } = this.props;
      dispatch(updateInfo(data));
    });
  }
  handleCancel() {

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
            <div>
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
  uptoken: PropTypes.string
};

function mapToState(state) {
  return {
    uptoken: state.info.uptoken
  };
}
export default connect(mapToState)(createForm()(Info));
