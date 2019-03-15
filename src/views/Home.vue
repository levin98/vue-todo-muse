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
    <div v-if="control.switchNotDone">
      <ToDoItem
        v-for="toDoItem of toDoItemsNotDone"
        :key="toDoItem.todo_id"
        :title="toDoItem.todo"
        :isDoneProp="toDoItem.isdone"
        @toggle-to-do="toggleDone(toDoItem)"
        @edit-to-do="editTodo(toDoItem)"
        @remove-to-do="deleteTodo(toDoItem)"
      ></ToDoItem>
    </div>
    <div v-if="control.switchDone">
      <ToDoItem
        v-for="toDoItem of toDoItemsDone"
        :key="toDoItem.todo_id"
        :title="toDoItem.todo"
        :isDoneProp="toDoItem.isdone"
        @toggle-to-do="toggleDone(toDoItem)"
        @edit-to-do="editTodo(toDoItem)"
        @remove-to-do="deleteTodo(toDoItem)"
      ></ToDoItem>
    </div>
    <mu-button id="create" fab medium color="primary" @click="openSimpleDialog">
      <mu-icon value="add"></mu-icon>
    </mu-button>
    <mu-dialog :title="dialogIitle" width="360" :open.sync="openSimple">
      <mu-form :model="form" :label-position="labelPosition" label-width="100">
        <mu-form-item prop="title" label="Title">
          <mu-text-field v-model="form.title"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-button color="primary" @click="submit">
        {{ this.btnText }}
      </mu-button>
      <mu-button flat color="primary" @click="closeSimpleDialog"
        >Cancel</mu-button
      >
    </mu-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import ToDoItem from "@/components/ToDoItem.vue";
import { getTodo } from "../../api";
import { addTodo } from "../../api";
import { updateTodo } from "../../api";
import { removeTodo } from "../../api";

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
      dialogIitle: "Create a new to do...",
      btnText: "Add",
      openSimple: false,
      labelPosition: "top",
      form: {
        title: ""
      },
      edittingItem: {
        todo_id: "",
        isdone: ""
      }
    };
  },
  methods: {
    toggleDone(toDoItem) {
      toDoItem.isdone = !toDoItem.isdone;
      const payload = {
        user: this.$store.getters.getUsername,
        todo: toDoItem.todo,
        isdone: toDoItem.isdone
      };
      updateTodo(toDoItem.todo_id, payload).then(() => {
        this.refreshTodo();
      });
    },
    editTodo(toDoItem) {
      this.dialogIitle = "Editing...";
      this.btnText = "Save";
      this.form.title = toDoItem.todo;
      this.edittingItem.todo_id = toDoItem.todo_id;
      this.edittingItem.isdone = toDoItem.isdone;
      this.openSimple = true;
    },
    deleteTodo(toDoItem) {
      const payload = {
        user: this.$store.getters.getUsername,
        todo: toDoItem.todo
      };
      removeTodo(toDoItem.todo_id, payload).then(() => {
        this.refreshTodo();
      });
    },
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    },
    openSimpleDialog() {
      this.dialogIitle = "Create a new to do...";
      this.btnText = "Add";
      this.openSimple = true;
    },
    closeSimpleDialog() {
      this.dialogIitle = "Create a new to do...";
      this.btnText = "Add";
      this.form.title = "";
      this.edittingItem.todo_id = "";
      this.edittingItem.isdone = "";
      this.openSimple = false;
    },
    submit() {
      if (this.btnText === "Add") {
        const payload = {
          user: this.$store.getters.getUsername,
          todo: this.form.title
        };
        addTodo(payload)
          .then(msg => {
            // eslint-disable-next-line
                  console.log(msg.data)
            this.refreshTodo();
            this.$parent.openAlert(msg.data.status, msg.data.status);
          })
          .catch(e => {
            if (e.response) {
              this.$parent.openAlert(
                e.response.data.status,
                e.response.data.data
              );
            }
          });
        this.closeSimpleDialog();
      } else {
        const payload = {
          user: this.$store.getters.getUsername,
          todo: this.form.title,
          isdone: this.edittingItem.isdone
        };
        updateTodo(this.edittingItem.todo_id, payload).then(() => {
          this.refreshTodo();
          this.closeSimpleDialog();
        });
      }
    },
    refreshTodo() {
      getTodo(this.$store.getters.getUsername)
        .then(result => {
          //eslint-disable-next-line
          console.log(result)
          if (result.data.data.length > 0) {
            this.toDoItems = result.data.data;
          }
        })
        .catch(e => {
          if (e.response) {
            this.$parent.openAlert(
              e.response.data.status,
              e.response.data.data
            );
          }
        });
    }
  },
  computed: {
    toDoItemsDone() {
      let done = [];
      for (var toDoItem of this.toDoItems) {
        toDoItem.isdone ? done.push(toDoItem) : "";
      }
      return done;
    },
    toDoItemsNotDone() {
      let notDone = [];
      for (var toDoItem of this.toDoItems) {
        !toDoItem.isdone ? notDone.push(toDoItem) : "";
      }
      return notDone;
    },
    open() {
      return this.$store.getters.getDrawerState;
    }
  },
  mounted() {
    this.refreshTodo();
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
