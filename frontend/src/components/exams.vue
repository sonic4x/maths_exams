<script>
import axios from 'axios';
import global_v from "./global_v";

import FinishDialogue from "./FinishDialogue.vue";

export default {
  components: { FinishDialogue },
  name: "GetExam",
  data() {
    return {
      msg: "",
      test_id: 1,
      incorrect: false,
      test_id_boom: true,
      show: true,
      dialog: false,
      finish_message: "",
      finish_result: {
        duration: "",
        wrong_num: "",
        break_record: false,
      },
    };
  },
  methods: {
    getMessage() {
      const path = "http://" + global_v.api_server + ":5000/api/getexam";
      // const path = "http://10.0.0.19:5000/api/getexam";
      axios
        .get(path)
        .then((res) => {
          console.log(res);
          this.msg = res.data["exam"];
          this.test_id = res.data["test_id"];
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    submit() {
      // alert(`The answer is: ${this.answer}!`)
      const path = "http://" + global_v.api_server + ":5000/api/checkanswer";
      this.show = false;
      axios
        .post(path, {
          test_str: this.msg,
          test_answer: this.answer,
        })
        .then((res) => {
          if (res.data["correct"] == 1) {
            if (res.data["end"] == 1) {
              this.finish_result.duration = res.data["duration"];
              this.finish_result.wrong_num = res.data["wrong_num"];
              this.finish_result.break_record = res.data["break_record"];
              // console.log(this.finish_result.duration);
              // console.log(this.finish_result.wrong_num);
              // this.finish_message =
              //   "恭喜你完成所有考题，共耗时" + res.data["duration"];
              // if (res.data["wrong_num"] > 0) {
              //   this.finish_message += "，答错" + res.data["wrong_num"] + "题";
              // }

              this.dialog = true;
            } else {
              this.show = true;  // Some animation
              this.msg = res.data["exam"];
              this.test_id = res.data["test_id"];
              this.answer = "";
            }
          } else {
            // alert("回答错误");
            this.warnIncorrect();
          }
        });
    },
    warnIncorrect() {
      this.incorrect = true;
      setTimeout(() => {
        this.incorrect = false;
      }, 1500);
    },
  },
  created() {
    this.getMessage();
  },
};
</script>

<template>
  <div style="top:5rem">
    <p style="text-align: left; position: relative" :class="{ zoom: show }">
      第{{ test_id }}题：
    </p>

    <h1 class="green">
      {{ msg }} =
      <input :class="{ shake: incorrect, warn: incorrect }" v-model="answer" @keyup.enter="submit()"
        placeholder="输入后Enter" />
    </h1>
    <Transition name="bounce">
      <p v-if="incorrect" style="text-align: center">答错啦!</p>
    </Transition>
    <!--<button @click="submit(answer)"> 提交答案 </button>-->
    <finish-dialogue :dialog="this.dialog" :duration="this.finish_result.duration"
      :wrong_num="this.finish_result.wrong_num" :break_record="this.finish_result.break_record" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

input {
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 3px;

  padding: 14px 14px;
  width: 200px;
  top: -5px;
  font-size: 28px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.zoom {
  animation: zoom 1s ease-in;
  transform: translate3d(0, 0, 0);
}

@keyframes zoom {
  0% {
    color: black;
    /* transform: translate3d(-1px, 0, 0); */
    /* transform: scale(1); */
  }

  50% {
    color: red;
    /* transform: translate3d(10px, 0, 0); */
    transform: scale(1.2);
  }

  100% {
    color: blue;
    transform: translateX(0rpx);
    transform: scale(1);
  }
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

.warn {
  border-color: crimson;
  color: crimson;
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
