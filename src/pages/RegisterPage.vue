<template>
  <div class="register-container">
    <h1 class="title">Register</h1>
    <div class="form-container">
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset" class="form">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
        class="form-group"
      >
        <b-form-input
          id="username"
          v-model.trim="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
          placeholder="Enter your username"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username should only contain alphabetic characters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstname"
        class="form-group"
      >
        <b-form-input
          id="firstname"
          v-model.trim="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
          placeholder="Enter your first name"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastname"
        class="form-group"
      >
        <b-form-input
          id="lastname"
          v-model.trim="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
          placeholder="Enter your last name"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
        class="form-group"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
          placeholder="Select your country"
        ></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.country.required">
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
        class="form-group"
      >
        <b-form-input
          id="password"
          type="password"
          v-model.trim="$v.form.password.$model"
          :state="validateState('password')"
          placeholder="Enter your password"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text
          v-else-if="$v.form.password.$error"
          text-variant="info"
        >
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="!$v.form.password.length"
        >
          Password length should be between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.hasNumber"
        >
          Password should contain at least 1 number
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.hasSpecialChar"
        >
          Password should contain at least 1 special character
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
        class="form-group"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model.trim="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
          placeholder="Confirm your password"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password does not match
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
        class="form-group"
      >
        <b-form-input
          id="email"
          v-model.trim="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
          placeholder="Enter your email"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.email.email">
          Please enter a valid email address
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="outline-danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75 register-button"
      >
        Register
      </b-button>

      <div class="mt-2">
        Already have an account?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>

    <b-alert
      v-if="form.submitError"
      dismissible
      variant="danger"
      class="mt-3"
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</div>
</template>


<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
import { register } from "../services/auth.js";
import users_details from '../assets/mocks/registered_users.json';
import axios from 'axios'; // Import axios


export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
      users_details_data: users_details
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      
        // isUnique: function(value) {
        //   return !usernames_data.includes(value);
        // }
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        hasNumber: (p) => /\d/.test(p),
        hasSpecialChar: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const userDetails = {
          username: this.form.username,
          firstname: this.form.firstName,
          lastname: this.form.lastName,
          country: this.form.country,
          password: this.form.password,
          email: this.form.email
        };

        console.log("This is line 294 just before we call the response const");
        console.log(userDetails.username); // Directly access the properties
        console.log(userDetails.email);

        const response = await register(userDetails);
        
        console.log(response.data);
        console.log(response.data.message);



      if (response.status === 409) {
        this.$root.toast("Duplicate Username", response.response.data.message, "danger");
      } else {
        this.$router.push("/login");
      }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message || "An error occurred during registration.";
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.register-container {
  max-width: 500px;
  margin: auto;
}

.form-container {
  border: 1px solid #80bebb;
  border-radius: 10px;
  padding: 20px;
  background-color: #80bebb;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.title {
  text-align: center;
}

.ml-5 {
  margin-left: 5rem;
}

.w-75 {
  width: 75%;
}

.mt-2 {
  margin-top: 1rem;
}

.mt-3 {
  margin-top: 1.5rem;
}

.outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.w-100 {
  width: 100%;
}

.register-button{
  background-color: #235351;
}

.register-button:hover{
  background-color: #8BDFE0;
}
</style>