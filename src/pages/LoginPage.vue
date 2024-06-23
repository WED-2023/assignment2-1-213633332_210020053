<template>
  <div class="login-container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin" class="form">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
        class="form-group"
      >
        <b-form-input
          id="Username"
          v-model.trim="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
          placeholder="Enter your username"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
        class="form-group"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model.trim="$v.form.password.$model"
          :state="validateState('password')"
          placeholder="Enter your password"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="login-btn"
      >
        Login
      </b-button>

      <div class="mt-2">
        Don't have an account yet?
        <router-link to="register"> Register here</router-link>
      </div>
    </b-form>

    <b-alert
      v-if="form.submitError"
      dismissible
      variant="danger"
      class="mt-3"
    >
      Login failed: {{ form.submitError }}
    </b-alert>

    <div class="mt-3">
      <p>For testing purposes, use the following credentials:</p>
      <p><strong>Username:</strong> sukuna</p>
      <p><strong>Password:</strong> sukuna1!</p>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import {mockLogin} from "../services/auth.js"
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        
        // const response = await this.axios.post(
        //   this.$root.store.server_domain +"/Login",


        //   {
        //     username: this.form.username,
        //     password: this.form.password
        //   }
        // );

        const credentials = {
          username: this.form.username,
          password: this.form.password,
        };

        const success = true; // Modify this to test the error handling
        const response = await mockLogin(credentials, success);

        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
        //this.$root.toast('Login Failed', err.response.data.message, 'danger');
      }
    },

    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    }
  }
};
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #80bebb;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.login-btn {
  width: 100%;
  background-color: #235351;

}

mt-2 {
  color: #333;
}

</style>