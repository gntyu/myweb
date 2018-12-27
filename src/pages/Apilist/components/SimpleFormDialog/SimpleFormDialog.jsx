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
    url: '/lyapi/updateapi',
    method: 'post',
    data: { },
    defaultBindingData: {

    }
  },
  // 'getsys': {
  //   url: '/lyapi/getsys',
  //   method: 'get',
  //   data: { },
  //   defaultBindingData: {
  //       list:[]
  //   }
  // }
})
export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);

    this.state = {
      // visible: false,
      value: {
        content : props.row.result,
        syscode:props.row.syscode,
        method:props.row.method,
      },
      isMobile: false,
      isStrict:props.row.isStrict,
      id: props.row.id,
      list:[]
    };
  }

  componentWillReceiveProps(nextprops){
    this.setState({
      value: {
        content :nextprops.row.result,
        syscode:nextprops.row.syscode,
        method:nextprops.row.method,
      },
      id: nextprops.row.id,
      isStrict:nextprops.row.isStrict,
    })
  }

  componentDidMount() {
    // this.props.updateBindingData('getsys',{},(res)=>{
    //   if(res&&res.data&&res.data.list){
    //     this.setState({
    //       list:res.data.list
    //     })
    //   }
    // });
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
      this.props.close()
      // deal with value
      let sysname ='';
      this.props.sys.map((item)=>{
        if(item.value==this.state.value.syscode){
          sysname=item.label
        }
      })
      this.props.updateBindingData('update',{
          data:{
            path:this.props.row.path,
            result:this.state.value.content,
            syscode:this.state.value.syscode,
            method:this.state.isStrict?this.state.value.method:'',
            sysname,
            id:this.state.id
          }
        },(res)=>{
          this.props.update();
          if(res.errorCode==0){
            Feedback.toast.success('更新成功!');
          }else{
            Feedback.toast.error(res.errorDetail);
          }
      })

    });
  };

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const  list  =this.props.sys;
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
          onCancel={this.props.close}
          onClose={this.props.close}
          isFullScreen
          visible={this.props.showDialog}
        >
          <IceFormBinderWrapper
            ref={(ref) => {
              this.refForm = ref;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div style={styles.dialogContent}>
              <Row style={styles.formRow}>
                <Col>
                  <IceFormBinder name="syscode">
                    <RadioGroup
                      dataSource={list}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

            
              <Row style={styles.formRow}>
                <Col>
                {(this.state.isStrict==1?true:false)&&( <IceFormBinder name="method">
                    <RadioGroup
                      dataSource={['POST','GET','DELETE']}
                    />
                  </IceFormBinder>)}
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
        {/* <Button type="primary" onClick={this.showDialog}>
          更改示例
        </Button> */}
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
