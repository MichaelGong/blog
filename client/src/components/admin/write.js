import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Select } from 'antd';
import $ from 'jquery';
import 'marked';
import 'prettify';
import editormd from 'editormd';
import 'editormd.css';
import 'CodeMirror';

const FormItem = Form.Item;
const Option = Select.Option;

class Write extends Component {
  componentDidMount() {
    console.log($('#editormd'));
    if ($('#editormd').length > 0
      && $('#editormd').children().length === 0) {
      console.log('2222', editormd);
      this.editor = editormd()('editormd', {
        width: '100%',
        height: 740,
        markdown: '# 123123',
        path: 'https://pandao.github.io/editor.md/lib/',
        codeFold: true,
        saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
        searchReplace: true,
        watch: true,                // 关闭实时预览
        htmlDecode: 'style,script,iframe|on*',            // 开启 HTML 标签解析，为了安全性，默认不开启
        // toolbar  : false,             //关闭工具栏
        // previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启

        // dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
        // dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        // dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
        // dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
        // dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
        imageUpload: true,
        imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
        imageUploadURL: './php/upload.php',
        onload: function() {
          console.log('onload', this);
            // this.fullscreen();
            // this.unwatch();
            // this.watch().fullscreen();

            // this.setMarkdown("#PHP");
            // this.width("100%");
            // this.height(480);
            // this.resize("100%", 640);
        }

      });
      console.log(this.editor);
    }
  }
  render() {
    return (
      <div>
        <FormItem>
          <Input placeholder="请输入文章标题" style={{ width: '100%' }} />
        </FormItem>
        <Row gutter={16}>
          <Col span={6}>
            <Select style={{ width: '100%' }} defaultValue="">
              <Option value="" disabled selected="selected">--请选择分类--</Option>
              <Option value="jack">jack</Option>
              <Option value="lucy">lucy</Option>
              <Option value="sdfsdf">sfsdf</Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
          </Col>
        </Row>
        <div id="editormd"></div>
      </div>
    );
  }
}

function mapToState(state) {
  return {
    tagsData: state.tags.tags
  };
}
Write.propTypes = {
  dispatch: PropTypes.func,
  tagsData: PropTypes.array
};
export default connect(mapToState)(Write);
