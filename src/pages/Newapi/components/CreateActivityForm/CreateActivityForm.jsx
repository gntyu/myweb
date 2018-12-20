import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Feedback
} from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

// Switch 组件的选中等 props 是 checked 不符合表单规范的 value 在此做转换
const SwitchForForm = (props) => {
  const checked = props.checked === undefined ? props.value : props.checked;

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={(currentChecked) => {
        if (props.onChange) props.onChange(currentChecked);
      }}
    />
  );
};

@DataBinder({
  'addapi': {
    url: '/lyapi/addapi',
    method: 'post',
    data: { },
    defaultBindingData: {
 
    }
  },
  'getsys': {
    url: '/lyapi/getsys',
    method: 'get',
    data: { },
    defaultBindingData: {
        list:[]
    }
  }
})
export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.init={
      path: '',
      desc: '',
      result: '',
      nums: 0,
      isRandom:false,
      isStrict:false,
      method:'POST',
      isExtend: false,
      syscode:'uc',
    }
    this.state = {
      value: {
        ...this.init,
      },
      // defaultValue:'',
    };
  }

  componentWillMount(){
    this.props.updateBindingData('getsys');
  }

  onFormChange = (value) => {
    // console.log('value',value)
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        ...this.init,
      },
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      
      if (error) {
        // 处理表单报错
        return ;
      }

      // 提交当前填写的数据
      this.props.updateBindingData('addapi',{data:value},(res)=>{
        if(res.errorCode==0){
          Feedback.toast.success('添加成功');
        }else{
          Feedback.toast.error(res.errorDetail);
        }
      });
 
    });
  };

  render() {
    const { list } =this.props.bindingData.getsys;
    return (
      <div className="create-activity-form">
        <IceContainer title="创建新的api" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  api路径：
                </Col>

                <Col s="12" l="10">
                  /api-portal/
                  <IceFormBinder
                    name="path"
                    required
                    message="api路径必须填写"
                  >
                    <Input style={{ width: '80%' }} />
                  </IceFormBinder>
                  <IceFormError name="path" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  所属系统：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="syscode" >
                    <Select
                      className="next-form-text-align"
                      style={{width:'100%'}}
                      defaultValue="uc"
                      dataSource={list}
                    />
                  </IceFormBinder>
                </Col>
              </Row>


              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  接口描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="desc">
                    <Input style={{ width: '100%' }} />
                    {/* <Select
                      className="next-form-text-align"
                      dataSource={[
                        { label: '区域一', value: 'location1' },
                        { label: '区域二', value: 'location2' },
                      ]}
                    /> */}
                  </IceFormBinder>
                </Col>
              </Row>

              {/* <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  活动时间：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="time"
                    type="array"
                    // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                    valueFormatter={(date, dateStr) => dateStr}
                  >
                    <RangePicker showTime />
                  </IceFormBinder>
                </Col>
              </Row> */}

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  严格模式：
                </Col>
                <Col xxs="6" s="2" l="2">
                  <IceFormBinder name="isStrict">
                    <SwitchForForm />
                  </IceFormBinder>
                </Col>

                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  随机数值：
                </Col>
                <Col xxs="6" s="2" l="2">
                  <IceFormBinder name="isRandom">
                    <SwitchForForm />
                  </IceFormBinder>
                </Col>

                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  扩展数组：
                </Col>
                <Col xxs="6" s="2" l="2">
                  <IceFormBinder name="isExtend">
                    <SwitchForForm />
                  </IceFormBinder>
                </Col>

              </Row>

             
              
            {this.state.value.isStrict&&(
              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  请求方式：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="method">
                    <RadioGroup
                      className="next-form-text-align"
                      dataSource={['POST','GET','DELETE']}
                    />
                  </IceFormBinder>
                </Col>
              </Row>)}

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  数组数目：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="nums">
                    <Input  style={{ width: '100%' }} />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  数据示例：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="result">
                    <Input multiple style={{ width: '100%' }} />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="12" l="10">
                  <Button type="primary" onClick={this.submit}>
                    立即创建
                  </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
