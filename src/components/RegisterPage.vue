<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Regiseter Form</h2>
        <div class="card my-5">
          <form class="card-body cardbody-color p-lg-5">
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
                v-model="name"
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="email"
                v-model="email"
              />
            </div>

            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="password"
                v-model="pass"
              />
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
              <button @click="redirectTo({ val: 'RegisterPage' })">
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
export default {
  name: "RegisterPage",
  date() {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),

    RouteSinGinPage() {
      this.$router.push({ name: "LoginPage" });
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
