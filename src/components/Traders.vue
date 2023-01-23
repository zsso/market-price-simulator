<template>
  <div class="mt-lg-2">
    <NewTrader />
    <TradersSidebar />
      <b-row>
        <b-col
          col sm="6" md="auto" lg="4" xl="3"
          style="width: 320px;"
          v-bind:key="trader.id"
          v-for="trader in this.visibleTraders">
          <Trader v-bind:trader="trader"/>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import Trader from './Trader'
import NewTrader from './NewTrader'
import TradersSidebar from './TradersSidebar'

export default {
  name: 'Traders',
  components: {
    Trader,
    NewTrader,
    TradersSidebar
  },
  data: function () {
    return {
      col: true
    }
  },
  computed: {
    visibleTraders: function () {
      return this.$store.state.traders.filter((trader) => {
              return trader.visible === true;
            })
    }
  }
}
</script>
