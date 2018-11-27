import React, { Component } from 'react';
import Myselect from './components/MySelect'
import MySearch from './components/MySearch'
import TagTable from './components/TagTable'
import MyCombox from './components/MyCombox'

import { Select } from '@icedesign/base';

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
        <MySearch />
        <TagTable />
        
        <MyCombox />
      </div>
    );
  }
}

