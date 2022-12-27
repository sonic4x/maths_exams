<script>
import axios from 'axios';
import global_v from "./global_v";
import exams from './exams.vue';
import Home from './Home.vue';
import HistoryChart from './HistoryChart.vue';
export default {
  components: { HistoryChart },
  data() {
    return {
      difficulty: 0,
      setting_applied: 0,
      show_history: 0,
      satisfactionEmojis: ['😁', '🙂', '😐', '😭'],
      tickLabels: {
        0: 'B',
        1: 'A',
        2: 'A+',
        3: 'A++',
      },
      items: ['+', '-', '*', '/'],
      selected_items: ['+', '-'],
    }
  },
  computed: {
    currentView() {
      if (this.show_history == 1) {
        return HistoryChart
      }
      if (this.setting_applied == 1) {
        return exams
      }
      else {
        return Home
      }

    }
  },
  methods: {
    applySetting() {
      const path = "http://" + global_v.api_server + ":5000/api/setting";
      axios
        .post(path, {
          operator_list: this.selected_items,
          difficulty: this.difficulty,
        })
        .then((res) => {
          this.difficulty = res.data["difficulty"]
          this.setting_applied = 1;
          this.show_history = 0;
        });
    },
    showHistory() {
      this.show_history = 1;
      this.setting_applied = 0;
      // const path = "http://" + global_v.api_server + ":5000/api/history";
      // axios
      //   .post(path, {
      //     option: 0,
      //   })
      //   .then((res) => {
      //     this.show_history = 1;
      //     this.setting_applied = 0;
      //   });
    }
  },
}
</script>


<template>
  <div class="settings">
    <v-select v-model="selected_items" :items="items" label="选择算术符号" multiple chips></v-select>
    <v-slider v-model="difficulty" class="align-center" color="orange" label="难度选择" :ticks="tickLabels"
      show-ticks="always" tick-size="4" :max="3" step=1 thumb-label="always">
      <template v-slot:thumb-label="{ modelValue }">
        {{ satisfactionEmojis[Math.min(modelValue, 3)] }}
      </template>
    </v-slider>
    <div class="btn_even">
      <v-btn rounded="pill" color="green" @click="applySetting">
        开始答题
      </v-btn>
      <v-btn rounded="pill" color="blue" @click="showHistory">
        历史表现
      </v-btn>
    </div>
    <component :is="currentView" />
  </div>
  <!-- <div>
    <HistoryChart />
  </div> -->
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
}

.btn_even {
  display: flex;
  justify-content: space-evenly;
}
</style>
