<template>
  <div class="hero">
    <b-navbar class="nav" toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <img src="../assets/logo.png" alt="" height="50px" width="50px">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click="$store.commit('staffPage', 'all')">All Orders</b-nav-item>
          <b-nav-item href="#" @click="$store.commit('staffPage', 'my')">My Orders</b-nav-item>
          <b-nav-item href="#" @click="$store.commit('staffPage', 'completed')">Completed</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">JP</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="$store.commit('leaveStaffPage', 'Login')">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="row align-items-center justify-content-center text-center">
      <div class="col-lg-10 align-self-end">
        <hr class="divider my-4" />
        <h1 class="text-white font-weight-bold">Welcome, Driver!</h1>
        <hr class="divider my-4" />
      </div>
    </div>


    <div class="cart">
  <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
    <GmapMap
        :center="{lat:35.682457, lng:139.754403}"
        :zoom="12"
        style="width:100%;  height: 60vh;"
        :options="{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }"
      >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="false"
        :draggable="false"
        @click="center=m.position"
      />
      </GmapMap>
  </b-jumbotron>
</div>

    <!-- ALL ORDERS -->
    <div class="options">
    <div v-if="driverView === 'all'">
      <div class="order-container">
        <div
            v-for="item in this.$store.state.openOrderedItems"
            :key="item.id"
            href="#"
            class="flex-column align-items-start"
        >
            <OrderItem :item="item"/>
        </div>
      </div>
      <b-col lg="4" class="pb-2">
        <b-button size="lg" @click="$store.commit('sendSelectedOrders', driverSelectedOrders)">Take Order(s)</b-button>
      </b-col>
    </div>


    <!-- MY ORDERS -->
    
    <div v-if="driverView === 'my'">
      <div class="my-order-container">
        <b-list-group-item
          v-for="item in driverMyOrders"
          :key="item.key"
          href="#"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Ordered by: {{item.purchaser}}</h5>
            <small class="text-muted">￥{{item.price}}</small>
          </div>
          <p class="mb-1">Order Filled: {{item.fulfilled}}</p>
        </b-list-group-item>
      </div>
    </div>


    <!-- COMPLETED ORDERS -->
    <div v-if="driverView === 'completed'">
    <b-list-group-item
      href="#"
      class="flex-column align-items-start"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">ONE</h5>
        <small class="text-muted">3 minutes ago</small>
      </div>
      <p class="mb-1">Egg, Milk, Tea</p>
      <small class="text-muted">¥3,500</small>
    </b-list-group-item>
    <b-list-group-item
      v-if="driverView === 'completed'"
      href="#"
      class="flex-column align-items-start"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">TWO</h5>
        <small class="text-muted">3 minutes ago</small>
      </div>
      <p class="mb-1">Egg, Milk, Tea</p>
      <small class="text-muted">¥3,500</small>
    </b-list-group-item>
  </div>

  </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios';
import OrderItem from './OrderItem';

export default {
  name: "StaffLandingPage",
  components: {
    OrderItem
  },
  computed: mapState(["driverView", "driverSelectedOrders", "driverMyOrders"]),
  mounted: async function() {
    await axios.get('/api/orders')
    .then((response) => {
      this.$store.commit("changeOpenOrderedItems", response.data)
      // console.log("open orders", this.$store.state.openOrderedItems)
    })
  },
  data: () => ({
    items: [],
    // [
    //   { id: 35,
    // purchaser: 'test@gmail.com',
    // staff: 'none',
    // fulfilled: false,
    // price: 350 },
    // { id: 36,
    // purchaser: 'test@gmail.com',
    // staff: 'none',
    // fulfilled: false,
    // price: 575 }
    // ],
    selectedOrders: [],
    isActive: {},
    addresses: [' 6 Chome-11-1 Roppongi, Minato City, Tokyo 106-6108', 
    'B2 Vort, 3 Chome-1-35 Motoazabu, Minato City, Tokyo 106-0046',
    '1 Chome-14-1 Tamagawa, Setagaya City, Tokyo 158-0094',
    '1 Chome-3-61 Koraku, Bunkyo City, Tokyo 112-0004',
    '1 Chome-3-3 Motoazabu, Minato City, Tokyo 106-0046' ],
    markers: [
    {position: {lat: 35.705572, lng: 139.751878}}, 
    {position: {lat: 35.678634, lng: 139.76532}},
    {position: {lat: 35.659842, lng: 139.740922}},
    {position: {lat: 35.662457, lng: 139.732618}},
    {position: {lat: 35.660783, lng: 139.707985}},
    {position: {lat: 35.675287, lng: 139.706783}},
    {position: {lat: 35.699407, lng: 139.727554}},
    {position: {lat: 35.691322, lng: 139.805832}},
    {position: {lat: 35.699686, lng: 139.832611}},
    {position: {lat: 35.608918, lng: 139.630823}}
    ],
  }),
  methods: {
    getOrderItems: function () {
  //     axios.get('/api/orders')
        
      },
    }
};
</script>

<style scoped>
html body {
  height: auto;
  width: 100%;
}
.hero {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.5), 
    rgba(0, 0, 0, 0.5)), 
    url("../assets/staffLandingPage.jpeg");
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
  position: relative;
  background-attachment: fixed;
  height: 130%;
}
.options{
  width: 50%;
  float: left;
  height:100vh;
}
.cart {
  width:50%;
  float: right;
  padding-left: 5vw;
  padding-right: 5vw;
}
.order-container, .my-order-container {
  /* display: flex; */
  /* position: relative; */
  /* bottom: 100px; */
  max-height: 625px;
  /* height: auto; */
  width: 500px;
  overflow: auto;
  padding: 13px;
  border-radius: 8px;
  margin-bottom: 10px; 
  margin-left: 15px;
  background: #16a2b8;
  /* justify-self: flex-start; */
}
gmap {
  width: 200px;
  height: 200px;
}
.logo {
  background-image: 
    url("../assets/staffLandingPage.jpeg");
}
.text-white{
  font-size: 40px;
}


</style>
