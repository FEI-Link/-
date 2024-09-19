from flask import Flask, render_template, jsonify
import pymysql
app = Flask(__name__)
# 数据库连接配置
def get_connection():
  return pymysql.connect(
    host='localhost',
    port=3306,
    user='root',
    passwd='1234qwer',
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
    # sql = 'select manufacturer,count(1) value from tb_sale group by manufacturer order by value desc limit 5'
    sql = 'select city,count(1) value from tb_car group by city order by value desc limit 5'
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.close()
    for row in result:
      x_axis_list.append(row[0])
      y_axis_list.append(row[1])
    data = {'xAxis': x_axis_list, 'yAxis': y_axis_list}
  return jsonify(data)

@app.route('/percentByManufacturerBar1')
def percentByManufacturerBar1():
  # 坐标轴
  x_axis_list = []
  # 值轴
  y_axis_list = []
  conn = get_connection()
  with conn.cursor() as cursor:
    # sql = 'select manufacturer,count(1) value from tb_sale group by manufacturer order by value desc limit 5'
    sql = 'select vt_name,count(1) value from tb_car group by vt_name order by value desc limit 5'
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
    sql = 'select city,count(1) value from tb_car group by city order by value desc limit 5'
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

@app.route('/percentByManufacturerPie1')
def percentByManufacturerPie1():
  conn = get_connection()
  with conn.cursor() as cursor:
    sql = 'select vot3,count(1) value from tb_car group by vot3 order by value desc limit 5'
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
# 销量前10的车型
@app.route('/selectPercentByModelBar')
def selectPercentByModelBar():
  # 坐标轴
  x_axis_list = []
  # 值轴
  y_axis_list = []
  conn = get_connection()
  with conn.cursor() as cursor:
    sql = 'select engine_size,count(1) value from tb_sale group by engine_size order by value desc limit 10'
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.close()
    for row in result:
      x_axis_list.append(row[1])
      y_axis_list.append(row[0])
    data = {'xAxis': x_axis_list, 'yAxis': y_axis_list}
  return jsonify(data)

# 个人用车与商务用车占比
@app.route('/percentPie')
def percentPie():
  conn = get_connection()
  with conn.cursor() as cursor:
    sql = "select vtp name ,count(vpa) as value from tb_car where vtp in ('personal','unit') group by vtp"
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
