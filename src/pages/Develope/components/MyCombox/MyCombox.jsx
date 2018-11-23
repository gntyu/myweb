import React, { Component } from 'react';
import { TreeSelect,Icon,Select} from '@icedesign/base';
import './index.scss';

const { Combobox } = Select;

export default class MyCombox extends Component {
  static displayName = 'MyCombox';

  constructor(props) {
    super(props);
    this.state = {
      value:[],
      // all:'全选'
    };
  }

  onChange =(value)=>{
    console.log('-value-',value)

    const isAll = value.includes('all');
    if(isAll){
      // this.setState({
      //   value:this.data
      // });
    }else{
      this.setState({
        value
      });
    }


    if(this.props.onChange){
      if(isAll){
        this.props.onChange(this.data);
      }else{
        this.props.onChange(value);
      }

    }
  }

  clear =()=>{
    this.setState({
      value:[]
    });
    if(this.props.onChange){
      this.props.onChange([]);
    }
  }

  data=[];

  render() {
    this.data = this.props.dataSource?this.props.dataSource:treeData;
    const newdata=this.data.map((item)=>{
      if(typeof(item)!="object"){
        return {
          value:item,
          label:item,
        }
      }
      return item;
    });
    return (
      <div className="my-combobox-page">
          <Combobox 
          multiple
          autoWidth
          fillProps="label"
          onChange={this.onChange}
          value={this.props.value?this.props.value:this.state.value}
          style={this.props.style||{ width: 200 }}
          prefix="lycombox-"
          dataSource={[
            { 
              label:'全部', 
              value: "all"
            },...newdata
          ]}
          />
          <Icon type="close" size="xs" className="clearIcon" onClick={this.clear}/>
      </div>
    );
  }
}

const treeData = [
      {
        label: "示例1",
        value: "1"
      },
      {
        label: "示例2",
        value: "2"
      },
      {
        label: "示例3",
        value: "3"
      },
      {
        label: "示例4",
        value: "4",
      },
      {
        label: "示例5",
        value: "5"
      }
    ]
