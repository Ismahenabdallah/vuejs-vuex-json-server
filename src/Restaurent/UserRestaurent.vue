<template>
  <div class="left text-capitalize">
    <table
      class="table table-striped table-hover"
      v-if="allRestaurent.length > 0"
    >
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">adress</th>
          <th scope="col">phone</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in allRestaurent" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.adress }}</td>
          <td>{{ item.phone }}</td>
          <td class="text-capitalize">
            <router-link
              :to="{
                name: 'DeleteRestaurent',
                params: { RestaurentId: item.id },
              }"
              ><button
                style="margin-right: 10px"
                class="text-capitalize btn btn-danger"
              >
                delete
              </button></router-link
            >
            <router-link
              :to="{
                name: 'UpdateRestaurent',
                params: { RestaurentId: item.id },
              }"
              ><button
                style="margin-right: 10px"
                class="text-capitalize btn btn-warning"
              >
                update
              </button></router-link
            >
            <router-link
              :to="{ name: 'MenuPage', params: { RestaurentId: item.id } }"
              ><button class="text-capitalize btn btn-success">
                menu
              </button></router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-warning">No Restaurent Added for you !</div>
  </div>
</template>

<script>
export default {
  name: "UserRestaurent",
  props: ["allRestaurent"],
};
</script>

<style lang="scss" scoped>
.left {
  margin-left: 20px;
  text-align: start;
  margin-top: 5%;
}
table{
  
  text-align: center;
  margin-left: 20vh;
  width:75%;



}
</style>
