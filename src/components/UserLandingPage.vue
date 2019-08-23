<template>
  <div class="hero">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <img src="../assets/logo.png" alt="" height="50px" width="50px">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click="$store.commit('staffPage', 'all')">All Products</b-nav-item>
          <b-nav-item href="#" @click="$store.commit('staffPage', 'my')">My Orders</b-nav-item>
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
        <h1 class="text-black font-weight-bold">Welcome, {{user.first_name}}</h1>
        <hr class="divider my-4" />


        <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
          <h2 class="alert-heading">Success!</h2>
      Checkout Received! You will receive a message when a driver accepts. Thank you!
    </b-alert>

    <b-alert v-model="showDismissibleAlertFail" variant="success" dismissible>
          <h2 class="alert-heading">Success!</h2>
      Checkout Received! You will receive a message when a driver accepts. Thank you!
    </b-alert>


      </div>
    </div>


<!-- USER Cart-->
<div class="cart">
  <b-list-group>
    <b-card bg-variant="dark" text-variant="white" title="Checkout">
      <b-card-text>
        Thank you for shopping with us, {{user.first_name}}!
        <b-card-text class="text-muted" >Total: {{this.cartTotal}}</b-card-text>
        <div class="float-right">
        <b-button href="#" variant="primary" @click="checkout">Checkout</b-button>
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


<!-- product nav-->
    <div class="options-nav">
      <b-nav pills fill>
        <b-nav-item :active="productView === 'Italian'" @click="productView = 'Italian'">Italian</b-nav-item>
        <b-nav-item :active="productView === 'Japanese'" @click="productView = 'Japanese'">Japanese</b-nav-item>
        <b-nav-item :active="productView === 'Basics'" @click="productView = 'Basics'">Basics</b-nav-item>
      </b-nav>
    </div>

<!-- USER ORDER Card-->
    <div class="options">
<!-- USER ORDER Italian-->
    <div class="product-view" v-if="productView==='Italian'">
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
            <b-card-text class="text-muted float-right" >¥{{item.productPrice}}</b-card-text>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary" v-on:click="addItem(item)">Add to Cart</b-button>
      </b-card>
        </div>
    </b-card-group>
  </div>

<!-- USER ORDER Japanese-->
  <div class="product-view" v-if="productView==='Japanese'">
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
            <b-card-text class="text-muted float-right" >￥{{item.productPrice}}</b-card-text>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary" v-on:click="addItem(item)">Add to Cart</b-button>
      </b-card>
        </div>
    </b-card-group>
  </div>
  
  <!-- USER ORDER Basics-->
<div class="product-view" v-if="productView==='Basics'">
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
            <b-card-text class="text-muted float-right" >¥{{item.productPrice}}</b-card-text>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary" v-on:click="addItem(item)">Add to Cart</b-button>
      </b-card>
        </div>
    </b-card-group>
  </div>
  </div>
  

</div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import basil from '../assets/basil.jpeg'
import milk from '../assets/milk.jpeg'
import mozza from '../assets/mozza.jpeg'
import pasta from '../assets/pasta.jpeg'
import sauce from '../assets/sauce.jpeg'
import tomato from '../assets/tomato.jpeg'

import eggs from '../assets/eggs.jpg'
import olive from '../assets/olive.jpg'
import pepper from '../assets/pepper.jpg'
import rice from '../assets/rice.jpeg'
import water from '../assets/water.jpg'
import salt from '../assets/salt.jpeg'

import bulldog from '../assets/bulldog.jpeg'
import miso from '../assets/miso.jpg'
import seaweed from '../assets/seaweed.jpeg'
import tea from '../assets/tea.png'
import tofu from '../assets/tofu.jpeg'
import natto from '../assets/natto.jpg'

export default {
  name: 'UserLandingPage',
  computed: {
    ...mapState(['user', 'driverSelectedOrders', 'driverMyOrders']),
    computeCartQuantities: function() {
      return this.cartQuantities
    },
    },
  data: () => ({
    cartItems: [],
    cartQuantities: [],
    cartPrices: [],
    cartTotal: 0,
    productView: "Italian",
    groceryItems: {
      italian: [
      { productTitle: 'オリブオイル', photo: olive, productDetails: 'Straight from Italy', productPrice: 500},
      { productTitle: 'チーズ', photo: mozza, productDetails: 'Fresh Italian Mozzarella', productPrice: 800},
      { productTitle: 'トマト', photo: tomato, productDetails: 'Juicy Heirloom Tomatoes', productPrice: 150},
      { productTitle: 'パスタ', photo: pasta, productDetails: 'Organic Wheat Pasta', productPrice: 300},
      { productTitle: 'バジル', photo: basil, productDetails: 'Fresh Milanese Basil', productPrice: 25},
      { productTitle: 'トマトソース', photo: sauce, productDetails: 'Organic Basil Tomato Sauce', productPrice: 500},
    ],
    basics: [
      { productTitle: '卵', photo: eggs, productDetails: 'Free Range Organic', productPrice: 150},
      { productTitle: '牛乳', photo: milk, productDetails: 'Local Organic Whole Milk', productPrice: 180},
      { productTitle: 'お米', photo: rice, productDetails: 'Fresh Rice', productPrice: 850},
      { productTitle: '塩', photo: salt, productDetails: 'Generic Salt', productPrice: 300},
      { productTitle: 'ブラックペッパー', photo: pepper, productDetails: 'Generic Pepper', productPrice: 350},
      { productTitle: '水', photo: water, productDetails: 'Glacial Water From French Alps', productPrice: 200}
    ],
    japanese: [
      { productTitle: 'とんかつソース', photo: bulldog, productDetails: 'Tonaktsu Sauce', productPrice: 250},
      { productTitle: '海苔', photo: seaweed, productDetails: 'From Hokkaido', productPrice: 160},
      { productTitle: '納豆', photo: natto, productDetails: 'From Nagano', productPrice: 90},
      { productTitle: 'お茶', photo: tea, productDetails: 'From China', productPrice: 750},
      { productTitle: 'みそ', photo: miso, productDetails: 'From Japan', productPrice: 600},
      { productTitle: '豆腐', photo: tofu, productDetails: 'Made this morning', productPrice: 120}
    ]},
    error: null,
    showDismissibleAlert: false,
    showDismissibleAlertFail: false,
  }),
  methods: {
    itemClick: function(item) {
      console.log(item)
      this.$store.commit('selectOrder', item)
      this.isActive[item.key] = 1
    },
    checkout: function() {
      const itemObj = { itemArray: this.cartItems , quantitiesArray: this.cartQuantities, price: this.cartTotal, priceArray: this.cartPrices}
      this.$store.commit('setCheckoutItems', itemObj)
      axios.post('/api/orders', this.$store.state.checkoutItems).then((response)=>{
      this.$store.commit('emptyCheckoutItems')
      console.log("check", response.data)
        if(response.data.err) {
          this.showDismissibleAlertFail = true
          this.error = "We couldn't process your order. Click Checkout to try again."
        }
        if(response.data[0]){
          this.cartItems=[]
          this.cartQuantities=[]
          this.cartTotal=0
          this.productView=='Italian'
          this.showDismissibleAlert = true
        }
      })
      //axios call using with store data, also empty the store with mutation
      //if err, we reuse with local state to populate the $store
      //if success, then empty both local state and $store

    },
    addItem: function(item) {
      if (this.cartItems.length) {
        for (let i = 0; i <this.cartItems.length; i++) {
          if (this.cartItems[i] === item.productTitle) {
            this.cartQuantities.splice(i, 1, this.cartQuantities[i] + 1)
            this.cartPrices.splice(i, 1, item.productPrice)
            this.cartTotal = this.cartTotal + item.productPrice
            break
          }
          else if (i === this.cartItems.length-1 && this.cartItems[i] !==item) {
            this.cartItems.push(item.productTitle)
            this.cartPrices.push(item.productPrice)
            this.cartQuantities.push(1)
            this.cartTotal = this.cartTotal + item.productPrice
            break
          }
        }
      }
      else {
        this.cartItems.push(item.productTitle)
        this.cartQuantities.push(1)
        this.cartTotal = item.productPrice
      }
    }
  },
}
</script>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
}
.hero {
  height: 130%;
  width: 100%;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.8), 
    rgba(0, 0, 0, 0.8)), 
    url("../assets/userLandingPage.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
.product-view {
  background: #343a40;
  border-radius: 10px;
  padding: 15px;
  margin-left: 15px;
  max-height: 900px;
  width: 825px;
  overflow: auto;

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
}

.options-nav{
  width: 100%;
  padding-bottom: 5vh;
  background: #343a40;
  border-radius: 10px;
  height: 1%;
  width: 49%;
  font-size: 20px;
  font-weight: 700;
  margin-left: 15px;
}
</style>
