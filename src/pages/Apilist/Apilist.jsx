import React, { Component } from 'react';
import EditableTable from './components/EditableTable';

export default class Apilist extends Component {
  static displayName = 'Apilist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="apilist-page">
        <EditableTable />
      </div>
    );
  }
}
