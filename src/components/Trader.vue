<template>
  <div>
      <b-card 
        :bg-variant="$store.state.colors.bg"
        :text-variant="$store.state.colors.text"
        style="min-width: 300px; max-height: 280px;" 
        class="mb-4 d-none d-lg-flex">
         <template v-slot:header>
           <HideDelete v-bind:trader="trader"/>
         </template>
        <b-tabs fill justified  class="darktabs">
         
            <b-tab title="Trade" active>
              <!-- <b-collapse id="collapse-1" class="mt-2"> -->
                <b-card-text >
                  <p class="text-center pt-3">Assets: 
                    {{$store.state.assets.asset1 + ": "}} 
                    {{asset1}}
                    <!-- {{ this.sumPendingAsset1 == 0 ? '' : (' - ' + this.sumPendingAsset1) }} -->
                    &lt;|&gt;
                    {{$store.state.assets.asset2 + ": "}} 
                    {{asset2}}
                    <!-- {{ this.sumPendingAsset2 == 0 ? '' : (' - '+ this.sumPendingAsset2) }} -->
                  </p>
                </b-card-text>
                <b-input-group size="sm" prepend="Price" class="mb-2">
                  <b-form-input
                    :placeholder="this.$store.getters.lastAskBid"
                    v-model="orderPrice"
                    class="text-right"
                    min=0.01
                    type=number></b-form-input>
                </b-input-group>

                <b-input-group size="sm" prepend="Quanity" class="mb-2">
                  <b-form-input 
                  v-model="orderQuant"
                  class="text-right"
                  min=0.01
                  type=number></b-form-input>
                </b-input-group>
              <!-- </b-collapse> -->
              <b-input-group>
                <b-input-group-prepend>
                  <b-button block 
                    id="buy"
                    @click="buttonClick($event)"
                    variant="success"
                  >Buy at {{this.orderPrice ? this.orderPrice : this.$store.getters.lastAsk}}</b-button>
                </b-input-group-prepend>
                <b-form-input :value="$store.getters.spread" class="text-center"></b-form-input>

                <b-input-group-append>
                  <b-button block 
                    id="sell"
                    @click="buttonClick($event)"
                    variant="danger"
                  >Sell at {{this.orderPrice ? this.orderPrice : this.$store.getters.lastBid}}</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-tab>
            <b-tab title="Pending Orders">
              <div id="pendingOrders">
                <div v-if="$store.getters.pendingAskOrders(trader.id) !== 0">
                  <div inline v-for="order in $store.getters.pendingAskOrders(trader.id)" :key="order.id">
                    <div class="clearfix text-danger">
                      <div class="w-50 float-left">{{order.price}}</div>
                      <div class="w-50 float-right text-right pr-2">{{order.quantity}}
                        <b-button size="sm"
                          id="bids"
                          @click="buttonDeleteOrder('asks', order, trader)"
                        >X</b-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="$store.getters.pendingBidOrders(trader.id) !== 0">
                  <div inline v-for="order in $store.getters.pendingBidOrders(trader.id)" :key="order.id">
                    <div class="clearfix text-success">
                      <div class="bg-dark w-50 float-left">{{order.price}}</div>
                      <div class="bg-dark w-50 float-right text-right pr-2">{{order.quantity}}
                        <b-button size="sm"
                          id="bids"
                          @click="buttonDeleteOrder('bids', order, trader)"
                        >X</b-button>
                      </div>
                    </div>
                  </div>
                </div> 
              </div> 
            </b-tab>
        </b-tabs>
        <template v-slot:footer>
          <div class="text-center">
          Pending: 
          {{$store.state.assets.asset1 + ": "}} {{sumPendingAsset1}} 
          | 
          {{$store.state.assets.asset2 + ": "}} {{sumPendingAsset2}}
          </div>
        </template>
      </b-card>
      <b-card no-body
        :bg-variant="$store.state.colors.bg"
        :text-variant="$store.state.colors.text"
        style="min-width: 300px; max-height: 280px;" 
        class="mb-4 p-0 d-block d-lg-none">

           <HideDelete v-bind:trader="trader" class="d-none"/>

        <b-tabs fill justified class="custom-tabs">

            <b-tab :title='trader.name' active>
              <!-- <b-collapse id="collapse-1" class="mt-2"> -->

                <b-input-group size="sm" prepend="Quanity" class="my-2">
                  <b-form-input 
                  v-model="orderQuant"
                  class="text-right"
                  min=0.01
                  type=number></b-form-input>
                </b-input-group>
              <!-- </b-collapse> -->
              <b-input-group>
                <b-input-group-prepend>
                  <b-button block 
                    id="buy"
                    @click="buttonClick($event)"
                    variant="success"
                  >Buy at {{this.orderPrice ? this.orderPrice : this.$store.getters.lastAsk}}</b-button>
                </b-input-group-prepend>
                <b-form-input
                :placeholder="this.$store.getters.lastAskBid"
                v-model="orderPrice"
                class="text-right"
                min=0.01
                type=number></b-form-input>
                <b-input-group-append>
                  <b-button block 
                    id="sell"
                    @click="buttonClick($event)"
                    variant="danger"
                  >Sell at {{this.orderPrice ? this.orderPrice : this.$store.getters.lastBid}}</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-tab>
            <b-tab title="P. Orders">
              <div id="pendingOrders">
                <div v-if="$store.getters.pendingAskOrders(trader.id) !== 0">
                  <div inline v-for="order in $store.getters.pendingAskOrders(trader.id)" :key="order.id">
                    <div class="clearfix text-danger">
                      <div class="w-50 float-left">{{order.price}}</div>
                      <div class="w-50 float-right text-right pr-2">{{order.quantity}}
                        <b-button size="sm"
                          id="bids"
                          @click="buttonDeleteOrder('asks', order, trader)"
                        >X</b-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="$store.getters.pendingBidOrders(trader.id) !== 0">
                  <div inline v-for="order in $store.getters.pendingBidOrders(trader.id)" :key="order.id">
                    <div class="clearfix text-success">
                      <div class="w-50 float-left">{{order.price}}</div>
                      <div class="w-50 float-right text-right pr-2">{{order.quantity}}
                        <b-button size="sm"
                          id="bids"
                          @click="buttonDeleteOrder('bids', order, trader)"
                        >X</b-button>
                      </div>
                    </div>
                  </div>
                </div> 
              </div> 
            </b-tab>
            <b-tab title="Assets">
              <div class="text-center pt-1">Assets: 
                {{$store.state.assets.asset1 + ": "}} 
                {{asset1}}
                <!-- {{ this.sumPendingAsset1 == 0 ? '' : (' - ' + this.sumPendingAsset1) }} -->
                &lt;|&gt;
                {{$store.state.assets.asset2 + ": "}} 
                {{asset2}}
                <!-- {{ this.sumPendingAsset2 == 0 ? '' : (' - '+ this.sumPendingAsset2) }} -->
              </div>
              <div class="text-center">
                Pending: 
                {{$store.state.assets.asset1 + ": "}} {{sumPendingAsset1}} 
                | 
                {{$store.state.assets.asset2 + ": "}} {{sumPendingAsset2}}
              </div>
            </b-tab>
        </b-tabs>



      </b-card>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{this.alertMessage}}</p>
    </b-alert>  
  </div>
</template>

<script>
  import HideDelete from './HideDelete'
  const uniqueId = require("lodash.uniqueid");

  export default {
  name: "Traders",
  components: {
    HideDelete
  },
  props: {
    trader: Object,
  },
  data () {
    return {
    orderPrice: null,
    orderQuant: 100,
    pendingAsset1: 0,
    pendingAsset2: 0,
        // for alerts
    dismissSecs: 4,
    dismissCountDown: 0,
    alertMessage: ''
    // end for alerts
    }
  },
  methods: {
    buttonClick(e) {
      let price = null;
      let id = null;
      let newOrder;
      if (e.target.id === "buy") {
        id = uniqueId("buy_");
        price = this.orderPrice ? this.orderPrice : this.$store.getters.lastAsk;
        newOrder = {
          side: e.target.id,
          id: id, 
          price: parseFloat(price), 
          quantity: this.orderQuant, 
          traderId: this.trader.id
        };
      }
      if (e.target.id === "sell") {
        id = uniqueId("sell_");
        price = this.orderPrice ? this.orderPrice : this.$store.getters.lastBid;
        newOrder = {
          side: e.target.id,
          id: id,
          price: parseFloat(price),
          quantity: this.orderQuant,
          traderId: this.trader.id,
          pending: false
        };
      }
      this.orderPrice = "";
      this.orderQuant = 100;
      this.handleNewOrder(newOrder);
      return newOrder;
    },
    buttonDeleteOrder(from, order, trader) {
      this.$store.commit('deleteOrder', {
        order: order,
        from: from,
        trader: trader
      })
    },
    handleNewOrder (newOrder) {
      // check order type
      if (newOrder["side"] === "buy") {
        // if order is a buy, check if trader has enough asset1 to buy assest ---> order quantity * order price <= trader.assetQuantity1
        let orderAsset1 =
            parseInt(newOrder.quantity) *
            parseFloat(newOrder.price);
        if (this.trader.assetQuantity1- this.sumPendingAsset1 >= orderAsset1) {
          this.placeBuyOrder(newOrder, orderAsset1)
        } else {
          this.showAlert(this.trader.name + " doesn't have enough asset1 currency to place order!")
          //console.log("Not enough money to buy!")
        }
      }
      if (newOrder["side"] === "sell") {
        // if order is a sell, check if trader has enough asset sell ---> order quanity <= trader.assetQuantity2
        if (newOrder.quantity <= this.trader.assetQuantity2 - this.sumPendingAsset2) {
          this.placeSellOrder (newOrder)
        } else {
          this.showAlert(this.trader.name + " doesn't have enough asset quantity to place order!")
          //console.log("Not enough asset quantity to place order!")
        }
        
      }
    },
    placeBuyOrder (newOrder, orderAsset1) {
      if (this.$store.state.asks.length != 0) { //if there are asks orders, search for macthing order
        var orderBookOrder = this.$store.state.asks.find((obj) => {
            return obj.price == newOrder.price && obj.traderId !== newOrder.traderId
          }); //search orders by price
      }
      if (orderBookOrder && orderBookOrder.traderId != newOrder.traderId) {
        //if there is a matching order and it's from different trader
        let newQuant =
          parseInt(orderBookOrder.quantity) - parseInt(newOrder.quantity); //avilable quantity in order book minus order quantity

        if (newQuant >= 0) {
          // if there is enough quanity for sell in the order book
          if (this.$store.state.traders.length != 0) { // search for the seller
          var seller = this.$store.state.traders.find((trader) => {
              return trader.id == orderBookOrder.traderId;
            });
          }
          // this.executeBuyOrder(newOrder, orderAsset1, orderBookOrder, seller)
          this.$store.commit('executeBuyOrder', {
            newOrder: newOrder,
            trader: this.trader,
            orderAsset1: orderAsset1, 
            orderBookOrder: orderBookOrder, 
            seller: seller
          })
        }
      } else { 
        // if there is no matching order, insert new order to the order book
        this.$store.commit('pushNewBid', {
            newOrder: newOrder,
            trader: this.trader,
            orderAsset1: orderAsset1
          })
      }
    },
    placeSellOrder (newOrder) {
      if (this.$store.state.bids.length != 0) { //if there are bid orders, search for macthing order
        var orderBookOrder = this.$store.state.bids.find((obj) => {
            return obj.price == newOrder.price && obj.traderId !== newOrder.traderId;
          }); //search orders by price
          // console.log(orderBookOrder)
      }
      if (orderBookOrder && orderBookOrder.traderId != newOrder.traderId) {
        //if there is a matching order and it's from different trader
        let newQuant =
          parseInt(orderBookOrder.quantity) - parseInt(newOrder.quantity); //avilable quantity in order book minus order quantity

        if (newQuant >= 0) {
          // if there is enough quanity for sell in the order book
          if (this.$store.state.traders.length != 0) { // search for the seller
          var buyer = this.$store.state.traders.find((trader) => {
              return trader.id == orderBookOrder.traderId;
            });
          }
          // this.executeSellOrder(newOrder, orderBookOrder, buyer)
          this.$store.commit('executeSellOrder', {
            newOrder: newOrder,
            trader: this.trader,
            orderBookOrder: orderBookOrder, 
            buyer: buyer
          })
        }
      } else { 
        // if there is no matching order, insert new order to the order book
        this.$store.commit('pushNewAsk', {
            newOrder: newOrder,
            trader: this.trader
        })
      }
    },
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    showAlert(alertMessage) {
      this.alertMessage = alertMessage
      this.dismissCountDown = this.dismissSecs
    // end for alerts
    },
  },
  computed: {
    sumPendingAsset2: function () {
      // const pendingAsks = this.$store.state.asks.filter (order => order.trader === this.trader.name)
      const ask = this.$store.state.asks
      const sum = ask.reduce( (cnt, o) => {
        return cnt + (o.traderId === this.trader.id ? o.quantity : 0)
        }, 0)
      return sum.toFixed(2)
    },
    sumPendingAsset1: function () {
      // const pendingAsks = this.$store.state.asks.filter (order => order.trader === this.trader.name)
      const bids = this.$store.state.bids
      const sum = bids.reduce( (cnt, o) => {
        return cnt + (o.traderId === this.trader.id ? (o.quantity * o.price) : 0)
        }, 0)
      return sum.toFixed(2)
    },
    asset1: function () {
      return this.trader.assetQuantity1.toFixed(2)
    },
    asset2: function () {
      return this.trader.assetQuantity2.toFixed(2)
    }
  },
};
</script>

<style>
  #pendingOrders {
    margin-top: 10px;
    max-height: 120px;
    overflow-y: hidden;
  }
  #pendingOrders:hover {
  overflow-y: scroll;
  }
  .input-group>.input-group-prepend {
    flex: 0 0 35%;
  }
  .input-group>.input-group-append {
    flex: 0 0 35%;
  }
  .input-group .input-group-text {
    width: 100%;
  }

  .nav-link.active, .form-control, .input-group-text {
    color: white !important;
    background-color: #343a40 !important;
    border-color: #272c30  !important;
  }
  .nav-tabs {
    border-bottom-color: #272c30;
  }
  :invalid {
    box-shadow: none;
  }

  :-moz-submit-invalid {
    box-shadow: none;
  }

  :-moz-ui-invalid {
    box-shadow:none;
  }
</style>
