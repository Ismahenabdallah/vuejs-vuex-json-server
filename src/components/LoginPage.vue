<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Login Form</h2>

        <div class="text-danger p-4">
          {{ state.userFound }}
        </div>

        <div class="card my-5">
          <form @submit.prevent="login" class="card-body cardbody-color p-lg-5">
            <div class="text-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px"
                alt="profile"
              />
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
                Login
              </button>
            </div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">
              Not Registered?
              <router-link to="/register" class="text-dark fw-bold">
                Create an Account</router-link
              >
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength /**helpers*/ } from "@vuelidate/validators";
import router from "@/router";
import axios from "axios";

export default {
  name: "LoginPage",

  setup() {
    //data
    const state = reactive({
      email: "",
      pass: "",
      userFound: "",
    });

    const rules = computed(() => {
      return {
        email: { required, email },

        pass: {
          minLength: minLength(6),
          required,
          // containsPasswordRequirement: helpers.withMessage(
          //   () =>
          //     "The password requires an uppercase, lowercase, number and special character",
          //   (value) =>
          //     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
          //       value.toString()
          //     )
          // ),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    let login = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        // alert("passed");
        let response = await axios.get(
          `http://localhost:3000/users?email=${state.email}&pass=${state.pass}`
        );
        // console.log(response);
        if (response.status == 200 && response.data.length > 0) {
          localStorage.setItem("user-info", JSON.stringify(response.data[0]));
          localStorage.getItem("user-info");
          //this.$store.state.user = JSON.parse(response.data[0]);
          //this.saveUser(JSON.parse(response.data[0]));
          router.push({ name: "HomePage" });
          console.log(response.data);
        } else {
          state.userFound = "User not found";
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { state, v$, login };
  },
  date() {
    return {};
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    console.log(user);
    if (user) {
      router.push({ name: "HomePage" });
    }
  },
  methods: {
    ...mapActions(["saveUser"]),
  },
};
</script>

<style>
.btn-color {
  background-color: #0e1c36;
  color: #fff;
}

.profile-image-pic {
  height: 200px;
  width: 200px;
  object-fit: cover;
}

.cardbody-color {
  background-color: #ebf2fa;
}

a {
  text-decoration: none;
}
</style>
