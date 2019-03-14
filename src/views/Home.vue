<template>
  <div class="home">
    <mu-card class="to-do-item">
      <mu-flex class="to-do-wrapper" justify-content="start">
        <mu-flex
          class="to-do-checkbox"
          justify-content="start"
          align-self="center"
        >
          <mu-checkbox></mu-checkbox>
        </mu-flex>
        <mu-flex
          class="to-do-title"
          justify-content="start"
          align-self="center"
        >
          <span>Title</span>
        </mu-flex>
      </mu-flex>
    </mu-card>
    <mu-button id="create" fab medium color="primary">
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
  bottom: 40px;
  right: 40px;
}

.to-do-item {
  width: 100%;
  height: 50px;
}

.to-do-wrapper {
  width: 100%;
  height: 50px;
}

.to-do-checkbox {
  margin: 0px 20px;
}

.to-do-title {
  margin: 0px 20px;
}
</style>
