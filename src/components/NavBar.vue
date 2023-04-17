<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="#">Navbar</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="isUserLoggIn">
              <router-link
                class="nav-link active"
                aria-current="page"
                :to="{ name: 'HomePage', params: { pageTitle: 'Home page' } }"
                >Home</router-link
              >
            </li>

            <li class="nav-item" v-if="!isUserLoggIn">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isUserLoggIn">
              <router-link class="nav-link" to="/register"
                >Register</router-link
              >
            </li>
          </ul>
          <form class="d-flex" v-if="isUserLoggIn">
            <button class="btn btn-outline-success" @click="logout">
              logOut
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapState, mapMutations } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
     // loggedIn: false,
    };
  },
  computed: {
    ...mapState(["isUserLoggIn"])
     
  },
  mounted() {
    let user = localStorage.getItem("user-info");

    if (user) {
      //this.loggedIn = true;
      this.isUserLoggInFunction();
    } else {
      //this.loggedIn = false;
    }
    console.log(this.isUserLoggIn);
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["isUserLoggInFunction"]),
    logout() {
      localStorage.clear("user-info");
      this.$store.state.user = null;
      this.$router.push({ name: "LoginPage" });
      // this.redirectTo({ val: "LoginPage" });
    },
  },
};
</script>
