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

        console.log(result.data);
      } else {
        router.push({ name: "HomePage" });
      }
    },
    async deleteRes() {
      let result = await axios.delete(
        `http://localhost:3000/restaurent/${this.paramsRes}`
      );
      if (result.status == 200) {
        // setTimeout(() => {
        //   router.push({ name: "HomePage" });
        // },1000);
        router.push({ name: "HomePage" });
      } else {
        console.log("something went wrong");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// *{
//     overflow: hidden;
// }
button {
  margin: 0 0.5%;
}
</style>
