<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">
          Update Res N°{{ state.paramsRes }}
        </h2>
        <div class="card my-5">
          <form
            class="card-body cardbody-color p-lg-5"
            @submit.prevent="UpdateRestaurent"
          >
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="Username"
                aria-describedby="phoneHelp"
                placeholder="Restaurant Name"
                v-model="state.name"
              />
              <p v-if="v$.name.$error" class="text-danger mt-3">
                {{ v$.name.$errors[0].$message }}
              </p>
            </div>
            <div class="mb-3">
              <input
                type="tel"
                class="form-control"
                id="phone_number"
                aria-describedby="phoneHelp"
                placeholder="Phone Number"
                v-model="state.phone"
              />
              <p v-if="v$.phone.$error" class="text-danger mt-3">
                {{ v$.phone.$errors[0].$message }}
              </p>
            </div>

            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="adress"
                placeholder="adress"
                v-model="state.adress"
              />
              <p v-if="v$.adress.$error" class="text-danger mt-3">
                {{ v$.adress.$errors[0].$message }}
              </p>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Update Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";

import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import axios from "axios";
import router from "@/router";

export default {
  name: "UpdateRestaurent",
  data() {
    return {
      /// paramsRes:""
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");

    if (user) {
      this.state.userId = JSON.parse(user).id;
      this.state.paramsRes = this.$route.params.RestaurentId;
      this.accsessToRestaurent();
    } else {
      router.push({ name: "LoginPage" });
    }
  },
  setup() {
    const state = reactive({
      name: "",
      adress: "",
      phone: "",
      paramsRes: "",
      restaurentData:"" ,
      userId:""
    });
    // validation
    const rules = computed(() => {
      return {
        name: { required },
        adress: { required },

        phone: {
          required,
          maxLength: maxLength(8),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    let UpdateRestaurent = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        let response = await axios.put(`http://localhost:3000/restaurent/${state.paramsRes}`, {
          name: state.name,
          phone: state.phone,
          adress: state.adress,
          userId: state.userId,
        });

       
        if (response?.status == 200) {
         
          router.push({ name: "HomePage" });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { state, v$, UpdateRestaurent };
  },
  methods: {
   
    async accsessToRestaurent() {
      let result = await axios.get(
        `http://localhost:3000/restaurent?id=${this.state.paramsRes}&userId=${this.state.userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
         this.state.restaurentData = result.data;
         console.log(result.data)
        this.state.name =  this.state.restaurentData[0].name;
       
        this.state.adress =  this.state.restaurentData[0].adress;
        this.state.phone =  this.state.restaurentData[0].phone;

      
      }
    },
    
  },
};
</script>

<style></style>
