$(function () {
  // 基于准备好的dom，初始化echarts实例
  let percentByManufacturerChart = echarts.init(document.getElementById('percentByManufacturerPie1'));

// 指定图表的配置项和数据
  let option = {
    title: {
      text: '不同类型车销量占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '不同类型车销量占比',
        type: 'pie',
        radius: '50%',
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
  }

  // 使用刚指定的配置项和数据显示图表。
  percentByManufacturerChart.setOption(option);
  $.ajax({
    method: 'get',
    url: 'percentByManufacturerPie1',
    dataType: 'json',
    success: function (response) {
      option.series[0].data = response
      percentByManufacturerChart.setOption(option);
    },
  });
});