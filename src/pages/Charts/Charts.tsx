/**
 * @Author JohnLi
 * @Date 2018/3/6 19:40
 */
import React, { Component } from 'react';
import XChart from '../../components/x-chart/XChart';

class Charts extends Component {
  chartOption;
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.chartOption = {
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
  }

  render() {
    return (
      <React.Fragment>
        <XChart customOption={this.chartOption}/>
      </React.Fragment>
    );
  }
}

export default Charts;