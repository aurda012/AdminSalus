import React from 'react';
import ReactEcharts from '../ReactECharts';
import CHARTCONFIG from '../../constants/ChartConfig';

const area = {};
area.options = {
  color: 'rgba(60,201,150,0.035)',
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Redeemed'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: false
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['Today', 'This Week', 'This Month', 'Total'],
      axisLine: {
        lineStyle: {
          color: 'rgba(50,201,150, 1.0)'
        }
      },
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },

      splitLine: {
        lineStyle: {
          color: 'rgba(60,201,150,0.035)'
        }
      }
    }
  ],
  yAxis: [
    {
      max: 500,
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(50,201,150, 1.0)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Redeemed',
      type: 'bar',
      data: [46, 117, 231, 458],
      barWidth: 60,
      itemStyle: {
        normal: {
          color: CHARTCONFIG.color.info
        }
      },
      lineStyle: {
        normal: {
          color: CHARTCONFIG.color.info
        }
      },
      areaStyle: {
        normal: {
          color: CHARTCONFIG.color.info
        }
      },
      symbol: 'diamond'
    },
  ]
};

const KPIChart = () => (
  <ReactEcharts style={{height: '400px'}} option={area.options} showLoading={false} />
);

export default KPIChart;
