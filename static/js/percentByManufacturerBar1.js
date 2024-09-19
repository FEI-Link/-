$(function () {
  // 基于准备好的dom，初始化echarts实例
  let percentByManufacturerChart = echarts.init(document.getElementById('percentByManufacturerBar1'));

// 指定图表的配置项和数据
  let option = {
    title: {
      text: '被记录数量前五的车牌号'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: []
    },
    yAxis: {},
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
    url: 'percentByManufacturerBar1',
    dataType: 'json',
    success: function (response) {
      option.xAxis.data = response.xAxis
      option.series[0].data = response.yAxis
      percentByManufacturerChart.setOption(option);
    },
  });
});