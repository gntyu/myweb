import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab,Grid } from '@icedesign/base';
import WholeDay from './wholeDay';

const { Row, Col} =Grid;
const TabPane = Tab.TabPane;

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
        <h4 style={styles.title}>接口使用情况</h4>
        <Tab type="text" size="small">
          <TabPane tab="本月" key="1">
            <Row type='wrap'>
              <Col span='24'> <WholeDay type="1" /></Col>
            </Row>

          </TabPane>
          <TabPane tab="半年" key="2">
            <Row type='wrap'>
              <Col span='24'> <WholeDay type="2" /></Col>
            </Row>
          </TabPane>
          <TabPane tab="一年" key="3">
            <Row type='wrap'>
              <Col span='24'> <WholeDay type="3" /></Col>
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
