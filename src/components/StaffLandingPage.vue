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
            <b-dropdown-item href="#" @click="$store.commit('staffPage', 'completed')">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="row align-items-center justify-content-center text-center">
      <div class="col-lg-10 align-self-end">
        <h1 class="text-black font-weight-bold">Welcome, ${Driver}</h1>
        <hr class="divider my-4" />
      </div>
      <!-- <div class="col-lg-8 align-self-baseline">
        <p class="text-white-75 mb-5">Available orders</p>
      </div>-->
    </div>

    <!-- ALL ORDERS -->
    <div v-if="driverView === 'all'">
      <b-col lg="4" class="pb-2">
        <b-button size="lg" @click="$store.commit('sendSelectedOrders', driverSelectedOrders)">SuperDel Selected Order(s)</b-button>
      </b-col>

      <b-list-group-item
        v-for="item in items"
        :key="item.key"
        href="#"
        class="flex-column align-items-start"
        :checked="itemClick(item)"
        variant="secondary"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{item.one}}</h5>
          <small class="text-muted">{{item.two}}</small>
        </div>
        <p class="mb-1">{{item.three}}</p>
        <small class="text-muted">{{item.four}}</small>
      </b-list-group-item>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "StaffLandingPage",
  computed: mapState(["driverView", "driverSelectedOrders", "driverMyOrders"]),
  data: () => ({
    items: [
      { key: 1, one: "qwer", two: "poi", three: "1234", four: "098^"},
      { key: 2, one: "owetjhwi3t", two: "poi", three: "1234", four: "098^"}
    ],
    selectedOrders: [],
  }),
  methods: {
    itemClick(item) {
      this.$store.commit('selectOrder', item)
    }
  }
};
</script>

<style scoped>
</style>
