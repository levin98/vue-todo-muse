<template>
  <div class="home">
    <mu-card class="to-do-item">
      <mu-flex class="to-do-wrapper" justify-content="start">
        <mu-flex class="to-do-checkbox" justify-content="start">
          <mu-checkbox></mu-checkbox>
        </mu-flex>
        <mu-flex class="to-do-title" justify-content="start">
          <span>Title</span>
        </mu-flex>
      </mu-flex>
    </mu-card>
    <mu-button id="create" fab large color="primary">
      <mu-icon value="add"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style scoped>
.home {
  padding: 10px;
}

#create {
  position: fixed;
  bottom: 50px;
  right: 50px;
}

.to-do-item {
  width: 100%;
  vertical-align: middle;
}
</style>
