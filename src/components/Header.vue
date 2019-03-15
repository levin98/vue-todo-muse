<template>
  <mu-appbar color="primary">
    <mu-button icon slot="left" @click="toggleDrawer">
      <mu-icon value="menu"></mu-icon> </mu-button
    >Dashboard
    <mu-menu slot="right">
      <mu-button flat>{{ username }}</mu-button>
      <mu-list slot="content">
        <mu-list-item button @click="logout">
          <mu-list-item-content>
            <mu-list-item-title>Log Out</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-menu>
  </mu-appbar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: "Username"
    };
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  },
  mounted() {
    this.username = this.$store.getters.getUsername;
  }
};
</script>

<style>
.mu-appbar {
  top: 0;
  position: sticky;
  width: 100%;
}

.drawer {
  padding: 5%;
}
</style>
