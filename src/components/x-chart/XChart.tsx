/**
 * @Author JohnLi
 * @Date 2018/2/23 11:36
 */
import React, { Component } from 'react';

const utils = require('../../core/utils/utils');

const echarts = require('echarts');

import './XChart.css';

interface XChartProps {
  customOption?: object;
}

class XChart extends Component<XChartProps> {
  container;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const myChart = echarts.init(this.container);
    // 指定图表的配置项和数据
    const defaultOption = {
      title: {
        text: 'ECharts 入门示例'
      }
    };

    const option = utils.extend(true, defaultOption, this.props.customOption || {});
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" ref={(container) => {this.container = container; }}/>
      </React.Fragment>
    );
  }
}

export default XChart;