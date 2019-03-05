import React, { Component } from 'react';
import Myselect from './components/MySelect'
import MySearch from './components/MySearch'
import TagTable from './components/TagTable'
import MyCombox from './components/MyCombox'
import {jsonp} from '@utils/tools';
import { Select } from '@alifd/next';
import DateRangePickerBTS from '@/components/DateRangePickerBTS';
import DateRangePicker from '@bop/daterangepicker';

const _ = require('lodash');

export default class Develope extends Component {
  static displayName = 'Develope';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

    console.log('add',_.add(6, undefined));
    console.log('obj',_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));
    // 调用方法跨域请求百度搜索的接口
    jsonp({
      url: "http://test.uc.bop.weibo.com/v1/systems/all",
      params: {
        wd: "jsonp"
      },
      cb: "show"
    }).then(data => {
      debugger;
      // 打印请求回的数据
      console.log('data',data);
    });
  }

  render() {
    return (
      <div className="develope-page">
        <div style ={styles.block}>
          <h3> Myselect </h3>
          <Myselect />
        </div>
        <div  style ={styles.block}>
          <h3> MySearch </h3>
          <MySearch />
        </div>
        <div  style ={styles.block}>
          <h3> TagTable </h3>
          <TagTable />
        </div>
        <div style ={styles.block}>
          <h3> DateRangePickerBTS </h3>
          <DateRangePickerBTS /> 
        </div>
        <div style ={styles.block}>
          <h3> @bop/daterangepicker </h3>
          <DateRangePicker  onChange={this.change}/>
        </div>
        <div style ={styles.block}>
          <h3> MyCombox </h3>
          <MyCombox />
        </div>

      </div>
    );
  }
}

const styles={
  block:{
    background:'#fff',
    padding:10,
    margin:10,
    borderRadius:'5px'
  }
}