import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination,Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

@DataBinder({
  contractDetail: {
    url: "/kpi-management/getFinanceIncome",
    method: "post",
    data: {
        page: 1
    },
    serializeArray: false,
    defaultBindingData: {
        data: [],
        pageSize: 10,
        currentPage: 1
    }

  },
  contractDetailTHeader: {
      url: "/kpi-management/getFinanceIncomeCol",
      method: "get",
      data: {
          page: 1
      },
      serializeArray: false,
      defaultBindingData: {
          columns: [],
          quarter:[]           
      }
  }
})
export default class TreeTable extends Component {
  static displayName = 'TreeTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      openRowKeys:[],
      filterCols:[],
      list:[]
    };
    this.allOids=[],//所有一级的ID集合
    this.allSids=[],//所有二级的ID集合
    this.allTids=[],//所有三级的ID集合
    this.allFids=[],//所有四级的ID集合
    this.current =1;
  }

  handleChange = (current) => {
    this.setState({
      current,
    });
  };
  componentWillMount(){
    this.props.updateBindingData('contractDetail');
    this.props.updateBindingData('contractDetailTHeader',{},res=>{
      this.expand(1)
    });
    this.setState ({
      list:this.generateData()
    })
  }

  generateData=()=>{
    const finance_quarter=['2018Q4','2019Q1'];
    return finance_quarter.map(quarter=>{
      const id =`${quarter}-${new Date().getTime()}`;
      this.allOids.push(id);
      return {
        finance_quarter:quarter,
        gross_income:Math.ceil(Math.random()*10000),
        net_income:Math.ceil(Math.random()*10000),
        id,
        children:this.getChildren(1,{finance_quarter:quarter})
      }
    })
  }

  getChildren=(index,pObj)=>{
    return Array.from({length:2}).map(item=>{
      const obj ={
        ...pObj,
        [`business_route_${index}`]:`${index}级业务通路_${Math.ceil(Math.random()*100)}`,
        [`finance_route_${index}`]:`${index}级财务通路_${Math.ceil(Math.random()*100)}`,
      }
      const id=`shuzi_${ this.current++ }`;
      if(index==1)this.allSids.push(id);
      if(index==2)this.allTids.push(id);
      if(index==3)this.allFids.push(id);
      return {
        id,
        gross_income:Math.ceil(Math.random()*1000),
        net_income:Math.ceil(Math.random()*1000),
        children:index<4?this.getChildren(index+1,obj):[],
        ...obj,
      }
    })
  }

  // handle=(arr)=>{
  //   const quarteKeys = this.getKeys('finance_quarter',arr);
  //   const res=quarteKeys.map(key=>{
  //     const list = arr.filter(item=>item['finance_quarter']==key);
  //     return {
  //       finance_quarter:key,
  //       id:`${key}-${new Date().getTime()}`,
  //       children:list
  //     }
  //   })
  //   return res;
  // }

  // getKeys=(dataIndex,arr)=>{
  //   const keys={};
  //   arr.map(item=>{
  //     if(!keys[item[dataIndex]]){
  //       keys[item[dataIndex]]=true
  //     }
  //   })
  //   return Object.keys(keys)
  // }

  changeRowOpen=(keys,b,c)=>{
    let cols =this.props.bindingData.contractDetailTHeader.columns

    if(keys.some(key=>this.allFids.includes(key))){
      cols = this.flterColumns(4)
    }else if(keys.some(key=>this.allTids.includes(key))){
      cols = this.flterColumns(3)
    }else if(keys.some(key=>this.allSids.includes(key))){
      cols = this.flterColumns(2)
    }else if(keys.some(key=>this.allOids.includes(key))){
      cols = this.flterColumns(1)
    }else{
      cols = this.flterColumns(0)
    }

    this.setState({
      openRowKeys:keys,
      filterCols:cols
    });
  }

  flterColumns=(level)=>{
    const arr =[];
    const { columns } =this.props.bindingData.contractDetailTHeader;
    Array.from({length:4-level}).map((key,index)=>{
      arr.push(`finance_route_${4-index}`);
      arr.push(`business_route_${4-index}`);
    });
    return columns.filter(item=>!arr.includes(item.dataIndex))
  }

  expand = (level)=>{  
    let keys =[],cols=[];  
    //处理展开
    if(level==1)keys=[...this.allOids];
    if(level==2)keys=[...this.allOids,...this.allSids];
    if(level==3)keys=[...this.allOids,...this.allSids,...this.allTids];
    if(level==4)keys=[...this.allOids,...this.allSids,...this.allTids,...this.allFids];
    //处理表头
    cols = this.flterColumns(level)

    this.setState({
      openRowKeys:keys,
      filterCols:cols
    });
  }

  render() {
    const { columns } =this.props.bindingData.contractDetailTHeader;
    const axiosData = this.props.bindingData.contractDetail;
    // const treeData = this.handle(axiosData.data);
    const { list,openRowKeys,filterCols } = this.state;

    

    return (
      <IceContainer>
        <div style={{marginBottom:5}}>
          <Button ghost='light' size='small' onClick={this.expand.bind(this,1)}>展开季度</Button>&nbsp;
          <Button ghost='light' size='small' onClick={this.expand.bind(this,2)}>展开一级通路</Button>&nbsp;
          <Button ghost='light' size='small' onClick={this.expand.bind(this,3)}>展开二级通路</Button>&nbsp;
          <Button ghost='light' size='small' onClick={this.expand.bind(this,4)}>展开三级通路</Button>
        </div>
        <Table
          dataSource={list}
          isTree
          openRowKeys={openRowKeys}
          onRowOpen={this.changeRowOpen}
        >
        {filterCols.map(item=>{
            return <Table.Column title={item.title} dataIndex={item.dataIndex} key={item.dataIndex} width={150} />
          })
        }
        </Table>
        <Pagination
          style={{ marginTop: '20px', textAlign: 'right' }}
          current={this.state.current}
          onChange={this.handleChange}
        />
      </IceContainer>
    );
  }
}

