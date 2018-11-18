import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button,Switch,Feedback } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';
import CellEditor from './CellEditor';
import './EditableTable.scss';

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
    url: '/api/apilist',
    method: 'get',
    data: { },
    defaultBindingData: {
      dataSource:[]
    }
  },
  'delete': {
    url: '/api/deleteapi',
    method: 'post',
    data: { },
    defaultBindingData: {
      
    }
  },
  'update': {
    url: '/api/updateapi',
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
    };
  }
  componentWillMount(){
    this.props.updateBindingData('apilist')
  }

  renderOrder = (value, index) => {
    return <span>{index+1}</span>;
  };

  deleteItem = (order) => {
    this.props.updateBindingData('delete',{data:order},(res)=>{
      if(res.errorCode==0){
        Feedback.toast.success('删除成功!');
        this.props.updateBindingData('apilist');
      }else{
        Feedback.toast.error(res.errorDetail);
      }
    })
  };

  renderOperation = (value, index,order) => {
    return (
      <div>
        <Button shape="ghost" style={{marginRight:'10px'}}>
          测试接口
        </Button>
        <Button onClick={this.deleteItem.bind(this, order)} shape="ghost">
          删除
        </Button>
      </div>
    );
  };

  changeDataSource = (record,index, valueKey, value) => {

    // console.log('-----value------',value);
    const item ={};
    if(valueKey=='isRandom'||valueKey=='isExtend'){
      item[valueKey]=value?1:0;
    }else{
      item[valueKey]=value;
    }
    item['id']=record.id;

    this.props.updateBindingData('update',{data:item},(res)=>{
      if(res.errorCode==0){
        Feedback.toast.success('更新成功!');
        this.props.updateBindingData('apilist');
      }else{
        Feedback.toast.error(res.errorDetail);
      }
    })
  };

  renderEditor = (valueKey, value, index, record) => {

    if(valueKey=='isRandom'||valueKey=='isExtend'){
      // console.log('===value:',value)
      return (
        <Switch
          defaultChecked={value==1?true:false}
          onChange={this.changeDataSource.bind(this,record,index,valueKey,!value)}
        />
      );
    }else{
      return (
        <CellEditor
          valueKey={valueKey}
          index={index}
          value={record[valueKey]}
          onChange={this.changeDataSource.bind(this,record)}
        />
      );
    }
    
  };

  addNewItem = () => {
    this.state.dataSource.push({
      todo: '暂无',
      memo: '暂无',
      validity: '暂无',
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  render() {
    const  dataSource = this.props.bindingData.apilist.list;
    // console.log('dataSource',dataSource)
    return (
      <div className="editable-table">
        <IceContainer>
          <Table dataSource={dataSource} hasBorder={false}>
            <Table.Column width={80} title="序号" dataIndex="id" cell={this.renderOrder} />
            <Table.Column
              // width={280}
              dataIndex="path"
              title="路径"
              cell={this.renderEditor.bind(this, 'path')}
            />
            <Table.Column
              // width={240}
              dataIndex="desc"
              title="接口描述"
              cell={this.renderEditor.bind(this, 'desc')}
            />
            <Table.Column
              // width={180}
              align="center"
              dataIndex="isRandom"
              title="随机数值"
              cell={this.renderEditor.bind(this, 'isRandom')}
            />
            <Table.Column
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
              title="扩展数组数量"
              cell={this.renderEditor.bind(this, 'nums')}
            />
            <Table.Column title="操作" width={200} align="center" cell={this.renderOperation} />
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
