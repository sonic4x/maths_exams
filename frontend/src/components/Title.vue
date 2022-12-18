
<script>
import axios from "axios";
import global_v from "./global_v";

import SettingTest from "./SettingTest.vue";

export default {
  name: "GetDescription",
  components: { SettingTest },
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    getMessage() {
      const path = "http://" + global_v.api_server + ":5000/api/getdiscription";
      console.log(path);
      axios
        .get(path)
        .then((res) => {
          this.msg = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  created() {
    this.getMessage();
  },
};
</script>

<template>
  <div class="greetings">
    <img alt="Vue logo" class="logo" src="@/assets/maths.svg" width="125" height="125" />
    <span class="green">
      <h1>数学测试</h1>
    </span>
  </div>
  <div>
    <SettingTest />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.0rem;
}

h3 {
  font-size: 1.2rem;
}

.logo {
  margin: 0 2rem 0 0;
}

.greetings {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
