<template>
  <div class="text-end divone">
    <h1>Welcome {{ user?.name }}</h1>
    <router-link to="/profile">
      <button class="btn text btn-success">Profile</button>
    </router-link>
    <br />
    <br />
    <div class="d-block">
      <add-new-restaurant></add-new-restaurant>
      <delete-all-restaurent
        :allRestaurent="listOfRestaurants"
      ></delete-all-restaurent>
    </div>
    <!-- {{ $store.state.user.name }}  -->
    <user-restaurent :allRestaurent="listOfRestaurants"></user-restaurent>
  </div>
</template>

<script>
import router from "@/router";

import AddNewRestaurant from "@/Restaurent/AddNewRestaurant.vue";
import axios from "axios";
import UserRestaurent from "@/Restaurent/UserRestaurent.vue";
import DeleteAllRestaurent from "@/Restaurent/DeleteAllRestaurent.vue";

export default {
  components: { AddNewRestaurant, UserRestaurent, DeleteAllRestaurent },
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
     
    }
    //http://localhost:3000/restaurent?userId=3
    let result = await axios.get(
      `http://localhost:3000/restaurent?userId=${this.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
     
      this.listOfRestaurants = result.data;
    }

  },

};
</script>

<style lang="scss" scoped>
.divone {
  margin-right: 10%;
}


</style>
