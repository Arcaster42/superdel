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
        <hr class="divider my-4" />
        <h1 class="text-black font-weight-bold">Welcome, {{user}}</h1>
        <hr class="divider my-4" />
      </div>
    </div>


<!-- USER Cart-->
<div class="cart">
  <b-list-group>
    <b-card bg-variant="dark" text-variant="white" title="Checkout">
      <b-card-text>
        Thank you for shopping with us, {{user}}!
        <div class="float-right">
        <b-button href="#" variant="primary" v-on:click="checkout">Checkout</b-button>
        </div>
      </b-card-text>
    </b-card>

     <b-list-group flush>
       <div v-for="(item, index) in cartItems" v-bind:key="index">
      <b-list-group-item variant="secondary" href="#">Product: {{  item }}
        <div>Quantity: {{computeCartQuantities[index] }}</div></b-list-group-item>
       </div>
    </b-list-group>
  </b-list-group>
</div>

<!-- USER ORDER Card-->
    <div class="options">


<!-- product nav-->
    <div class="options-nav">
      <b-nav pills fill>
        <b-nav-item v-bind:active="productView === 'Italian'" v-on:click="productView = 'Italian'">Italian</b-nav-item>
        <b-nav-item v-bind:active="productView === 'Japanese'" v-on:click="productView = 'Japanese'">Japanese</b-nav-item>
        <b-nav-item v-bind:active="productView === 'Basics'" v-on:click="productView = 'Basics'">Basics</b-nav-item>
      </b-nav>
    </div>

    <div v-if="productView==='Italian'">
    <b-card-group columns>
      <div v-for="(item, index) in groceryItems.italian" v-bind:key="index">
      <b-card
        :title="item.productTitle"
        :img-src="item.photo"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem; width: 100%"
        class="mb-2"
        :key="index"
      >
        <b-card-text>
          {{ item.productDetails}}
          <div>
            <b-card-text class="text-muted float-right" >${{item.productPrice}}</b-card-text>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary" v-on:click="addItem(item.productTitle)">Add to Cart</b-button>
      </b-card>
        </div>
    </b-card-group>
  </div>

  <div v-if="productView==='Japanese'">
    <b-card-group columns>
      <div v-for="(item, index) in groceryItems.japanese" v-bind:key="index">
      <b-card
        :title="item.productTitle"
        :img-src="item.photo"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem; width: 100%"
        class="mb-2"
        :key="index"
      >
        <b-card-text>
          {{ item.productDetails}}
          <div>
            <b-card-text class="text-muted float-right" >${{item.productPrice}}</b-card-text>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary" v-on:click="addItem(item.productTitle)">Add to Cart</b-button>
      </b-card>
        </div>
    </b-card-group>
  </div>
  
<div v-if="productView==='Basics'">
    <b-card-group columns>
      <div v-for="(item, index) in groceryItems.basics" v-bind:key="index">
      <b-card
        :title="item.productTitle"
        :img-src="item.photo"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem; width: 100%"
        class="mb-2"
        :key="index"
      >
        <b-card-text>
          {{ item.productDetails}}
          <div>
            <b-card-text class="text-muted float-right" >${{item.productPrice}}</b-card-text>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary" v-on:click="addItem(item.productTitle)">Add to Cart</b-button>
      </b-card>
        </div>
    </b-card-group>
  </div>
  </div>
  

</div>
</template>

<script>
import { mapState } from 'vuex'
import basil from '../assets/basil.jpeg'
import milk from '../assets/milk.jpeg'
import mozza from '../assets/mozza.jpeg'
import pasta from '../assets/pasta.jpeg'
import sauce from '../assets/sauce.jpeg'
import tomato from '../assets/tomato.jpeg'

export default {
  name: 'UserLandingPage',
  computed: {
    ...mapState(['user', 'driverSelectedOrders', 'driverMyOrders']),
    computeCartQuantities: function() {
      return this.cartQuantities
    }},
  data: () => ({
    cartItems: [],
    cartQuantities: [],
    productView: "Italian",
    groceryItems: {
      italian: [
      { productTitle: 'Milk', photo: milk, productDetails: 'poi', productPrice: 2.34},
      { productTitle: 'Mozarella', photo: mozza, productDetails: 'poi', productPrice: 2.35},
      { productTitle: 'Tomatoes', photo: tomato, productDetails: 'poi', productPrice: 2.36},
      { productTitle: 'Pasta', photo: pasta, productDetails: 'poi', productPrice: 2.37},
      { productTitle: 'Basil', photo: basil, productDetails: 'poi', productPrice: 2.38},
      { productTitle: 'Sauce', photo: sauce, productDetails: 'poi', productPrice: 2.38},
    ],
    basics: [
      { productTitle: 'Milk', photo: milk, productDetails: 'poi', productPrice: 2.34},
      { productTitle: 'Mozarella', photo: mozza, productDetails: 'poi', productPrice: 2.35},
      { productTitle: 'Tomatoes', photo: tomato, productDetails: 'poi', productPrice: 2.36},
      { productTitle: 'Pasta', photo: pasta, productDetails: 'poi', productPrice: 2.37},
      { productTitle: 'Basil', photo: basil, productDetails: 'poi', productPrice: 2.38},
      { productTitle: 'Sauce', photo: sauce, productDetails: 'poi', productPrice: 2.38}
    ],
    japanese: [
      { productTitle: '牛乳', photo: milk, productDetails: 'poi', productPrice: 2.34},
      { productTitle: 'Mozarella', photo: mozza, productDetails: 'poi', productPrice: 2.35},
      { productTitle: 'Tomatoes', photo: tomato, productDetails: 'poi', productPrice: 2.36},
      { productTitle: 'Pasta', photo: pasta, productDetails: 'poi', productPrice: 2.37},
      { productTitle: 'Basil', photo: basil, productDetails: 'poi', productPrice: 2.38},
      { productTitle: 'Sauce', photo: sauce, productDetails: 'poi', productPrice: 2.38}
    ]}
  }),
  methods: {
    itemClick: function(item) {
      console.log(item)
      this.$store.commit('selectOrder', item)
      this.isActive[item.key] = 1
    },
    checkout: function() {
      const itemObj = { itemArray: this.cartItems , quantitiesArray: this.cartQuantities}
      this.$store.commit('setCartItems', itemObj)
    },
    addItem: function(item) {
      if (this.cartItems.length) {
        for (let i = 0; i <this.cartItems.length; i++) {
          if (this.cartItems[i] === item) {
            this.cartQuantities.splice(i, 1, this.cartQuantities[i] + 1)
            break
          }
          else if (i === this.cartItems.length-1 && this.cartItems[i] !==item) {
            this.cartItems.push(item)
            this.cartQuantities.push(1)
            break
          }
        }
      }
      else {
        this.cartItems.push(item)
        this.cartQuantities.push(1)
      }
    }
  },
}
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
}

.options-nav{
  width: 100%;
  padding-bottom: 5vh;
}
</style>
