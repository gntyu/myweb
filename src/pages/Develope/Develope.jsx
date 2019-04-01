import React, { Component } from 'react';
import Myselect from './components/MySelect'
import MySearch from './components/MySearch'
import TagTable from './components/TagTable'
import MyCombox from './components/MyCombox'
import MyMonthRange from './components/MyMonthRange'
import MyDateRange from './components/MyDateRange'
import {jsonp} from '@utils/tools';
import { Select,Input } from '@alifd/next';
import DateRangePickerBTS from '@/components/DateRangePickerBTS';
// import MonthRangePicker from "react-monthrange-picker";
import DatePicker from 'antd/lib/date-picker';
import "antd/dist/antd.css";
import 'moment/locale/zh-cn';
import moment from 'moment';
moment.locale('zh-cn');

const _ = require('lodash');
const { RangePicker } = DatePicker;

export default class Develope extends Component {
  static displayName = 'Develope';

  constructor(props) {
    super(props);
    this.state = {
      show:false,
      dateRangePickerI: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection',

        }
      },
    };
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

  handleClickMonthBox=()=>{
    console.log("click");
  }

  render() {
    let pickerLang = {
      months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      , from: 'From', to: 'To'
    }
    , mvalue = {year: 2015, month: 11}
    , mrange = {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}}

    let makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
      return '?'
    }
    const {show}=this.state;
    return (
      <div className="develope-page">
        <div style ={styles.block}>
          <h3> MonthRangePicker </h3>
          <MyMonthRange />
          <RangePicker  
            placeholder={['开始日期', '结束日期']}
            format="YYYY-MM"
            mode={['month','month']}
            size="small"
          />
        </div>
        <div style ={styles.block}>
          <h3> MyDateRange </h3>
          <MyDateRange >
            <Input />
          </MyDateRange>
        </div>
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
        {/* <div style ={styles.block}>
          <h3> @bop/daterangepicker </h3>
          <DateRangePicker  onChange={this.change}/>
        </div> */}
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