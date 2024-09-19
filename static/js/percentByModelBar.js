$(function () {
  // 基于准备好的dom，初始化echarts实例
  let percentByModelBarChart = echarts.init(document.getElementById('percentByModelBar'));

// 指定图表的配置项和数据
  let option = {
    title: {
      text: '销量前10的引擎型号'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: []
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
  percentByModelBarChart.setOption(option);
  $.ajax({
    method: 'get',
    url: 'selectPercentByModelBar',
    dataType: 'json',
    success: function (response) {
      option.yAxis.data = response.yAxis
      option.series[0].data = response.xAxis
      percentByModelBarChart.setOption(option);
    },
  });
});