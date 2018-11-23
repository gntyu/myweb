import React, { Component } from 'react';
import { TreeSelect,Icon} from '@icedesign/base';
import './index.scss';

export default class MySelect extends Component {
  static displayName = 'MySelect';

  constructor(props) {
    super(props);
    this.state = {
      value:''
    };
  }

  onChange =(value)=>{
    // console.log('-value-',value)
    this.setState({
      value
    });
    if(this.props.onChange){
      if(value=='all'){
        this.props.onChange(this.data);
      }else{
        this.props.onChange(value);
      }

    }
  }

  clear =()=>{
    this.setState({
      value:''
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
      <div className="my-select-page">
          <TreeSelect
            treeDefaultExpandAll
            treeCheckable
            autoWidth={this.props.autoWidth||false}
            showSearch={true}
            dataSource={
              newdata.length>0?[{ 
                label: "全部", 
                value: "all",
                children:newdata
              }]:[]
            }
            onChange={this.onChange}
            style={this.props.style||{ width: 200 }}
            prefix="lymulti-"
            // popupClassName="lymulti-"
            hasArrow={false}
            value={this.props.value?this.props.value:this.state.value}
            
          />
          <Icon type="close" size="xs" className="clearIcon" onClick={this.clear}/>
      </div>
    );
  }
}

const treeData = [
      {
        label: "示例1",
        value: "2"
      },
      {
        label: "示例2",
        value: "4"
      },
      {
        label: "示例3",
        value: "5"
      },
      {
        label: "示例4",
        value: "3",
      },
      {
        label: "示例5",
        value: "6"
      }
    ]
