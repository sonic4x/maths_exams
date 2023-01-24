from tabnanny import check
from turtle import begin_fill
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from random import choice, randrange
import argparse
import time
from time import strftime
from time import gmtime
import math
from datetime import datetime
import os
import csv
import pandas as pd

####### Usage ########
# python backend.py - e 10.0.0.19
####### Note #########
# CORS(app, resources={r'/*': {'origins': '*'}}) 允许来自于 Vue 的跨域访问请求

# 定义以 /api/* 开头的 Flask 的路由，由 Flask 来处理

# / 请求直接发送一个静态文件 /index.html，由于不会用到 Flask 的模板系统，所以也就无需调用  render_template() 方法去渲染。
# 后面会将到在 backend 目录中会建立一个到 Vue.js 项目打包后的 dist 目录的符号链接 static, 所以其中有 index.html 等

# @app.rout('/<path:fallback>') 里是个关键，凡是 Flask 未定义的路由都会落到这里来。
# 如果访问的是 static(dis) 中的 css, js, img 或 favicon.ico 文件，直接送出内容，其他的请求转到 Vue 的入口 index.html,
# 最后将由 Vue 中定义的路由来处理
# 如果 Vue 的 Router 工作在 hash 模式的话，fallback 方法可以不要，因为 /#/home 到 /#/about 的切换本身不产生 HTTP 请求，Flask 只需要 / 一个路由进入 Vue 入口页面

# TODO:
# time check
# pause function?
# beautify vue.  Pop up new window show "finish"
# clear answer when next test come
# vue expose host.  Let ipad access to 10.0.0.19:5173


DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})  # 允许来自于 Vue 的跨域访问请求

nth_item = 0
num_of_test = 50
start_time = 0
num_of_wrong_answer = 0
max_operator_num=50
min_operator_num=1
min_diff_between_operator_numbers = 1
operators = []
history_file = "history_record.csv"
break_record = 0

@app.route('/api/getdiscription', methods=['GET'])
def ping_pong():
    return jsonify('1-50 加减法')


@app.route('/api/getexam', methods=['GET'])
def get_exam():
    global nth_item
    global start_time
    global num_of_wrong_answer
    nth_item = 0
    num_of_wrong_answer = 0
    item = get_random_test()

    # begin to count time
    start_time = time.time()

    return jsonify(
        exam=item,
        test_id=nth_item,
    )

@app.route('/api/setting',methods=['POST'])
def setting():
    global max_operator_num
    global min_operator_num
    global min_diff_between_operator_numbers
    global operators

    data = json.loads(request.data)
    difficulty = int(data['difficulty'])
    operators = data['operator_list']

    if operators == ['*']:
        if difficulty >= 3:
            min_operator_num = 5
            max_operator_num = 10
        elif difficulty == 2:
            min_operator_num = 2
            max_operator_num = 9
        elif difficulty == 1:
            min_operator_num = 2
            max_operator_num = 7
        else:
            min_operator_num = 2
            max_operator_num = 5
    elif operators == ["/"]:
        min_operator_num = 1
        max_operator_num = 9
    else:
        if difficulty >= 3:
            min_operator_num = 30
            max_operator_num = 100
            min_diff_between_operator_numbers = 11
        elif difficulty == 2:
            min_operator_num = 30
            max_operator_num = 60
            min_diff_between_operator_numbers = 7
        elif difficulty == 1:
            min_operator_num = 10
            max_operator_num = 50
            min_diff_between_operator_numbers = 5
        else:
            min_operator_num = 1
            max_operator_num = 50
            min_diff_between_operator_numbers = 2

    return jsonify(
        difficulty=difficulty,
    )

@app.route('/api/history', methods=['POST'])
def fetch_history():
    if os.path.exists(history_file):
        df = pd.read_csv(history_file)
        print(df)

        col_date = df['date']
        # col_date= list(map(str, col_date))
        col_date = col_date.values.tolist() # put the specific column into list

        col_duration = df['duration']
        col_duration = list(map(int, col_duration)) # convert the all elements from str to int, then convert to list

        col_precision=df['correct_rate']
        col_precision = list(map(int, col_precision))

        print("date_values:{}".format(col_date))
        print("duration_values:{}".format(col_duration))
        
        return jsonify(
            date_values=col_date,
            duration_values=col_duration,
            precision_values=col_precision,
        )
    else:
        return jsonify(
            date_values=[],
            duration_values=[],
        )



@app.route('/api/checkanswer', methods=['POST'])
def check_answer():
    global num_of_test
    global nth_item
    global num_of_wrong_answer

    print(request.data)
    data = json.loads(request.data)  # 将json字符串转为dict
    eval_data = get_op_str_from_human(data['test_str'])
    print("eval_data:"+ eval_data)
    result = str(eval(eval_data, {}, {}))
    print("result:" + result)

    if math.isclose(float(result), float(data['test_answer']), rel_tol=1e-3):
        if nth_item >= num_of_test:
            # already reach the end
            # check the time spent
            lap_time = round(time.time() - start_time) # Unit: second
            print("lap_time:{}".format(lap_time))
            duration_str = strftime("%H:%M:%S", gmtime(lap_time))

            # check correct rate
            correct_rate = round(max(0,(num_of_test - num_of_wrong_answer)) / num_of_test * 100)
            print("correct_rate:{}%".format(correct_rate))

            # check if break the record
            break_record = False
            if is_break_record(lap_time):
                break_record = True
            # save the history
            today = datetime.today().date()
            save_history(today, lap_time, correct_rate)

            nth_item = 0
            return jsonify(
                correct=1,
                end=1,
                duration=duration_str,
                test_id=nth_item,
                wrong_num=num_of_wrong_answer,
                break_record=break_record,
            )
        item = get_random_test()
        return jsonify(
            correct=1,
            exam=item,
            test_id=nth_item,
        )
    else:
        num_of_wrong_answer += 1
        return jsonify(
            correct=0
        )

def save_history(today_date, test_duration, correct_rate):
    # check csv exist

    if os.path.exists(history_file):
        with open(history_file, "a") as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow([today_date, test_duration, correct_rate])
    else:
        # new file and write header, then save the content
        with open(history_file, "w") as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow(["date","duration","correct_rate"])
            writer.writerow([today_date, test_duration, correct_rate])

def is_break_record(test_duration):
    if os.path.exists(history_file):
        df = pd.read_csv(history_file)
        df = df.sort_values(by=['duration'], ascending=True)
        df = df.reset_index(drop=True) # After sorting, the index is messy, need to reindex.
        print(df)
        min_duration_value = df['duration'][0]
        max_duration_value = df['duration'][len(df)-1]
        print(min_duration_value)
        print(max_duration_value)

        if test_duration < min_duration_value:
            return True
        else:
            return False
    else:
        return True

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/<path:fallback>')
def fallback(fallback):       # Vue Router 的 mode 为 'hash' 时可移除该方法
    if fallback.startswith('css/') or fallback.startswith('js/')\
            or fallback.startswith('img/') or fallback == 'favicon.ico':
        return app.send_static_file(fallback)
    else:
        return app.send_static_file('index.html')


def get_random_test():
    global nth_item
    
    max_num = max_operator_num
    min_num = min_operator_num

    num_a = randrange(min_num, max_num+1)
    num_b = randrange(min_num, max_num+1)
    if num_a < num_b:
        num_a, num_b = num_b, num_a  # swap the number
    

    if num_a - num_b < min_diff_between_operator_numbers: # ensure the 2 numbers differ at specific level
        num_a += min_diff_between_operator_numbers
        num_a = min(num_a, max_operator_num)
    # random operator
    # operators = ['+', '-']
    op = choice(operators)

    exam = str(num_a) + ' ' + op + ' ' + str(num_b)
    exam = get_op_str_to_human(exam)
    nth_item += 1
    return exam

def get_op_str_to_human(op):
    return op.replace("*","x").replace("/","÷")

def get_op_str_from_human(op):
    return op.replace("x","*").replace("÷","/")

if __name__ == '__main__':
    # num_of_test = 50
    host = ''
    ap = argparse.ArgumentParser()
    ap.add_argument("-e", "--host",
                    help="Expose to the specific host, if not set, just use localhost")
    ap.add_argument("-n", "--num_test",
                    help="num of test to have")
    args = vars(ap.parse_args())
    if args["num_test"] is not None:
        num_of_test = int(args["num_test"])
    host = args["host"]
    if host == '':
        app.run()  # run local host
    else:
        app.run(host=host)  # python backend.py -e 10.0.0.19
