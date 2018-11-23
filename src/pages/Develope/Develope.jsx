import React, { Component } from 'react';
import Myselect from './components/MySelect'
import MyCombox from './components/MyCombox'

export default class Develope extends Component {
  static displayName = 'Develope';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="develope-page">
        <Myselect />
        <MyCombox />
      </div>
    );
  }
}

