<template>
  <div class="home">
    <ToDoItem
      v-for="toDoItem of toDoItems"
      :key="toDoItem.title"
      :title="toDoItem.title"
      :isDoneProp="toDoItem.isDone"
      @toggle-to-do="toggleDone(toDoItem)"
    ></ToDoItem>
    <mu-button id="create" fab medium color="primary">
      <mu-icon value="add"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
// @ is an alias to /src
import ToDoItem from "@/components/ToDoItem.vue";

export default {
  name: "home",
  components: {
    ToDoItem
  },
  data() {
    return {
      toDoItems: [
        {
          title: "Eat",
          isDone: false
        },
        {
          title: "Sleep",
          isDone: true
        },
        {
          title: "Work",
          isDone: false
        }
      ]
    };
  },
  methods: {
    toggleDone(toDoItem) {
      toDoItem.isDone = !toDoItem.isDone;
    }
  }
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
</style>
