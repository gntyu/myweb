import React, { Component } from 'react';
import EditableTable from './components/EditableTable';
import DateRangePickerBTS from '@/components/DateRangePickerBTS';

export default class Apilist extends Component {
  static displayName = 'Apilist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="apilist-page">
        <DateRangePickerBTS />
        {/* <DateTimeRangePicker
            label="时间段"
            wrapperClassName="eui-wrapper"
            // value={this.state.range}
            // changeHandler={this.changeHandler}
        /> */}
        <EditableTable />
      </div>
    );
  }
}
