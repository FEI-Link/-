$(function () {
  // 基于准备好的dom，初始化echarts实例
  let percentByManufacturerChart = echarts.init(document.getElementById('percentByManufacturerBar'));

  // 指定图表的配置项和数据
  let option = {
    title: {
      text: 'Shanxi省各城市汽车销量排名',
      textStyle: {
        color: '#333',  // 字体颜色
        fontSize: 18,   // 字体大小
        fontWeight: 'bold'  // 字体粗细
      }
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: [],
      axisLabel: {
        color: '#666',   // x轴文字颜色
        fontSize: 12     // x轴文字大小
      }
    },
    yAxis: {
      axisLabel: {
        color: '#666',   // y轴文字颜色
        fontSize: 12     // y轴文字大小
      }
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  percentByManufacturerChart.setOption(option);

  $.ajax({
    method: 'get',
    url: 'percentByManufacturerBar',
    dataType: 'json',
    success: function (response) {
      option.xAxis.data = response.xAxis
      option.series[0].data = response.yAxis
      percentByManufacturerChart.setOption(option);
    },
  });
});
