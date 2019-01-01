import React, { Component } from 'react';
import PropTypes from 'prop-types';

import echarts from 'echarts/lib/echarts';
import Chart from '@common/Chart';



export default class wholeDay extends Component {
  static displayName = 'wholeDay';

  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'string data',
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // componentWillMount(){
  //   this.props.updateBindingData('operation');
  // }



  render() {

  const {data,type}=this.props;
  const colors = ['#57617B', '#57617B', '#57617B', 'black'];

  const option = {
    color: colors,
    title: {
        // text: "使用量TOP20",
        textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        left: '5%',
        right: '10%',
        bottom: '20%',
        // top: '2%',
        containLabel: true
    },
    toolbox: {
        feature: {
            dataView: {
                show: true,
                readOnly: false
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },

    dataZoom: [{
        show: true,
        start: 0,
        end: 100,
        bottom: '8%'
    }, ],
    xAxis: [{
        type: 'category',
        // boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: colors[1]
            }
        },
        data:data.list.map(item=>item.xdata)
    }],
    yAxis:{
        type: 'value',
        name: '使用次数',
        min: 0,
        position: 'right',
        axisLine: {
            lineStyle: {
                color: colors[2]
            },
        },
        axisLabel: {
            formatter: '{value}次'
        },
        splitLine: {
            lineStyle: {
                color: '#57617B'
            }
        }
        
    },
    series: [{
        name: '使用次数',
        type: 'bar',
        itemStyle: {
            normal: {
                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
            }
        },
        label:{
            show:true
        },
        barMinHeight:30,
        data:data.list.map(item=>item.ydata)
    }]
    };
    return (
      <div> 
        <Chart option={option} height={400} />
      </div>

    );
  }
}

const data = {
  "1": 0.72,
  "2": 0.35,
  "3": 0.83,
};