<template>
  <div class="container mt-5">
    <router-link
    
      :to="{ name: 'AddNewCategories', param: { RestaurentId :restaurentId} }"
    >
      <button class="float-start btn btn-success">View/Add Categories</button>
    </router-link>
    <button class="float-end btn btn-success" v-if="numofCategories > 0">
      Add Items
    </button>
    <div class="clearfix"></div>
  </div>
</template>

<script>
//import router from "@/router";
import { mapMutations, mapState } from "vuex";
export default {
  name: "MenuPage",
  data() {
    return {
      restaurentId: "",
    };
  },
  computed: {
    ...mapState(["user", "LoggedUserId", "ListCategories", "numofCategories"]),
  },
  async mounted() {
    // let user = localStorage.getItem("user-info");

    // if (!user) {
    //   router.push({ name: "LoginPage" });}
    console.log( this.restaurentId);
    this.restaurentId = this.$route.params.RestaurentId;
    console.log()
    if (this.user) {
      this.restaurentId = this.$route.params.RestaurentId;
      this.displayAllCategories({
        userIdPayload: this.LoggedUserId,
        restaurentIdPayload: this.restaurentId,
      });
    }
  },
  methods: {
    ...mapMutations(["displayAllCategories"]),
  },
};
</script>

<style lang="scss" scoped>
.clearfix:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  font-size: 0;
  height: 0;
}

.clearfix {
  display: inline-block;
  _height: 1%;
}
</style>
