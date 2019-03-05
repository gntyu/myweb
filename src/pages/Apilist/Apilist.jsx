import React, { Component } from 'react';
import EditableTable from './components/EditableTable';

export default class Apilist extends Component {
  static displayName = 'Apilist';

  constructor(props) {
    super(props);
    this.state = {
      value:''
    };
  }
  change=(date)=>{
    this.state = {
      value:date[0]+date[1]
    };
  }

  render() {
    return (
      <div className="apilist-page">

        <EditableTable />
      </div>
    );
  }
}
