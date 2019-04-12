import React, { Component } from 'react';
import Myselect from './components/MySelect'
import MySearch from './components/MySearch'
import TagTable from './components/TagTable'
import MyCombox from './components/MyCombox'
import {jsonp} from '@utils/tools';
import { Select,Input } from '@alifd/next';
import DateRangePickerBTS from '@/components/DateRangePickerBTS';
import MonthRangePickerBTS from '@/components/MonthRangePickerBTS';
import MonthRangePicker from '@/components/MonthRangePicker';


export default class Develope extends Component {
  static displayName = 'Develope';

  constructor(props) {
    super(props);
    this.state = {

    };
  }



  componentDidMount() {

  }

  handleClickMonthBox=()=>{

  }

  render() {

    return (
      <div className="develope-page">
        <div style ={styles.block}>
          <h3> QuarterRangePicker </h3>
          <MonthRangePicker format="YYYY\QQ"/> 
        </div>
        <div style ={styles.block}>
          <h3> MonthRangePicker </h3>
          <MonthRangePickerBTS /> 
        </div>
        <div style ={styles.block}>
          <h3> DateRangePickerBTS </h3>
          <DateRangePickerBTS /> 
        </div>
      
        {/* <div style ={styles.block}>
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
        </div> */}
       
        {/* <div style ={styles.block}>
          <h3> @bop/daterangepicker </h3>
          <DateRangePicker  onChange={this.change}/>
        </div> */}
        {/* <div style ={styles.block}>
          <h3> MyCombox </h3>
          <MyCombox />
        </div> */}

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