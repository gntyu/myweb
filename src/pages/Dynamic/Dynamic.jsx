import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab,Grid } from '@icedesign/base';
import WholeDay from './wholeDay';
import System from './system';
import DataBinder from '@icedesign/data-binder';

const { Row, Col} =Grid;
const TabPane = Tab.TabPane;
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
  },
})
export default class Weibo extends Component {
  static displayName = 'Weibo';

  static propTypes = {};

  static defaultProps = {};

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

  render() {
    const today =this.props.bindingData.today;
    const month =this.props.bindingData.month;
    const recent =this.props.bindingData.recent;
    const tops =this.props.bindingData.tops;
    const system =this.props.bindingData.system;

    return (<div>
      <IceContainer className="flow-statistics">
        <h4 style={styles.title}>接口使用情况</h4>
        <Tab type="text" size="small">
          <TabPane tab="今日" key="1">
            <Row type='wrap'>
              <Col span='24'> <WholeDay type="1" data={today} /></Col>
            </Row>

          </TabPane>
          <TabPane tab="本月" key="2">
            <Row type='wrap'>
              <Col span='24'> <WholeDay type="2" data={month} /></Col>
            </Row>
          </TabPane>
          <TabPane tab="最近" key="3">
            <Row type='wrap'>
              <Col span='24'> <WholeDay type="2" data={recent} /></Col>
            </Row>
          </TabPane>
        </Tab>
      </IceContainer>
      <IceContainer className="flow-statistics">
        <h4 style={styles.title}>接口使用类型</h4>
        <Tab type="text" size="small">
          <TabPane tab="系统汇总" key="a">
            <Row type='wrap'>
              <Col span='24'> <System data={system} type='a'/></Col>
            </Row>
          </TabPane>
          <TabPane tab="TOP20" key="b">
            <Row type='wrap'>
              <Col span='24'> <System data={tops} type='b' /></Col>
            </Row>
          </TabPane>
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
