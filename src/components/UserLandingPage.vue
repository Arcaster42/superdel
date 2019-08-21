<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">SuperDel</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">All Orders</b-nav-item>
          <b-nav-item href="#">My Orders</b-nav-item>
          <b-nav-item href="#">Completed</b-nav-item>
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
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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

    <b-list-group-item href="#" class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">List group item heading</h5>
        <small class="text-muted">3 minutes ago</small>
      </div>
      <p class="mb-1">Egg, Milk, Tea</p>
      <small class="text-muted">¥3,500</small>
    </b-list-group-item>
  </div>
</template>

<script>
export default {
  name: "UserLandingPage"
};
</script>

<style scoped>
</style>
