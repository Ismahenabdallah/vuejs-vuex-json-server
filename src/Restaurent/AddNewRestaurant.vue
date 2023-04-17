<template>
  <div class="left">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Add New Restaurant
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">New Restaurant</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="card-body cardbody-color p-lg-5" @submit.prevent>
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
                <!-- <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                  Add Now
                </button> -->
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              @click="AddNewRestaurent()"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </div>
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
  name: "AddNewRestaurant",
  data() {
    return {
      // userId: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");

    if (user) {
      this.state.userId = JSON.parse(user).id;
     
    } else {
      router.push({ name: "LoginPage" });
    }
  },
  setup() {
    const state = reactive({
      name: "",
      adress: "",
      phone: "",
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

    let AddNewRestaurent = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        let response = await axios.post(`http://localhost:3000/restaurent`, {
          name: state.name,
          phone: state.phone,
          adress: state.adress,
          userId: state.userId,
        });

     
        if (response?.status == 201) {
          window.location.reload();
          router.push({ name: "HomePage" });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { state, v$, AddNewRestaurent };
  },
};
</script>

<style lang="scss" scoped>
.left {
  margin-left: 20px;
  text-align: start;
}
</style>
