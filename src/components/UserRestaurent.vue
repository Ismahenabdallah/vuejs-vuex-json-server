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
          <td>
            <router-link :to="{name:'DeleteRestaurent' , params:{RestaurentId :item.id}}"><button class="btn btn-danger">delete</button></router-link>
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
</style>
