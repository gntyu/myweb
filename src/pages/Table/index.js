import React, { Component } from 'react';
import TreeTable from './components/TreeTable';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-page">
        {/* tree和选择混合表格 */}
        <TreeTable />
      </div>
    );
  }
}
