import React, { Component } from 'react';
import CreateActivityForm from './components/CreateActivityForm';

export default class Newapi extends Component {
  static displayName = 'Newapi';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="newapi-page">
        <CreateActivityForm />
      </div>
    );
  }
}
