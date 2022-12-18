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

    data = json.loads(request.data)
    difficulty = int(data['difficulty'])
    print(difficulty)
    if difficulty >= 3:
        min_operator_num = 30
        max_operator_num = 100
    elif difficulty == 2:
        min_operator_num = 30
        max_operator_num = 60
    elif difficulty == 1:
        min_operator_num = 10
        max_operator_num = 50
    else:
        min_operator_num = 1
        max_operator_num = 50
    return jsonify(
        difficulty=difficulty,
    )

@app.route('/api/checkanswer', methods=['POST'])
def check_answer():
    global num_of_test
    global nth_item
    global num_of_wrong_answer

    print(request.data)
    data = json.loads(request.data)  # 将json字符串转为dict

    result = str(eval(data['test_str'], {}, {}))

    if result == data['test_answer']:
        if nth_item >= num_of_test:
            # already reach the end
            # check the time spent
            lap_time = round(time.time() - start_time)
            duration_str = strftime("%H:%M:%S", gmtime(lap_time))
            print(duration_str)
            nth_item = 0
            return jsonify(
                correct=1,
                end=1,
                exam='恭喜你完成所有考题',
                duration=duration_str,
                test_id=nth_item,
                wrong_num=num_of_wrong_answer
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
    # random operator
    operators = ['+', '-']
    op = choice(operators)

    exam = str(num_a) + ' ' + op + ' ' + str(num_b)
    nth_item += 1
    return exam


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
