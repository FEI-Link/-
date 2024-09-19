$(function () {
  // 基于准备好的dom，初始化echarts实例
  let percentPieChart = echarts.init(document.getElementById('percentPie'));

// 指定图表的配置项和数据
  let option = {
    title: {
      text: '个人用车与商务用车占比',
      left: 'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '个人用车与商务用车占比',
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
  };

  // 使用刚指定的配置项和数据显示图表。
  percentPieChart.setOption(option);
  $.ajax({
    method: 'get',
    url: 'percentPie',
    dataType: 'json',
    success: function (response) {
      option.series[0].data = response
      percentPieChart.setOption(option);
    },
  });
});