<template>
  <div class="text-end divone">
    <h1>Welcome {{ user?.name }}</h1>
    <router-link to="/profile">
      <button class="btn text btn-success">Profile</button>
    </router-link>
    <br />
    <br />
    <add-new-restaurant></add-new-restaurant>
    <!-- {{ $store.state.user?.name }}  -->
    <user-restaurent :allRestaurent="listOfRestaurants"></user-restaurent>
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";
import AddNewRestaurant from "@/components/AddNewRestaurant.vue";
import axios from "axios";
import UserRestaurent from "@/components/UserRestaurent.vue";

export default {
  components: { AddNewRestaurant, UserRestaurent },
  name: "HomePage",
  data() {
    return {
      user: {},
      listOfRestaurants: [],
      userId: "",
    };
  },

  async mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      router.push({ name: "LoginPage" });
    } else {
      this.user = JSON.parse(user);

      this.userId = this.user.id;
      console.log(this.userId, "userId Connected");
    }
    //http://localhost:3000/restaurent?userId=3
    let result = await axios.get(
      `http://localhost:3000/restaurent?userId=${this.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      console.log(result.data);
      this.listOfRestaurants = result.data;
    }

    console.log(this.listOfRestaurants);
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
