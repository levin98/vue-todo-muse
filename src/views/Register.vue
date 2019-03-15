<template>
  <div>
    <mu-paper class="register-container" :z-depth="5">
      <h1>Register</h1>
      <mu-form
        ref="form"
        :model="registerForm"
        :label-position="labelPosition"
        class="login-form"
      >
        <mu-form-item label="Username" prop="username" :rules="usernameRules">
          <mu-text-field
            v-model="registerForm.username"
            prop="username"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="Password" prop="password" :rules="passwordRules">
          <mu-text-field
            type="password"
            v-model="registerForm.password"
            prop="password"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">Sign Up</mu-button>
          <mu-button @click="clear">Reset</mu-button>
        </mu-form-item>
      </mu-form>
      <router-link to="/login">
        <mu-button color="primary" flat>Sign In</mu-button>
      </router-link>
    </mu-paper>
    <Alert
      :color="this.alertBox.color"
      :message="this.alertBox.message"
      :icon="this.alertBox.icon"
      :open="this.alertBox.open"
      @close-alert="closeAlert"
    />
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import { registerUser } from "../../api";

export default {
  name: "register",
  components: {
    Alert
  },
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "Username must be filled in" },
        {
          validate: val => val.length >= 3,
          message: "Username length greater than 3"
        }
      ],
      passwordRules: [
        { validate: val => !!val, message: "Password must be filled in" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "Password length must be greater than 3 and less than 10"
        }
      ],
      labelPosition: "top",
      registerForm: {
        username: "",
        password: ""
      },
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
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          const payload = {
            user: this.registerForm.username,
            password: this.registerForm.password
          };
          registerUser(payload)
            .then(msg => {
              this.openAlert(msg.data.status, msg.statusText);
            })
            .catch(e => {
              this.openAlert(e.response.data.status, e.response.data.data);
              //eslint-disable-next-line
              console.log(e.response)
            });
        } else {
          return false;
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.registerForm = {
        username: "",
        password: ""
      };
    },
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

<style scoped>
.register-container {
  height: 50%;
  width: 50%;
  top: 25%;
  left: 25%;
  padding: 5%;
  position: fixed;
  border-radius: 5px;
}

div /deep/ .mu-form-item-label {
  text-align: left;
}
</style>
