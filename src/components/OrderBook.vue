<template>
  <div class="w-100 h-100 mh-100">
    <b-card
      :bg-variant="$store.state.colors.bg"
      :text-variant="$store.state.colors.text"
      class="h-100 mh-100" 
      no-body> 
      <b-card-header class="d-none d-lg-block">Order Book</b-card-header>
      <b-card-body 
        id="asks"
        v-if="$store.state.asks.length !== 0"
        class="h-50">
        <div v-for="price in $store.getters.asksSorted.slice().reverse()" :key='price.price'>
          <b-row class="">
            <b-col >{{price.price}}</b-col>
            <b-col class="d-md-none d-lg-block text-center" cols="6">Supply</b-col>
            <b-col class="text-right">{{price.totalQuantity}}</b-col>
          </b-row>
        </div>
      </b-card-body>
      <div class="clearfix">
        <div class="w-50 float-left">Price</div>
        <div class="w-50 float-right text-right">Quantity</div>
      </div>
      <b-card-body 
        id="bids" 
        class="h-50"
        v-if="$store.state.bids.length !== 0">
        <div inline v-for="price in $store.getters.bidsSorted" :key='price.price'>
          <b-row class="">
            <b-col >{{price.price}}</b-col>
            <b-col class="d-md-none d-lg-block text-center" cols="6">Demand</b-col>
            <b-col class="text-right">{{price.totalQuantity}}</b-col>
          </b-row>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'OrderBook',
  mounted: function () {
    this.scrollDown()
    // console.log('created')
  },
  updated: function () {
      this.scrollDown()
  },
  data() {
    return {
      fields: ['price', 'totalQuantity', 'showOrders']
    }
  },
  methods: {
    scrollDown() {
      var container = this.$el.querySelector("#asks")
      if (container) container.scrollTop = container.scrollHeight
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #asks, #bids {
    /* min-height: 100px; */
    /* max-height: 100px; */
    overflow-y: hidden;
    overflow-x: hidden;
  }
  #asks:hover, #bids:hover {
  overflow-y: scroll;
  }
  #asks {
    color: red;
    /* background-color: darkslategrey; */
  }
  #bids {
    color: green;
    /* background-color: darkslategray; */
  }
  .card-body {
    padding: 0px 10px;
  }
</style>
