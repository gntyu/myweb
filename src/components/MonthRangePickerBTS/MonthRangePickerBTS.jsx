
import React, { Component } from 'react';
import MonthRangePicker from './ReactMonthRange';
import { Input } from '@alifd/next';
import moment from 'moment';
import 'bootstrap-monthrangepicker/daterangepicker.css';

export default class MonthRangePickerBTS extends React.Component {
  static displayName = 'MonthRangePickerBTS';

  constructor(props) {
    super(props);
    this.init={
        format: 'YYYY/MM',
        separator: ' - ',
        applyLabel: '确定',
        cancelLabel: '取消',
        fromLabel: '从',
        toLabel: '至',
        customRangeLabel: '自定义',
        weekLabel: '周',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        quarterNames: ['一季度', '二季度', '三季度', '四季度'],
        firstDay: 1
    }
    this.state = {
      startDate:moment(props.default&&props.default[0])||moment(),
      endDate:moment(props.default&&props.default[1])||moment(),
      value:this.getValue(props.default,this.init),
      locale:{ ...this.init }
    };
  }

  getValue=(arr,Locale)=>{
    if(!Locale){
        Locale = this.state.locale;
    }else if(this.props.format && typeof(this.props.format)=='string'){
        Locale.format=this.props.format
    }
    let res='';
    if(arr&&arr[0]&&arr[1]){
      res = `${arr[0].format(Locale.format)} - ${arr[1].format(Locale.format)}`
    }else{
      res = `${moment().format(Locale.format)} - ${moment().format(Locale.format)}`
    }
    return res
  }

  componentWillMount(){
    if(this.props.format && typeof(this.props.format)=='string'){
        const {locale}=this.state;
        locale.format=this.props.format;
        this.setState({locale})
    }
  }

  getRanges=()=>{
    return {
        // 本月: [moment().startOf('month'), moment().endOf('month')],
        // 上月: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        上季度: [moment().subtract(1,'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')],
        本季度: [moment().startOf('quarter'), moment().endOf('quarter')],
        去年: [moment().subtract(1,'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
        本年: [moment().startOf('year'), moment().endOf('year')],
    };
  }

  _applyHandler = (e, picker) => {
    let {startDate, endDate} = picker;
    const Locale =this.state.locale;
    this.setState({
      startDate, endDate,
      value:`${moment(startDate).format(Locale.format)} - ${moment(endDate).format(Locale.format)}`
    }, () => {
      if(this.props.onChange){
        this.props.onChange([startDate,endDate]);
      }
    });
   
  }

  render() {
    // console.log('this.props',this.props)
    // console.log('this.state.locale',this.state.locale)
    return (
      <MonthRangePicker
        startDate={this.state.startDate} 
        endDate={this.state.endDate} 
        showDropdowns 
        locale={this.state.locale}
        alwaysShowCalendars
        ranges={this.props.ranges||this.getRanges()}
        onApply={this._applyHandler}
        linkedCalendars={false}
        monthOrQuarter={1}
      >
        <Input
            aria-label="input with config of hasClear"
            value={this.state.value}
            hint="calendar"/>
      </MonthRangePicker>
    );
  }
}