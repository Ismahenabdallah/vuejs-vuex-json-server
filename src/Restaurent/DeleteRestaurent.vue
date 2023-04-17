<template>
  <div class="text-capitalize container">
    <form action="" @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <h1>Delete This Raustrant #{{ paramsRes }}</h1>
          <p class="text-danger">
            are you sure you want to delete this Raustrant
          </p>
          {{ name }}
          <br />
          {{ adress }}
          <br />
          {{ phone }}
          <br />
        </div>
      </div>
      <div class="align-items-center">
        <div class="col-2 d-flex"></div>
        <button class="btn btn-info" @click="goBack()">Go Back</button>
        <button class="btn btn-danger" @click="deleteRes()">Delete Now</button>
      </div>
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
    </form>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
  name: "DeleteRestaurent",
  data() {
    return {
      name: "",
      adress: "",
      phone: "",
      userId: "",
      paramsRes: "",
      restaurentData: [],
      successMessage: "",
      errorMessage: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      router.push({ name: "LoginPage" });
    } else {
      this.paramsRes = this.$route.params.RestaurentId;
      this.userId = JSON.parse(user).id;
      this.accsessToRestaurent();
    }
  },

  methods: {
    goBack() {
      router.push({ name: "HomePage" });
    },
    async accsessToRestaurent() {
      let result = await axios.get(
        `http://localhost:3000/restaurent?id=${this.paramsRes}&userId=${this.userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.restaurentData = result.data;
        this.name = this.restaurentData[0].name;
        this.adress = this.restaurentData[0].adress;
        this.phone = this.restaurentData[0].phone;

      } else {
        router.push({ name: "HomePage" });
      }
    },
    async deleteRes() {
      let result = await axios.delete(
        `http://localhost:3000/restaurent/${this.paramsRes}`
      );
      if (result.status == 200) {
        this.successMessage = "Deleted successfully";
        this.errorMessage = "";
        setTimeout(() => {
          router.push({ name: "HomePage" });
        }, 1000);
      } else {
        this.successMessage = "";
     
        this.errorMessage = "Something went wrong";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
*{
  text-align: center;

}
button {
  margin: 0 0.5%;
}
</style>
