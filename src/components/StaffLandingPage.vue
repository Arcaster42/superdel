<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">SuperDel</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click="$store.commit('staffPage', 'all')">All Orders</b-nav-item>
          <b-nav-item href="#" @click="$store.commit('staffPage', 'my')">My Orders</b-nav-item>
          <b-nav-item href="#" @click="$store.commit('staffPage', 'completed')">Completed</b-nav-item>
          <b-nav-item href="#">Map</b-nav-item>
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
        <h1 class="text-black font-weight-bold">Welcome, ${Driver}</h1>
        <hr class="divider my-4" />
      </div>
    </div>


    <div class="cart">
  <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
    <GmapMap
        :center="{lat:35.682457, lng:139.754403}"
        :zoom="12"
        map-type-id="terrain"
        style="width:300px; height:300px;"
      >
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      /> -->
      </GmapMap>
  </b-jumbotron>
</div>

    <!-- ALL ORDERS -->
    <div class="options">
    <div v-if="driverView === 'all'">
      <b-col lg="4" class="pb-2">
        <b-button size="lg" @click="$store.commit('sendSelectedOrders', driverSelectedOrders)">SuperDel Selected Order(s)</b-button>
      </b-col>

      <div
            v-for="item in items"
            :key="item.id"
            href="#"
            class="flex-column align-items-start"
        >
            <OrderItem :item="item"/>
        </div>

    </div>


    <!-- MY ORDERS -->
    
    <div v-if="driverView === 'my'">
      <b-list-group-item
        v-for="item in driverMyOrders"
        :key="item.key"
        href="#"
        class="flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{item.one}}</h5>
          <small class="text-muted">{{item.two}}</small>
        </div>
        <p class="mb-1">{{item.three}}</p>
        <small class="text-muted">{{item.four}}</small>
      </b-list-group-item>
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
    const APIKEY="AIzaSyBJe_XQPh2vCGMUFZHeNclj2enU5xN9aOE"
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid='+ 
item + '&key=${APIKEY}`)
   .then(response => this.setState({placeId:response.data}))
   .catch(err => {
     console.log(err)                     //Axios entire error message
     console.log(err.response.data.error) //Google API error message 
   })

   await axios.get('/api/orders')
    .then((response) => {
      this.$store.state.openOrderedItems = response.data
      // console.log("open orders", this.$store.state.openOrderedItems)
    })

  },
  data: () => ({
    items: 
    this.$store.state.openOrderedItems,
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
    geolocation: [{latitude: 35.705572, longitude: 139.751878}, 
    {latitude: 35.678634, longitude: 139.76532},
    {latitude: 35.659842, longitude: 139.740922},
    {latitude: 35.662457, longitude: 139.732618},
    {latitude: 35.660783, longitude: 139.707985},
    {latitude: 35.675287, longitude: 139.706783},
    {latitude: 35.699407, longitude: 139.727554},
    {latitude: 35.691322, longitude: 139.805832},
    {latitude: 35.699686, longitude: 139.832611},
    {latitude: 35.608918, longitude: 139.630823}],
  }),
  methods: {
    getOrderItems: function () {
  //     axios.get('/api/orders')
        
      },
    }
};
</script>

<style scoped>
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
gmap {
  width: 200px;
  height: 200px;
}
</style>
