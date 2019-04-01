import React, { Component } from 'react';
import { Select,Input } from '@alifd/next';
import Picker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css'


export default class Develope extends Component {
    static displayName = 'Develope';
  
    constructor(props) {
      super(props);
      this.state = {
        show:false,
      };
    }
  
    componentDidMount(){

    }
    handleClick=(e)=>{

    }
    handleClickMonthBox=()=>{
      const {show}=this.state;
      this.setState({
        show:!show
      })
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
        <div className="my-month-range-page">
          <Picker
            ref="pickRange"
            years={{min: 2010, max: 2018}}
            range={mrange}
            lang={pickerLang}
            // theme="dark"
            // onChange={this.handleRangeChange}
            // onDismiss={this.handleRangeDismiss}
            show={show}
          >
            <Input value={makeText(mrange.from)+' ~ '+makeText(mrange.to)} onClick={this.handleClickMonthBox} />
          </Picker>
        </div>
      );
    }
  }