

<script>
export default {
  props: {
    duration: String,
    wrong_num: Number,
    dialog: Boolean,
  },
  computed: {
    // 一个计算属性的 getter
    wrongNumMessage() {
      // `this` 指向当前组件实例
      return this.wrong_num > 0
        ? "共答错" + this.wrong_num + "题。"
        : "全对，太棒了！";
    },
    allCorrect() {
      return this.wrong_num > 0 ? false : true;
    },
    resultRating(){
      return this.wrong_num > 0 ? 2 : 3;
    },
  },
  methods: {
    returnValue() {
      return true;
    },
  },

  // setup() {
  //   function returnValue() {
  //     return true;
  //   }
  //   return {
  //     returnValue,
  //   };
  // },
};
</script>


<template>
  <v-dialog v-model="dialog" width="420" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> 练习结果 </v-card-title>

      <v-card-text>
        <h2>恭喜你完成所有考题</h2>
        <h2>共耗时：{{ duration }}</h2>
        <h2>{{ wrongNumMessage }}</h2>
        <div class="text-center">
        <v-rating
          v-model="resultRating"
          length=3
          class="ma-2"
          density="default"
          color="purple"
          bg-color="purple-lighten-3"
          large
        ></v-rating>
        </div>
        
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
}
.btn {
  margin: 10px;
}
</style>
