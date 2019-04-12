
import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { Input } from '@alifd/next';
import moment from 'moment';

// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
// you will also need the css that comes with bootstrap-daterangepicker


const Locale = {
  format: 'YYYY/MM/DD',
  separator: ' - ',
  applyLabel: '确定',
  cancelLabel: '取消',
  fromLabel: '从',
  toLabel: '至',
  customRangeLabel: '自定义',
  weekLabel: '周',
  daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  firstDay: 1
};

export default class DateRangePickerBTS extends React.Component {
  static displayName = 'DateRangePickerBTS';

  constructor(props) {
    super(props);
    this.state = {
      startDate:moment(props.default&&props.default[0])||moment(),
      endDate:moment(props.default&&props.default[1])||moment(),
      value:this.getValue(props.default)
    };
  }

  getValue=(arr)=>{
    let res='';
    if(arr&&arr[0]&&arr[1]){
      res = `${arr[0].format('YYYY/MM/DD')} - ${arr[1].format('YYYY/MM/DD')}`
    }else{
      res = `${moment().format('YYYY/MM/DD')} - ${moment().format('YYYY/MM/DD')}`
    }
    return res
  }

  getRanges=()=>{
    return {
      昨天: [moment().subtract(1,'days'), moment().subtract(1,'days')],
      最近7天: [moment().subtract(6,'days'), moment()],
      最近30天: [moment().subtract(29,'days'), moment()],
      // 最近七天: [moment().subtract(6,'days'), moment()],
      // 本月: [moment().startOf('month'), moment().endOf('month')],
      // 上月: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      // 本季度: [moment().startOf('quarter'), moment().endOf('quarter')],
      // 下季度: [moment().add(1, 'quarter').startOf('quarter'), moment().add(1, 'quarter').endOf('quarter')],
      // 本年: [moment().startOf('year'), moment().endOf('year')],
      // 全部: [moment('2000', 'YYYY').startOf('year'), moment('2050', 'YYYY').endOf('year')]
    };
  }

  _applyHandler = (e, picker) => {
    let {startDate, endDate} = picker;

    this.setState({
      startDate, endDate,
      value:`${moment(startDate).format('YYYY/MM/DD')} - ${moment(endDate).format('YYYY/MM/DD')}`
    }, () => {
      if(this.props.onChange){
        this.props.onChange([startDate,endDate]);
      }
    });
   
  }

  render() {
    // console.log('this.props',this.props)
    // console.log('this.state',this.state)
    return (
      <DateRangePicker
        startDate={this.state.startDate} 
        endDate={this.state.endDate} 
        showDropdowns 
        locale={Locale}
        alwaysShowCalendars
        ranges={this.props.ranges||this.getRanges()}
        onApply={this._applyHandler}
        linkedCalendars={false}
      >
        <Input
            aria-label="input with config of hasClear"
            value={this.state.value}
            hint="calendar"/>
      </DateRangePicker>
    );
  }
}