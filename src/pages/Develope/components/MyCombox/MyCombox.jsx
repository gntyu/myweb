import React, { Component } from 'react';
import { TreeSelect,Icon,Select} from '@alifd/next';
import DataBinder from '@icedesign/data-binder';
import './index.scss';

const { Combobox } = Select;
const onChange = function(...args) {
  console.log(args);
};

@DataBinder({
  'testMuch': {
    url: '/qita/testMuch',
    method: 'post',
    data: { },
    defaultBindingData: {
      dataSource:[]
    }
  }
})
export default class MyCombox extends Component {
  static displayName = 'MyCombox';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount(){
    this.update();
  }
  
  update =(key)=>{
    this.props.updateBindingData('testMuch',{
      data:{
        text:key?key:''
      }
    },(res)=>{
      if(res&&res.data){
        this.isConneting=false;
        console.log('res.data',res.data)
        this.setState({
          dataSource:res.data
        });
      }
    })
  }

  isConneting = false;

  onInputUpdate(value) {
    if(!this.isConneting){
      this.isConneting=true;
      this.update(value); 
    }else{
      console.log('........')
    }
  }
  render() {
    return (
      <div className="demo-ctl">
        <Combobox
          onInputUpdate={this.onInputUpdate.bind(this)}
          filterLocal={false}
          fillProps="label"
          placeholder="请输入商品"
          onChange={onChange}
          dataSource={this.state.dataSource}
        />
      </div>
    );
  }
}