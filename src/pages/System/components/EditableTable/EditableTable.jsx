import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table,Pagination, Button,Switch,Feedback,Checkbox,Input } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';
import CellEditor from './CellEditor';

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
  'system': {
    url: '/lyapi/system',
    method: 'post',
    data: { },
    defaultBindingData: {
      dataSource:[]
    }
  },
  'addsystem': {
    url: '/lyapi/addsystem',
    method: 'post',
    data: { },
    defaultBindingData: {
      dataSource:[]
    }
  },
  'delete': {
    url: '/lyapi/deletesystem',
    method: 'post',
    data: { },
    defaultBindingData: {
      
    }
  },
  'update': {
    url: '/lyapi/updatesystem',
    method: 'post',
    data: { },
    defaultBindingData: {

    }
  },

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

      sysCode:'',
      context:'',
      filterData:[],
      current:{},
      currentPage:1
    };
  }
  componentWillMount(){
    this.update();
  }
 

  deleteItem = (context) => {
    this.props.updateBindingData('delete',{data:context},(res)=>{
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

  showDialog = (data)=>{
    // debugger;
    this.setState({
      current:data,
      showDialog:true
    });
  }

  renderOperation = (data,value, index,record) => {
    return (
      <div>
        <Button type="primary" onClick={this.showDialog.bind(this,record)}>更改示例 </Button>
      </div>
    );
  };

  renderDelete = (value, index,record) => {
    // console.log('record',record)
    const flag=(record&&record.order)?record.order<6:false
    return  (
      <div>
          <Button onClick={this.deleteItem.bind(this,record)} shape="text" disabled={flag}>
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
    if(valueKey!='sysCode')item['sysCode']=record.sysCode;//如果不更改sysCode ,需要拿sysCode进行判断

    this.props.updateBindingData('update',{data:item},(res)=>{
      if(res.errorCode==0){
        Feedback.toast.success('更新成功!');
        this.update();
      }else{
        Feedback.toast.error(res.errorDetail);
      }
    })
  };

  change =(sysCode)=>{
    sysCode =sysCode.replace(/[^a-zA-Z0-9\/\$]/g,"");
    this.setState({
      sysCode
    },()=>{
      this.goFilter();
    }); 
  }

  changecontext =(context)=>{
    context =context.replace(/[^0-9]/g,"");
    this.setState({
      context,
    },()=>{
      this.goFilter();
    }); 
  }

  goFilter =()=>{
    const {context,sysCode}=this.state;
    const filterData=this.props.bindingData.system.list.filter(item=>{
      return item.context.indexOf(context)>-1&&item.sysCode.indexOf(sysCode)>-1
    });

    this.setState({
      filterData,
      currentPage:1
    }); 
  }
 
  update =()=>{
    this.props.updateBindingData('system',{
      // data:{
      //   syscode:this.state.list
      // }
    },()=>{
      this.goFilter();
    })
  }

  getTime=(time)=>{
    // debugger;
    const timestamp = new Date(time);
    // console.log('timestamp',timestamp)
    const res = timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8)
    return res ;
  }

  handlePagination=(page)=>{
    // debugger;
    this.setState({
      currentPage:page
    });
  }

  addNewItem=()=>{
    this.props.updateBindingData('addsystem',{},res=>{
      this.update();
    });
    
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
    //前端分页
    const current =this.state.currentPage;
    const dataSource =this.state.filterData.slice((current-1)*10,(current-1)*10+9);
    // const filter = this.state.filterData;

    // console.log('dataSource',dataSource)
    return (
      <div className="editable-table">
        <IceContainer>
          <span style={{marginLeft:'30px'}}>系统code：<Input value={this.state.sysCode} onChange={this.change} /></span>
          <span style={{marginLeft:'30px'}}>上下文：<Input value={this.state.context} onChange={this.changecontext} /></span>
        </IceContainer>
        <IceContainer>
          <Table dataSource={dataSource} hasBorder={false} primaryKey='context'>
            <Table.Column width={60} title="序号" dataIndex="order"  lock />
            <Table.Column 
              width={160} 
              title="上下文" 
              dataIndex="context"  
              lock 
              cell={this.renderEditor.bind(this, 'context')}
              />
            <Table.Column
              lock
              width={150}
              dataIndex="sysCode"
              title="系统code"
              cell={this.renderEditor.bind(this, 'sysCode')}
            />
            <Table.Column
              dataIndex="sysName"
              title="系统名称"
              width={100}
              cell={this.renderEditor.bind(this, 'sysName')}
            />
            <Table.Column
              dataIndex="updateTime"
              title="更新时间"
              width={220}
              cell={this.getTime}
              // cell={this.renderEditor.bind(this, 'desc')}
            />
            <Table.Column title="删除" width={80} align="center" cell={this.renderDelete} />
          </Table>
          <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增一行
          </div>
          <Pagination
            style={styles.pagination}
            total={this.state.filterData.length}
            current={this.state.currentPage}
            pageSize={10}
            // current={this.state.current}
            onChange={this.handlePagination}
          />
          
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
  pagination:{
    marginTop:10
  }
};
