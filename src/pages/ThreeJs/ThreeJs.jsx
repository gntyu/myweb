import React, { Component } from 'react';
import ThreeMap from './threeMap';
export default class ThreeJs extends Component {
  static displayName = 'ThreeJs';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
         <ThreeMap/>
      </div>
    );
  }
}
