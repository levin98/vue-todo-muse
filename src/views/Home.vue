<template>
  <div class="home">
    <mu-drawer
      class="drawer"
      :open.sync="open"
      :docked="docked"
      :right="position === 'right'"
      :z-depth="zDepth"
    >
      <mu-form :model="control" label-position="left">
        <mu-form-item prop="switchDone" label="Done">
          <mu-switch v-model="control.switchDone"></mu-switch>
        </mu-form-item>
        <mu-form-item prop="switchNotDone" label="Not Done">
          <mu-switch v-model="control.switchNotDone"></mu-switch>
        </mu-form-item>
      </mu-form>
      <mu-button color="primary" @click="toggleDrawer">Close</mu-button>
    </mu-drawer>
    <ToDoItem
      v-for="toDoItem of toDoItemsSorted"
      :key="toDoItem.title"
      :title="toDoItem.title"
      :isDoneProp="toDoItem.isDone"
      @toggle-to-do="toggleDone(toDoItem)"
    ></ToDoItem>
    <mu-button id="create" fab medium color="primary" @click="openSimpleDialog">
      <mu-icon value="add"></mu-icon>
    </mu-button>
    <mu-dialog
      title="Create new to do item"
      width="360"
      :open.sync="openSimple"
    >
      <mu-form :model="form" :label-position="labelPosition" label-width="100">
        <mu-form-item prop="title" label="Title">
          <mu-text-field v-model="form.title"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-button color="primary" @click="submit">Add</mu-button>
      <mu-button flat color="primary" @click="closeSimpleDialog"
        >Cancel</mu-button
      >
    </mu-dialog>
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
      docked: false,
      position: "left",
      zDepth: 16,
      control: {
        switchDone: true,
        switchNotDone: true
      },
      toDoItems: [],
      openSimple: false,
      labelPosition: "top",
      form: {
        title: ""
      }
    };
  },
  methods: {
    toggleDone(toDoItem) {
      toDoItem.isDone = !toDoItem.isDone;
    },
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    },
    openSimpleDialog() {
      this.openSimple = true;
    },
    closeSimpleDialog() {
      this.openSimple = false;
    },
    submit() {
      this.toDoItems.push({ title: this.form.title, isDone: false });
      this.form.title = "";
      this.openSimple = false;
    }
  },
  computed: {
    toDoItemsSorted() {
      let done = [],
        notDone = [];
      for (var toDoItem of this.toDoItems) {
        toDoItem.isDone ? done.push(toDoItem) : notDone.push(toDoItem);
      }
      return notDone.concat(done);
    },
    open() {
      return this.$store.getters.getDrawerState;
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}

#create {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>
