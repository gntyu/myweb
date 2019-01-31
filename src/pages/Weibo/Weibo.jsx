import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import { Grid,Tab } from '@alifd/next';
import Ball from './Ball';

const { Row, Col} =Grid;
const TabPane = Tab.Item;

const MOCK_DATA = {
  all: {
    day: '677.00',
    month: '3621.00',
    target: '10000.00',
    percent: '30',
  },
  online: {
    day: '1286.00',
    month: '2836.00',
    target: '5000.00',
    percent: '61',
  },
  offline: {
    day: '892.00',
    month: '1928.00',
    target: '5000.00',
    percent: '28',
  },
};
export default class Weibo extends Component {
  static displayName = 'Weibo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer className="flow-statistics">
        <h4 style={styles.title}> 百分比</h4>
        <Tab shape="text">
          <TabPane title="本月" key="1">
            <Row wrap>
              <Col span='12'> <Ball type="1" /></Col>
            </Row>

          </TabPane>
          <TabPane title="半年" key="2">
            <Row wrap>
              <Col span='12'> <Ball type="2" /></Col>
            </Row>
          </TabPane>
          <TabPane title="一年" key="3">
            <Row wrap>
              <Col span='12'> <Ball type="3" /></Col>
            </Row>
          </TabPane>
        </Tab>
      </IceContainer>
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
