<template>
  <div class="text-end divone">
    <h1>Welcome {{ user?.name }}</h1>
    <router-link to="/profile">
      <button class="btn text btn-success">Profile</button>
    </router-link>
    <!-- {{ $store.state.user?.name }}  -->
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";
export default {
  name: "HomePage",
  data() {
    return {
      user: {},
    };
  },

  mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      router.push({ name: "LoginPage" });
    } else {
      this.user = JSON.parse(user);
    }
  },
  computed: {
    ...mapGetters(["getUser , getone"]),
  },
};
</script>

<style lang="scss" scoped>
.divone {
  margin-right: 10%;
}
</style>
