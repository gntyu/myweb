import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button,Switch,Feedback,Checkbox,Input } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';
import CellEditor from './CellEditor';
import SimpleFormDialog from '../SimpleFormDialog';
import './EditableTable.scss';

const CheckboxGroup = Checkbox.Group;
const generatorData = () => {
  return Array.from({ length: 5 }).map((item, index) => {
    return {
      todo: `待办事项 ${index}`,
      memo: `备注说明文案 ${index}`,
      validity: '2017-12-12',
    };
  });
};

@DataBinder({
  'apilist': {
    url: '/lyapi/apilist',
    method: 'post',
    data: { },
    defaultBindingData: {
      dataSource:[]
    }
  },
  'delete': {
    url: '/lyapi/deleteapi',
    method: 'post',
    data: { },
    defaultBindingData: {
      
    }
  },
  'update': {
    url: '/lyapi/updateapi',
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
export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: generatorData(),
      visible:false,
      list:['uc','kpi','qita'],
      path:'',
      filterData:[],
    };
  }
  componentWillMount(){
    this.update();
    this.props.updateBindingData('getsys');
  }
  
  update =()=>{
    this.props.updateBindingData('apilist',{
      data:{
        syscode:this.state.list
      }
    })
  }

  renderOrder = (value, index) => {
    return <span>{index+1}</span>;
  };

  deleteItem = (order) => {
    this.props.updateBindingData('delete',{data:order},(res)=>{
      if(res.errorCode==0){
        Feedback.toast.success('删除成功!');
        this.update();
      }else{
        Feedback.toast.error(res.errorDetail);
      }
    })
  };

  onOpen =()=>{
    this.setState({
      visible:true,
    })
  }

  renderOperation = (data,value, index,order) => {
    // console.log('data',data)
    return (
      <div>
        <SimpleFormDialog row={this.props.bindingData.apilist.list[index]} update={this.update} sys={this.props.bindingData.getsys.list} />
      </div>
    );
  };

  renderDelete = (value, index,order) => {
    return  (
      <div>
          <Button onClick={this.deleteItem.bind(this, order)} shape="text">
            删除
          </Button>
        </div>
    )
  }

  changeDataSource = (record,index, valueKey, value) => {
    const item ={};
    if(valueKey=='isRandom'||valueKey=='isExtend'||valueKey=='isStrict'){
      item[valueKey]=value?1:0;
    }else{
      item[valueKey]=value;
    }
    item['id']=record.id;
    if(valueKey!='path')item['path']=record.path;//如果不更改path ,需要拿path进行判断

    this.props.updateBindingData('update',{data:item},(res)=>{
      if(res.errorCode==0){
        Feedback.toast.success('更新成功!');
        this.update();
      }else{
        Feedback.toast.error(res.errorDetail);
      }
    })
  };

  change =(path)=>{
    path =path.replace(/[^a-zA-Z0-9]/g,"");
    const filterData=this.props.bindingData.apilist.list.filter(item=>item.path.indexOf(path)>-1);
    this.setState({
      path,
      filterData
    }); 
  }


  changeCheck=(list)=>{
    console.log('list',list)
    this.setState({
      list,
    },()=>{this.update()});
  }

  getTime=(time)=>{
    // debugger;
    const timestamp = new Date(time);
    // console.log('timestamp',timestamp)
    const res = timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8)
    return res ;
  }

  renderEditor = (valueKey, value, index, record) => {

    if(valueKey=='isRandom'||valueKey=='isExtend'||valueKey=='isStrict'){
      // console.log('===value:',value)
      return (
        <Switch
          defaultChecked={value==1?true:false}
          checkedChildren='开'
          unCheckedChildren='关'
          onChange={this.changeDataSource.bind(this,record,index,valueKey,!value)}
        />
      );
    }else if(valueKey!=='result'){
      return (
        <CellEditor
          valueKey={valueKey}
          index={index}
          value={record[valueKey]||'无'}
          onChange={this.changeDataSource.bind(this,record)}
        />
      );
    }else{
      return (
        <CellEditor
          valueKey={valueKey}
          index={index}
          value='edit'
          onChange={this.changeResult.bind(this,record)}
        />
      );
    }
    
  };

  render() {
    const  dataSource =this.state.path!=''?this.state.filterData:this.props.bindingData.apilist.list;
    // const filter = this.state.filterData;
    const { list } =this.props.bindingData.getsys;

    // console.log('dataSource',dataSource)
    return (
      <div className="editable-table">
        <IceContainer>
          <CheckboxGroup
            className="next-form-text-align"
            onChange={this.changeCheck}
            dataSource={list}
            value={this.state.list}
          />
          <span style={{marginLeft:'30px'}}>筛选路径啊：<Input value={this.state.path} onChange={this.change} /></span>
        </IceContainer>
        <IceContainer>
          <Table dataSource={dataSource} hasBorder={false} >
            <Table.Column width={60} title="序号" dataIndex="id" cell={this.renderOrder} lock />
            <Table.Column
              lock
              width={150}
              dataIndex="path"
              title="路径"
              cell={this.renderEditor.bind(this, 'path')}
            />
            <Table.Column
              width={80}
              dataIndex="method"
              title="方式"
              // cell={this.renderEditor.bind(this, 'method')}
            />
            <Table.Column
              // width={240}
              dataIndex="sysname"
              title="所属系统"
              width={100}
              // cell={this.renderEditor.bind(this, 'desc')}
            />
            <Table.Column
              // width={240}
              dataIndex="updateTime"
              title="更新时间"
              width={220}
              cell={this.getTime}
              // cell={this.renderEditor.bind(this, 'desc')}
            />
            <Table.Column
              // width={240}
              width={100}
              dataIndex="desc"
              title="接口描述"
              cell={this.renderEditor.bind(this, 'desc')}
            />
            <Table.Column
              width={100}
              align="center"
              dataIndex="isStrict"
              title="严格模式"
              cell={this.renderEditor.bind(this, 'isStrict')}
            />
            {/* <Table.Column
              width={100}
              align="center"
              dataIndex="isRandom"
              title="随机数值"
              cell={this.renderEditor.bind(this, 'isRandom')}
            /> */}
            {/* <Table.Column
              // width={180}
              align="center"
              dataIndex="isExtend"
              title="扩展数组"
              cell={this.renderEditor.bind(this, 'isExtend')}
            />
            <Table.Column
              // width={180}
              align="center"
              dataIndex="nums"
              title="数组数量"
              cell={this.renderEditor.bind(this, 'nums')}
            /> */}
            {/* <Table.Column
              // width={180}
              align="center"
              dataIndex="result"
              title="数据示例"
              cell={this.renderEditor.bind(this, 'result')}
            /> */}
            <Table.Column title="操作" width={120} align="center" cell={this.renderOperation.bind(this,dataSource)} />
            <Table.Column title="删除" width={80} align="center" cell={this.renderDelete} />
          </Table>
          {/* <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增一行
          </div> */}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center',
  },
};
