<template>
  <mu-paper class="login-container" :z-depth="5">
    <h1>Login</h1>
    <mu-form
      ref="form"
      :model="loginForm"
      :label-position="labelPosition"
      class="login-form"
    >
      <mu-form-item label="Username" prop="username" :rules="usernameRules">
        <mu-text-field
          v-model="loginForm.username"
          prop="username"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item label="Password" prop="password" :rules="passwordRules">
        <mu-text-field
          type="password"
          v-model="loginForm.password"
          prop="password"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item>
        <mu-button color="primary" @click="submit">Sign In</mu-button>
        <mu-button @click="clear">Reset</mu-button>
      </mu-form-item>
    </mu-form>
    <router-link to="/register">
      <mu-button color="primary" flat>Sign Up</mu-button>
    </router-link>
  </mu-paper>
</template>

<script>
import { login } from "../../api";

export default {
  name: "login",
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
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          const payload = {
            user: this.loginForm.username,
            password: this.loginForm.password
          };
          login(payload)
            .then(msg => {
              // eslint-disable-next-line
                console.log(msg.data)
              this.$parent.openAlert(msg.data.status, msg.data.data);
              if (msg.data.status === "success") {
                this.$store.dispatch("login", {
                  username: payload.user
                });
                this.$router.push("/");
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
        } else {
          return false;
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.loginForm = {
        username: "",
        password: ""
      };
    }
  }
};
</script>

<style scoped>
.login-container {
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
