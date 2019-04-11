import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import { Grid,Tab } from '@alifd/next';

import WholeDay from './wholeDay';
import System from './system';

const { Row, Col} =Grid;

@DataBinder({
  'today': {
    url: '/lyapi/today',
    method: 'get',
    data: { },
    defaultBindingData: {
      list:[]
    }
  },
  'month': {
    url: '/lyapi/month',
    method: 'get',
    data: { },
    defaultBindingData: {
      list:[]
    }
  },
  'recent': {
    url: '/lyapi/recent',
    method: 'get',
    data: { },
    defaultBindingData: {
      list:[]
    }
  },
  'tops': {
    url: '/lyapi/tops',
    method: 'get',
    data: { },
    defaultBindingData: {
      list:[]
    }
  },
  'system': {
    url: '/lyapi/system',
    method: 'get',
    data: { },
    defaultBindingData: {
      list:[]
    }
  }
})
export default class Dynamic extends Component {
  static displayName = 'Dynamic';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.updateBindingData('today');
    this.props.updateBindingData('month');
    this.props.updateBindingData('recent');
    this.props.updateBindingData('tops');
    this.props.updateBindingData('system');
  }

  render(){
    const today =this.props.bindingData.today;
    const month =this.props.bindingData.month;
    const recent =this.props.bindingData.recent;
    const tops =this.props.bindingData.tops;
    const system =this.props.bindingData.system;

    return (
      <div>
      <IceContainer className="flow-statistics">
        <h4 style={styles.title}>接口使用情况</h4>
        <Tab shape="text" >
          <Tab.Item title="今日" key="1">
            <Row wrap>
              <Col span='24'> <WholeDay data={today} /></Col>
            </Row>

          </Tab.Item>
          <Tab.Item title="本月" key="2">
            <Row wrap>
              <Col span='24'> <WholeDay data={month} /></Col>
            </Row>
          </Tab.Item>
          <Tab.Item title="最近" key="3">
            <Row wrap>
              <Col span='24'> <WholeDay data={recent} /></Col>
            </Row>
          </Tab.Item>
        </Tab>
      </IceContainer>
      <IceContainer className="flow-statistics">
        <h4 style={styles.title}>接口使用类型</h4>
        <Tab shape="text" >
          <Tab.Item title="系统汇总" key="a">
            <Row wrap>
              <Col span='24'> <System data={system.list} sys={system.list} /></Col>
            </Row>
          </Tab.Item>
          <Tab.Item title="TOP20" key="b">
            <Row wrap>
              <Col span='24'> <System data={tops.list} sys={system.list} /></Col>
            </Row>
          </Tab.Item>
        </Tab>
      </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0',
    fontSize: '16px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    color: '#333',
  },
};
