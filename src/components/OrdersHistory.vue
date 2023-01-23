<template>
  <div class="w-100 h-100 mh-100">
    <b-card no-body
      :bg-variant="$store.state.colors.bg"
      :text-variant="$store.state.colors.text"
      class="mh-100 h-100"
    >
      <b-card-header class="d-none d-lg-block">Trades History</b-card-header>
      <b-card-body 
        id="hist" 
        v-if="$store.state.ordersHistory !== 0"
        class="mh-100 h-100">
          <div inline v-for="(order, i) in $store.state.ordersHistory" :key='order.id'>
            <b-row class="">
              <b-col class="d-none">{{i+1}}</b-col>
              <b-col >{{order.price}}</b-col>
              <b-col class="text-right">{{order.quantity}}</b-col>
              <!-- <b-col class="d-md-none d-xl-block text-right" cols="5">{{$store.getters.findTrader(order.traderId).name}}</b-col> -->
            </b-row>
          </div>
      </b-card-body>
      <b-card-footer class="d-none d-lg-block">{{footerText}}</b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'OrdersHistory',
  data() {
    return {
      footerText: 'Last price: ' + this.$store.getters.lastPrice[0].slice().reverse()[0]
    }
  },
  updated: function () {
      this.scrollDown()
  },
  watch: {
    '$store.state.ordersHistory': function() {
      // console.log("change")
      this.footerText = this.$store.getters.lastPrice[0].slice().reverse()
      this.footerText = 'Last price: ' + this.footerText[0]
    }
  },
  methods: {
    scrollDown() {
      var container = this.$el.querySelector("#hist")
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>

<style scoped>
  #hist {
    max-height: 100%; 
    overflow-y: hidden;
    overflow-x: hidden;
  }
  #hist:hover {
  overflow-y: scroll;
  }
  .card-body {
    padding: 0px 10px;
  }
</style>