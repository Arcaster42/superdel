<template>
        <b-list-group-item @click="itemClick" :variant="variant">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{item.one}}</h5>
                <small class="text-muted">{{item.two}}</small>
            </div>
            <p class="mb-1">{{item.three}}</p>
            <small class="text-muted">{{item.four}}</small>
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
    itemClick() {
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
