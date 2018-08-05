<template>
  <div class="bus-index">
    <bus-search />
  </div>
</template>

<script>
import BusSearch from '@/components/search'

export default {
  name: 'BusIndex',
  components: {
    BusSearch
  },
  created() {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
@include b(index) {
  height: 100%;
}
</style>
