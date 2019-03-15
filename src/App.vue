<template>
  <div id="app">
    <Header v-if="!['/login', '/register'].includes(this.$route.path)" />
    <router-view />
    <Alert
      :color="this.alertBox.color"
      :message="this.alertBox.message"
      :icon="this.alertBox.icon"
      :open="this.alertBox.open"
      @close-alert="closeAlert"
      @open-alert="openAlert"
    />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Alert from "@/components/Alert.vue";

export default {
  name: "app",
  components: {
    Header,
    Alert
  },
  data() {
    return {
      alertBox: {
        open: false,
        message: "",
        color: "success",
        timeout: 3000
      }
    };
  },
  computed: {
    icon() {
      return {
        success: "check_circle",
        info: "info",
        warning: "priority_high",
        error: "warning"
      }[this.alertBox.color];
    }
  },
  methods: {
    openAlert(status, statusText) {
      status === "success"
        ? (this.alertBox.color = "success")
        : (this.alertBox.color = "error");
      this.alertBox.message = statusText;
      if (this.alertBox.timer) clearTimeout(this.alertBox.timer);
      this.alertBox.open = true;
      this.alertBox.timer = setTimeout(() => {
        this.alertBox.open = false;
      }, this.alertBox.timeout);
    },
    closeAlert() {
      this.alertBox.open = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
