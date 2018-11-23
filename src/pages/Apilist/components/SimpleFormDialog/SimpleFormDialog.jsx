import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import DataBinder from '@icedesign/data-binder';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultValue = {
  keywords: '',
  type: 'post',
  content: '',
};
@DataBinder({
  'update': {
    url: '/api/updateapi',
    method: 'post',
    data: { },
    defaultBindingData: {

    }
  },
  'getsys': {
    url: '/api/getsys',
    method: 'get',
    data: { },
    defaultBindingData: {
        list:[]
    }
  }
})
export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: {
        content : props.row.result,
        syscode:props.row.syscode,
      },
      isMobile: false,
      id: props.row.id,
      list:[]
    };
  }

  componentDidMount() {
    this.props.updateBindingData('getsys',{},(res)=>{
      if(res&&res.data&&res.data.list){
        this.setState({
          list:res.data.list
        })
      }
    });
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = () => {
    this.setState({
      visible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = () => {
    this.refForm.validateAll((error) => {
      if (error) {
        // show validate error
        return;
      }
      // deal with value
      let sysname ='';
      this.state.list.map((item)=>{
        if(item.value==this.state.value.syscode){
          sysname=item.label
        }
      })
      this.props.updateBindingData('update',{
          data:{
            result:this.state.value.content,
            syscode:this.state.value.syscode,
            sysname,
            id:this.state.id
          }
        },(res)=>{
        if(res.errorCode==0){
          Feedback.toast.success('更新成功!');
          this.props.update();
        }else{
          Feedback.toast.error(res.errorDetail);
        }
        this.hideDialog();
      })

    });
  };

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { list } =this.props.bindingData.getsys;
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }

    return (
      <div>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="数据示例编辑"
          // {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.visible}
        >
          <IceFormBinderWrapper
            ref={(ref) => {
              this.refForm = ref;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div style={styles.dialogContent}>
              {/* <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>关键词</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    min={2}
                    max={10}
                    message="当前字段必填，且最少 2 个字最多 10 个字"
                  >
                    <Input
                      name="keywords"
                      style={styles.input}
                      placeholder="多关键词用英文 , 号分割"
                    />
                  </IceFormBinder>
                  <IceFormError name="keywords" />
                </Col>
              </Row> */}
              <Row style={styles.formRow}>
                <Col>
                  <IceFormBinder name="syscode">
                    <RadioGroup
                      // name="syscode"
                      dataSource={list}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col>
                  <IceFormBinder name="content">
                    <Input
                      // name="value"
                      style={styles.input}
                      multiple
                      // placeholder="请输入详细内容"
                      rows={16}
                      // value={this.state.value.content}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Button type="primary" onClick={this.showDialog}>
          更改示例
        </Button>
      </div>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
