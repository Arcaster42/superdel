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
        <h1 class="text-black font-weight-bold">Welcome, {{user.first_name}}</h1>
        <hr class="divider my-4" />
      </div>
    </div>


<!-- USER Cart-->
<div class="cart">
  <b-list-group>
    <b-card bg-variant="dark" text-variant="white" title="Checkout">
      <b-card-text>
        Thank you for shopping with us, {{user.first_name}}!
        <b-card-text class="text-muted" >Total: {{this.cartTotal}}</b-card-text>
        <b-card-text v-if="error !== null">{{error}}</b-card-text>
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
            <b-card-text class="text-muted float-right" >¥{{item.productPrice}}</b-card-text>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary" v-on:click="addItem(item)">Add to Cart</b-button>
      </b-card>
        </div>
    </b-card-group>
  </div>

<!-- USER ORDER Japanese-->
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
            <b-card-text class="text-muted float-right" >￥{{item.productPrice}}</b-card-text>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary" v-on:click="addItem(item)">Add to Cart</b-button>
      </b-card>
        </div>
    </b-card-group>
  </div>
  
  <!-- USER ORDER Basics-->
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
      { productTitle: '牛乳', photo: milk, productDetails: 'poi', productPrice: 180},
      { productTitle: 'チーズ', photo: mozza, productDetails: 'poi', productPrice: 800},
      { productTitle: 'トマト', photo: tomato, productDetails: 'poi', productPrice: 150},
      { productTitle: 'パスタ', photo: pasta, productDetails: 'poi', productPrice: 300},
      { productTitle: 'バジル', photo: basil, productDetails: 'poi', productPrice: 25},
      { productTitle: 'トマトソース', photo: sauce, productDetails: 'poi', productPrice: 500},
    ],
    basics: [
      { productTitle: '卵', photo: eggs, productDetails: 'poi', productPrice: 150},
      { productTitle: 'オリブオイル', photo: olive, productDetails: 'poi', productPrice: 500},
      { productTitle: 'お米', photo: rice, productDetails: 'poi', productPrice: 850},
      { productTitle: '塩', photo: salt, productDetails: 'poi', productPrice: 300},
      { productTitle: 'ブラックペッパー', photo: pepper, productDetails: 'poi', productPrice: 350},
      { productTitle: '水', photo: water, productDetails: 'poi', productPrice: 200}
    ],
    japanese: [
      { productTitle: 'とんかつソース', photo: bulldog, productDetails: 'poi', productPrice: 250},
      { productTitle: '海苔', photo: seaweed, productDetails: 'poi', productPrice: 160},
      { productTitle: '納豆', photo: natto, productDetails: 'poi', productPrice: 90},
      { productTitle: 'お茶', photo: tea, productDetails: 'poi', productPrice: 750},
      { productTitle: 'みそ', photo: miso, productDetails: 'poi', productPrice: 600},
      { productTitle: '豆腐', photo: tofu, productDetails: 'poi', productPrice: 120}
    ]},
    error: null
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
          this.error = "We couldn't process your order. Click Checkout to try again."
        }
        if(response.data[0]){
          this.cartItems=[]
          this.cartQuantities=[]
          this.cartTotal=0
          this.productView=='Italian'
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
