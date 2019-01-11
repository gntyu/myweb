import React, { Component } from 'react';
import Myselect from './components/MySelect'
import MySearch from './components/MySearch'
import TagTable from './components/TagTable'
import MyCombox from './components/MyCombox'
import {jsonp} from '@utils/tools';
import { Select } from '@icedesign/base';
const _ = require('lodash');

export default class Develope extends Component {
  static displayName = 'Develope';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

    console.log('add',_.add(6, undefined));
    console.log('obj',_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));
    // 调用方法跨域请求百度搜索的接口
    jsonp({
      url: "http://test.uc.bop.weibo.com/v1/systems/all",
      params: {
        wd: "jsonp"
      },
      cb: "show"
    }).then(data => {
      debugger;
      // 打印请求回的数据
      console.log('data',data);
    });
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

