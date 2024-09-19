# flask数据可视化

## 准备

### 准备数据

> 注意：在数据库脚本目录打开终端

```bash
# 登录数据库
mysql -uroot -p
```

```sql
-- 创建数据库
create database db_car;
-- 使用数据库
use db_car;
-- 恢复数据表
source mysql.sql;
```

### 创建工程

![flask](./img/flask.png)

### 导入静态资源文件到 [static](static) 目录

![image-20240918141202628](./img/image-20240918141202628.png)

### 创建网页布局文件 [index.html](templates/index.html) 在 [templates](templates) 目录

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>李昊哲小课</title>
    {#<link rel="stylesheet" href="../static/layui/css/layui.css">#}
    <link href="{{ url_for('static', filename='layui/css/layui.css') }}" rel="stylesheet"/>
    <style>
        .echarts-header {
            width: 100%;
            height: 80px;
            text-align: center;
            line-height: 80px;
        }

        .echarts-100 {
            width: 100%;
            height: 500px;
        }
    </style>
</head>
<body>
{#头部标题#}
<div class="layui-row">
    <div class="layui-col-xs-12">
        <div class="echarts-header layui-bg-blue">
            <h1>乘用车大数据分析</h1>
        </div>
    </div>
    {#第一行#}
    <div class="layui-row">
        {#第一行的第一个图表#}
        <div class="layui-col-xs6"></div>
        {#第一行的第二个图表#}
        <div class="layui-col-xs6"></div>
    </div>
    {#第二行#}
    <div class="layui-row">
        {#第二行的第一个图表#}
        <div class="layui-col-xs6"></div>
        {#第二行的第二个图表#}
        <div class="layui-col-xs6"></div>
    </div>
</div>
</body>
</html>
<script src="{{ url_for('static', filename='layui/layui.js') }}"></script>
<script src="{{ url_for('static', filename='js/echarts.min.js') }}"></script>
```

### 在 [app.py](app.py) 文件中编写路由

```python
from flask import Flask,render_template

app = Flask(__name__)


@app.route('/')
def to_index():  # put application's code here
  return render_template('index.html')


if __name__ == '__main__':
  app.run(
    host='0.0.0.0',
    port=5000,
    debug=False,
  )

```

> 运行测试

## 数据分析

### 连接数据库

> 安装数据库连接模块pymysql

```bash
conda install pymysql
```

> 编写数据库连接代码

```python
# 数据库连接配置
def get_connection():
  return pymysql.connect(
    host='localhost',
    port=3306,
    user='root',
    passwd='lihaozhe',
    db='db_car',
    charset='utf8mb4',
    # cursorclass=pymysql.cursors.DictCursor
  )

```

### 销量前5的生产商

#### 后端api

```python
from flask import Flask, render_template, jsonify
import pymysql
app = Flask(__name__)
# 数据库连接配置
def get_connection():
  return pymysql.connect(
    host='localhost',
    port=3306,
    user='root',
    passwd='lihaozhe',
    db='db_car',
    charset='utf8mb4',
    # cursorclass=pymysql.cursors.DictCursor
  )

@app.route('/')
def to_index():
  return render_template('index.html')

# 销量前5的生产商 柱状图
@app.route('/percentByManufacturerBar')
def percentByManufacturerBar():
  # 坐标轴
  x_axis_list = []
  # 值轴
  y_axis_list = []
  conn = get_connection()
  with conn.cursor() as cursor:
    sql = 'select manufacturer,count(1) value from tb_sale group by manufacturer order by value desc limit 5'
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.close()
    for row in result:
      x_axis_list.append(row[0])
      y_axis_list.append(row[1])
    data = {'xAxis': x_axis_list, 'yAxis': y_axis_list}
  return jsonify(data)

# 销量前5的生产商 饼图
@app.route('/percentByManufacturerPie')
def percentByManufacturerPie():
  conn = get_connection()
  with conn.cursor() as cursor:
    sql = 'select manufacturer name ,count(1) value from tb_sale group by manufacturer order by value desc limit 5'
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.close()
    data = []
    for row in result:
      car = {
        "name": row[0],
        "value": row[1]
      }
      data.append(car)
  return jsonify(data)

if __name__ == '__main__':
  app.run(
    host='0.0.0.0',
    port=5000,
    debug=False,
  )

```

#### 前端图表

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>李昊哲小课</title>
    {#<link rel="stylesheet" href="../static/layui/css/layui.css">#}
    <link href="{{ url_for('static', filename='layui/css/layui.css') }}" rel="stylesheet"/>
    <style>
        .echarts-header {
            width: 100%;
            height: 80px;
            text-align: center;
            line-height: 80px;
        }

        .echarts-100 {
            width: 100%;
            height: 500px;
        }
    </style>
</head>
<body>
{#头部标题#}
<div class="layui-row">
    <div class="layui-col-xs-12">
        <div class="echarts-header layui-bg-blue">
            <h1>乘用车大数据分析</h1>
        </div>
    </div>
    {#第一行#}
    <div class="layui-row">
        {#第一行的第一个图表#}
        <div class="layui-col-xs6">
            <div id="percentByManufacturerBar" class="echarts-100"></div>
        </div>
        {#第一行的第二个图表#}
        <div class="layui-col-xs6">
            <div id="percentByManufacturerPie" class="echarts-100"></div>
        </div>
    </div>
    {#第二行#}
    <div class="layui-row">
        {#第二行的第一个图表#}
        <div class="layui-col-xs6"></div>
        {#第二行的第二个图表#}
        <div class="layui-col-xs6"></div>
    </div>
</div>
</body>
</html>
<script src="{{ url_for('static', filename='layui/layui.js') }}"></script>
<script src="{{ url_for('static', filename='js/echarts.min.js') }}"></script>
<script src="{{ url_for('static', filename='js/jquery.min.js') }}"></script>
<script src="{{ url_for('static', filename='js/percentByManufacturerBar.js') }}"></script>
<script src="{{ url_for('static', filename='js/percentByManufacturerPie.js') }}"></script>

```

> percentByManufacturerBar.js

```javascript
$(function () {
  // 基于准备好的dom，初始化echarts实例
  let percentByManufacturerChart = echarts.init(document.getElementById('percentByManufacturerBar'));

// 指定图表的配置项和数据
  let option = {
    title: {
      text: '销量前5的生产商'
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
        data: []
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
```

> percentByManufacturerPie.js

```javascript
$(function () {
  // 基于准备好的dom，初始化echarts实例
  let percentByManufacturerChart = echarts.init(document.getElementById('percentByManufacturerPie'));

// 指定图表的配置项和数据
  let option = {
    title: {
      text: '销量前5的生产商',
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
        name: '销量前5的生产商',
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
    url: 'percentByManufacturerPie',
    dataType: 'json',
    success: function (response) {
      console.log(response)
      option.series[0].data = response
      percentByManufacturerChart.setOption(option);
    },
  });
});
```

