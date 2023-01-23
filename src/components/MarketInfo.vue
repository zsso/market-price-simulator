<template>
  <div id="marketinfo" class="mb-2">
    <b-row id="row1" 
      class="sticky-top py-2
      d-none d-md-flex" style="height: 100%;">
      <b-col cols="3" class="mh-100 h-100"><OrderBook/></b-col>
      <b-col cols="6" class="mh-100 h-100">
        <b-card 
          :bg-variant="$store.state.colors.bg"
          :text-variant="$store.state.colors.text"
          class="mh-100 h-100">
          <Chart2 class="h-100 mh-100"/>
        </b-card>
      </b-col>
      <b-col cols="3" class="mh-100 h-100"><OrdersHistory/></b-col>
    </b-row>
    <b-button-group class="d-flex d-md-none">
      <b-button @click="changeVisibility('chart')" variant="dark">Chart</b-button>
      <b-button @click="changeVisibility('orders')" variant="dark">Order Book</b-button>
      <b-button @click="changeVisibility('hist')" variant="dark">Trades History</b-button>
    </b-button-group>
    <div class="h-100 mb-2 d-flex d-md-none" style="max-height: 90%">
      <Chart2 v-bind:class="{ 'd-none': this.visible[0] }" class="mh-100 mw-100"/>
      <OrderBook v-bind:class="{ 'd-none': this.visible[1] }" />
      <OrdersHistory v-bind:class="{ 'd-none': this.visible[2] }" />
    </div>
  </div>
</template>

<script>
import OrderBook from './OrderBook.vue'
import OrdersHistory from './OrdersHistory'
import Chart2 from './Chart2'

export default {
  name: 'MarketInfo',
  components: {
    OrderBook,
    OrdersHistory,
    Chart2
  },
  data: function () {
    return {
      chartHeight: 150,
      visible: [false, true, true]
    }
  },
  methods: {
    changeVisibility(id) {
      if (id==='chart') this.visible = [ false, true, true ]
      if (id==='orders') this.visible = [ true, false, true ]
      if (id==='hist') this.visible = [ true, true, false ]
    }
  }
}
</script>

<style>
  @media only screen and (min-height: 400px){
    #marketinfo {
      height: 30%;
    }
  }
  @media only screen and (min-height: 600px){
    #marketinfo {
      height: 40%;
    }
  }
  @media only screen and (min-height: 800px){
    #marketinfo {
      height: 60%;
    } 
  }
</style>