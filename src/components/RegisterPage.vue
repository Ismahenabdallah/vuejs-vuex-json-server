<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Regiseter Form</h2>
        <div class="card my-5">
          <form
            class="card-body cardbody-color p-lg-5"
            @submit.prevent="register"
          >
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
                Register
              </button>
            </div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">
              already haven an account
              <router-link to="/login" class="text-dark fw-bold">
                Login</router-link
              >

              <button @click="RouteSinGinPage()">Login Function</button>
              <button @click="redirectTo({ val: 'LoginPage' })">
                Login vuex
              </button>
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
import router from "../router/index";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength /**helpers*/ } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "RegisterPage",

  //composition Api
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

    let register = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        // alert("passed");
        let response = await axios.post("http://localhost:3000/users", {
          name: state.name,
          email: state.email,
          pass: state.pass,
        });
      
        if (response?.status == 201) {
          localStorage.setItem("user-info", JSON.stringify(response.data));

          router.push({ name: "LoginPage" });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { state, v$, register };
  },
  date() {
    return {
      // v$: useValidate(),
      // email: "",
      // name: "",
      // pass: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    
    if (user) {
      router.push({ name: "HomePage" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  

    RouteSinGinPage() {
      this.redirectTo({ val: "LoginPage" });
    },
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
