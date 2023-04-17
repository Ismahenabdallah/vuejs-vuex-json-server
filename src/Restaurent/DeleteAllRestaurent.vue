<template>
  <div class="text-start ml-5 left" v-if="AllRestaurentId.length>1">
    <button type="button" class="btn btn-danger" @click="deleteALLRes()">
      Delete All Restaurants
    </button>
    <div
      v-if="successMessage.length > 0"
      class="col-auto m-4 -block mx-auto alert alert-success"
    >
      {{ successMessage }}
    </div>
    <div
      v-if="errorMessage.length > 0"
      class="col-auto d-block mx-auto alert alert-danger"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
  name: "DeleteAllRestaurent",
  props: ["allRestaurent"],
  data() {
    return {
      userId: "",
      AllRestaurentId: [],
      successMessage: "",
      errorMessage: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      router.push({ name: "LoginPage" });
    } else {
      this.userId = JSON.parse(user).id;
     
    }

    let result = await axios.get(
      `http://localhost:3000/restaurent?userId=${this.userId}`
    );

    let resultLength = result.data.length;
    for (let i = 0; i < resultLength; i++) {
      this.AllRestaurentId.push(result.data[i].id);
    }
    // console.table(this.AllRestaurentId);
  },
  methods: {
    async deleteALLRes() {
      let allResult = [];
      alert("are you sure you want to delete all  restaurents?");
      for (let i = 0; i < this.AllRestaurentId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/restaurent/${this.AllRestaurentId[i]}`
        );

        if (result.status == 200) {
          allResult.push("true");
          this.successMessage = "Deleted successfully";
          this.errorMessage = "";

          window.location.reload();
          //router.push({ name: "HomePage" });
        } else {
          this.successMessage = "";

          allResult.push("false");
          this.errorMessage = "Something went wrong";
        }
      }
      console.table(allResult);
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  margin: 20px;
  text-align: start;
}
</style>
