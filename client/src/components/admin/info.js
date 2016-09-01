import React, { Component, PropTypes } from 'react';
import { Button, Form, Input, Upload, Icon } from 'antd';


const createForm = Form.create;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

class Info extends Component {
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    };
    const signature = getFieldProps('signature', {
      rules: [
        {
          required: true,
          min: 1,
          message: '请输入个性签名'
        }
      ]
    });
    const uploadProps = {
      name: 'file',
      showUploadList: false,
      action: '/upload.do'
    };
    return (
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="个性签名"
          hasFeedback
          help={isFieldValidating('signature') ? '校验中...' : (getFieldError('signature') || []).join(', ')}
        >
          <Input {...signature} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="个人头像"
        >
          <div>
            <div style={{ height: 180 }}>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
              </Dragger>
            </div>
          </div>
        </FormItem>
      </Form>
    );
  }
}
Info.propTypes = {
  form: PropTypes.object.isRequired
};
export default createForm()(Info);
