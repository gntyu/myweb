import React, { Component } from 'react';
import findDomNode from 'react-dom';
import { DateRangePicker } from 'react-date-range';
import { Select,Input } from '@alifd/next';
// import DateRangePicker from '@bop/daterangepicker';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { zhCN } from 'react-date-range/dist/locale'


export default class Develope extends Component {
    static displayName = 'Develope';
  
    constructor(props) {
      super(props);
      this.state = {
        show:true,
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

    }

    handleRangeChange=(key,range)=>{
      console.log(range)
      const selection= {
        startDate: null,
        endDate: null,
        key: 'selection',
      }
      if(range.startDate)selection.startDate=range.startDate
      if(range.endDate)selection.endDate=range.endDate
      
     this.setState({
       [key]:{selection}
     })
    }

    clickInput=()=>{
      const {show}=this.state;
      this.setState({show:!show});
    }
  
    render() {
      return (
        <div className="my-date-range-page">
            {/* {this.props.children} */}
            
            <DateRangePicker
              ref="picker"
              locale={zhCN}
              onChange={this.handleRangeChange.bind(this, 'dateRangePickerI')}
              className={'PreviewArea'}
              months={1}
              direction="vertical"
              scroll={{ enabled: true }}
              ranges={[this.state.dateRangePickerI]}
              // showDateDisplay={false}
              // enumerable={this.state.show}
            >
            <Input onClick={this.clickInput}/>
            </DateRangePicker>
          </div>
      );
    }
  }