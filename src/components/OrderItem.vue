<template>
        <b-list-group-item @click="itemClick(item)" :variant="variant">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{item.purchaser}}</h5>
                <small class="text-muted">{{item.staff}}</small>
            </div>
            <p class="mb-1">{{item.fulfilled}}</p>
            <small class="text-muted">{{item.price}}</small>
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
</style>
