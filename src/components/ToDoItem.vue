<template>
  <mu-card :class="toDoClass">
    <mu-flex class="to-do-wrapper" justify-content="start">
      <mu-flex
        class="to-do-checkbox"
        justify-content="start"
        align-self="center"
      >
        <mu-checkbox v-model="isDone" @change="toggleDone"></mu-checkbox>
      </mu-flex>
      <mu-flex class="to-do-title" justify-content="start" align-self="center">
        <span>{{ title }}</span>
      </mu-flex>
    </mu-flex>
  </mu-card>
</template>

<script>
export default {
  name: "ToDoItem",
  props: {
    title: String,
    isDoneProp: Boolean
  },
  data() {
    return {
      isDone: false
    };
  },
  mounted() {
    this.isDone = this.isDoneProp;
  },
  computed: {
    toDoClass() {
      return this.isDone ? "to-do-item-done" : "to-do-item";
    }
  },
  methods: {
    toggleDone() {
      this.$emit("toggle-to-do");
    }
  }
};
</script>

<style>
.to-do-item,
.to-do-item-done {
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
}

.to-do-item-done {
  text-decoration: line-through;
  background-color: gray !important;
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

div /deep/ .mu-checkbox-checked {
  color: darkgray;
}
</style>
