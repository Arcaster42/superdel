<template>
        <b-list-group-item @click="itemClick(item)" :variant="variant">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Ordered by: {{item.purchaser}}</h5>
                <small class="text-muted">￥{{item.price}}</small>
            </div>
            <p class="mb-1">Order Filled: {{item.fulfilled}}</p>
        </b-list-group-item>
</template>

<script>
export default {
  name: 'OrderItem',
  data: () => ({
    variant: 'light'
  }),
  props: {
      item: Object
  },
  methods: {
    itemClick(item) {
        if (this.variant === "light") {
            this.variant = 'primary'
            this.$store.commit('selectOrder', item)
        } else {
            this.variant = 'light'
        }
    }
  }
}
</script>

<style scoped>
.text-muted {
  font-size: 18px;
}

</style>
