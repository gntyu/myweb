import React, { Component } from 'react';
import { Search,Icon} from '@icedesign/base';
import './index.scss';


export default class MySearch extends Component {
  static displayName = 'MySearch';

  constructor(props) {
    super(props);
    this.state = {
      // dataSource: [],
      dataSource: this.getData(),
      value: ""
    };
  }


  getData=()=>{
    return Array.from({ length: 500 }).map((item, index) => {
      return {
        label: "衣服"+this.randomString(5),
        value: "Recent"+index,
      };
    });
  }
  randomString = len=> {
    len = len || 32;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const maxPos = chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  };

  onSearchClick() {
    let time = new Date();

    time = time.getTime();

    this.setState({
      value: time
    });
  }

  onClearClick() {
    this.setState({
      value: ""
    });
  }
  // 点击search按钮和在选中项上回车时触发
  // 参数为obj：
  // {
  //    filter: [],
  //    key: xx
  // }
  onSearch(obj) {
    console.log(obj);
  }
  // input 输入时触发
  onChange(value) {
    // this.update(value);
    this.setState({
      value
    });
  }

  onInputBlur(e, obj) {
    // console.log(e, obj);
  }

  onInputFocus(e, clickByUser, state) {
    // console.log(e, clickByUser, state);
  }


  render() {

    return (
      <div className="my-search-page">
          <Search
            inputWidth={200}
            value={this.state.value}
            // onSearch={this.onSearch.bind(this)}
            onChange={this.onChange.bind(this)}
            onInputBlur={this.onInputBlur.bind(this)}
            onInputFocus={this.onInputFocus.bind(this)}
            dataSource={this.state.dataSource}
            placeholder="可支持联想输入"
            prefix="my-"
          />
      </div>
    );
  }
}

