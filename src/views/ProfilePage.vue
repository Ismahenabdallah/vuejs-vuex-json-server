<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">My Profile</h2>
        <div class="card my-5">
          <form
            class="card-body cardbody-color p-lg-5"
            @submit.prevent="UpdateProfile"
          >
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="Username"
                aria-describedby="emailHelp"
                placeholder="User Name"
                v-model="state.name"
              />
              <p v-if="v$.name.$error" class="text-danger mt-3">
                {{ v$.name.$errors[0].$message }}
              </p>
            </div>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="email"
                v-model="state.email"
              />
              <p v-if="v$.email.$error" class="text-danger mt-3">
                {{ v$.email.$errors[0].$message }}
              </p>
            </div>

            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="password"
                v-model="state.pass"
              />
              <p v-if="v$.pass.$error" class="text-danger mt-3">
                {{ v$.pass.$errors[0].$message }}
              </p>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Update Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import router from "../router/index";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength /**helpers*/ } from "@vuelidate/validators";
import axios from "axios";
export default {
  mounted() {
    let user = localStorage.getItem("user-info");

    if (user) {
      this.state.name = JSON.parse(user).name;
      this.state.email = JSON.parse(user).email;
      this.state.pass = JSON.parse(user).password;
    } else {
      router.push({ name: "LoginPage" });
    }
  },
  setup() {
    const state = reactive({
      name: "",
      email: "",
      pass: "",
    });
    // validation
    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },

        pass: {
          minLength: minLength(6),
          required,
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    let UpdateProfile = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        // alert("passed");
        let response = await axios.post("http://localhost:3000/users", {
          name: state.name,
          email: state.email,
          password: state.pass,
        });
        console.log(response?.data);
        if (response?.status == 201) {
          localStorage.setItem("user-info", JSON.stringify(response.data));

          router.push({ name: "LoginPage" });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { state, v$, UpdateProfile };
  },
};
</script>

<style></style>
