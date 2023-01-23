import Vuex from 'vuex'

export default Vuex.createStore({
  // strict: true,
  state: {
    colors: {
      bg: "dark",
      text: "light"
    },
    dimensions: {
      firstRowHeight: '350px',
      clientHeight: null,
      histHeight: null,
      asksBidsHeight: null,
      chartHeight: null
    },
    assets: {
      asset1: "USD",
      asset2: "EUR"
    },
    asks: [
      { id: 'a0', price: 1.71, quantity: 300, traderId: 'market1', status: 'pending' },
      { id: 'a1', price: 1.44, quantity: 100, traderId: 'market1', status: 'pending' },
      { id: 'a3', price: 1.84, quantity: 500, traderId: 'market1', status: 'pending' },
      { id: 'a2', price: 1.57, quantity: 200, traderId: 'market1', status: 'pending' },
      { id: 'a4', price: 1.47, quantity: 100, traderId: 't1', status: 'pending' },
      { id: 'a10', price: 1.71, quantity: 300, traderId: 'market1', status: 'pending' },
      { id: 'a01', price: 1.35, quantity: 100, traderId: 'market1', status: 'pending' },
      { id: 'a03', price: 1.3, quantity: 500, traderId: 'market1', status: 'pending' },
      { id: 'a02', price: 1.2, quantity: 200, traderId: 'market1', status: 'pending' },
      { id: 'a40', price: 1.1, quantity: 100, traderId: 't1', status: 'pending' }
    ],
    bids: [
      { id: 'b0', price: 1.21, quantity: 300, traderId: 'market1', status: 'pending' },
      { id: 'b1', price: 1.14, quantity: 800, traderId: 'market1', status: 'pending' },
      { id: 'b2', price: 1.17, quantity: 200, traderId: 'market1', status: 'pending' },
      { id: 'b3', price: 1.21, quantity: 300, traderId: 'market1', status: 'pending' },
      { id: 'b4', price: 1.14, quantity: 800, traderId: 'market1', status: 'pending' },
      { id: 'b5', price: 1.37, quantity: 200, traderId: 'market1', status: 'pending' },
      { id: 'b6', price: 1.31, quantity: 300, traderId: 'market1', status: 'pending' },
      { id: 'b7', price: 1.44, quantity: 800, traderId: 'market1', status: 'pending' },
      { id: 'b8', price: 1.567, quantity: 200, traderId: 'market1', status: 'pending' }
    ],
    ordersHistory: [
      { id: 'b100', price: 1.14, quantity: 300, traderId: 'market1', side: "buy", status: 'executed' },
      { id: 'b200', price: 1.18, quantity: 200, traderId: 'market1', side: "sell", status: 'executed' },
      { id: 'b300', price: 1.32, quantity: 100, traderId: 'market1', side: "sell", status: 'executed' },
      { id: 'b400', price: 1.17, quantity: 400, traderId: 'market1', side: "buy", status: 'executed' },
      { id: 'b500', price: 1.11, quantity: 200, traderId: 'market1', side: "sell", status: 'executed' },
      { id: 'b600', price: 1.15, quantity: 100, traderId: 'market1', side: "buy", status: 'executed' },
      { id: 'b700', price: 1.21, quantity: 100, traderId: 'market1', side: "sell", status: 'executed' },
      { id: 'b800', price: 1.26, quantity: 600, traderId: 'market1', side: "buy", status: 'executed' }
    ],
    traders: [
      {
        id: "market1",
        name: 'Market',
        assetQuantity1: 10000,
        assetQuantity2: 10000,
        assetCurrentPrice: null,
        pendingOrders: [],
        executedOrders: [],
        visible: false
      },
      {
        id: "t1",
        name: 'Trader 1',
        assetQuantity1: 10000,
        assetQuantity2: 10000,
        assetCurrentPrice: null,
        pendingOrders: [],
        executedOrders: [],
        visible: true
      },
      {
        id: "t2",
        name: 'Trader 2',
        assetQuantity1: 10000,
        assetQuantity2: 10000,
        assetCurrentPrice: null,
        pendingOrders: [],
        executedOrders: [],
        visible: true
      },
      {
        id: "t3",
        name: 'Trader 3',
        assetQuantity1: 10000,
        assetQuantity2: 10000,
        assetCurrentPrice: null,
        pendingOrders: [],
        executedOrders: [],
        visible: true
      },
      {
        id: "t4",
        name: 'Trader 4',
        assetQuantity1: 10000,
        assetQuantity2: 10000,
        assetCurrentPrice: null,
        pendingOrders: [],
        executedOrders: [],
        visible: true
      }
    ]
  },
  getters: {
    lastPrice: state => {
      const prices = []
      const labels = []
      state.ordersHistory.forEach(o => {
        prices.push(o.price)
        labels.push(o.id)
      })
      return [prices, labels]
    },
    asksSorted: state => {
      // if (state.asks.length !== 0) {
      //   let to_sort = state.asks
      //   return to_sort.slice().sort((a,b) => a.price - b.price)
      // }
      // return 0
      if (state.asks.length !== 0) {
        const distinctPrice = [...new Set(state.asks.map(o => o.price))]
        
        const askDistincCollection = []
        distinctPrice.forEach((price) => {askDistincCollection.push({
          price: price,
          orders: state.asks.filter (order => order.price === price ),
          totalQuantity: state.asks.reduce( (cnt, o) => {
            return cnt + (o.price === price ? o.quantity : 0)
            }, 0)
        })})
        return askDistincCollection.sort((a,b) => a.price - b.price)
      }
    },
    bidsSorted: state => {
      // if ( state.bids.length !== 0 ) {
      //   let to_sort = state.bids
      //   return to_sort.slice().sort((a,b) => a.price - b.price)
      // }
      // return 0
      if (state.bids.length !== 0) {
        const distinctPrice = [...new Set(state.bids.map(o => o.price))]
        const bidsDistincCollection = []
        distinctPrice.forEach((price) => {bidsDistincCollection.push({
          price: price,
          orders: state.bids.filter (order => order.price === price ),
          totalQuantity: state.bids.reduce( (cnt, o) => {
            return cnt + (o.price === price ? o.quantity : 0)
            }, 0)
        })})
        return bidsDistincCollection.sort((a,b) => b.price - a.price)
      }
    },
    lastAskBid: (state, getters) => {
      if (state.asks.length != 0 && state.bids.length != 0) {
        return (
          getters.lastAsk +
          " / " +
          getters.lastBid
        );
      }
      return (1).toString()
    },
    lastAsk: (state, getters) => {
      if (state.asks.length != 0) {
        return (
          getters.asksSorted[0].price.toString()
        );
      }
      return (1).toString()
    },
    lastBid: (state, getters ) => {
      if (state.bids.length != 0) {
        return (
          getters.bidsSorted[0].price.toString()
        );
      }
      return (1).toString()
    },
    spread: (state, getters) => {
      return (getters.lastAsk - getters.lastBid).toPrecision(4)
    },
    pendingAskOrders: (state) => (traderId) => {
      return state.asks.filter (order => order.traderId === traderId )
    },
    pendingBidOrders: (state) => (traderId) => {
      return state.bids.filter (order => order.traderId === traderId )
    },
    traderStatus: (state) => (traderID) => {
      if (state.traders.length != 0) { // search for the seller
        var trader = state.traders.find((trader) => {
            return trader.id == traderID;
          })
        }
      return trader.visible
    },
    findTrader: (state) => (traderId) => {
      if (state.traders.length != 0) { // search for the seller
        var trader = state.traders.find((trader) => {
            return trader.id == traderId;
          })
        }
      return trader
    }
  },
  mutations: {
    setHeight (state, p) {
      state.dimensions.clientHeight = p
      if (p<1635) {
        state.dimensions.histHeight = (p - 32) / 6 * 2,
        state.dimensions.asksBidsHeight = (p - 32) / 6,
        state.dimensions.chartHeight = (p - 32) / 2 - 50
      }
    },
    executeBuyOrder (state, p) { // (newOrder, orderAsset1, orderBookOrder, seller)
      p.trader.assetQuantity1 -= p.orderAsset1 //reduce trader asset1
      p.seller.assetQuantity1 += p.orderAsset1 // increase seller asset1
      p.trader.assetQuantity2 += parseInt(p.newOrder.quantity) // increase trader asset2
      p.seller.assetQuantity2 -= parseInt(p.newOrder.quantity) // decrease seller asset2
      p.orderBookOrder.quantity =
        parseInt(p.orderBookOrder.quantity) - parseInt(p.newOrder.quantity); //execute order => reduce available quanitity by order quanity
      if (p.orderBookOrder.quantity === 0) {
        //if available quanity is 0, remove order from orderbook
        p.orderBookOrder.status = 'executed' // change pending order status to executed
        //state.ordersHistory.push(p.orderBookOrder) // move pending order to history
        let orderBookOrderIndex = state.asks.indexOf(p.orderBookOrder); //search for order object in the array
        state.asks.splice(orderBookOrderIndex, 1); //remove
      }
      p.newOrder.status = 'executed'
      state.ordersHistory.push(p.newOrder) // move order to history
    },
    executeSellOrder (state, p) {
      var orderAsset1 = parseInt(p.newOrder.quantity) *
            parseFloat(p.newOrder.price)
      p.trader.assetQuantity1 += orderAsset1  // increase trader asset1
      p.buyer.assetQuantity1 -= orderAsset1 // decrease buyer asset1
      p.trader.assetQuantity2 -= parseInt(p.newOrder.quantity) // decrease trader asset2
      p.buyer.assetQuantity2 += parseInt(p.newOrder.quantity) // increase buyer asset2
      p.orderBookOrder.quantity =
        parseInt(p.orderBookOrder.quantity) - parseInt(p.newOrder.quantity); //execute order => reduce available quanitity by order quanity
      if (p.orderBookOrder.quantity === 0) {
        //if available quanity is 0, remove order from 
        p.orderBookOrder.status = 'executed' // change pending order status to executed
        //state.ordersHistory.push(p.orderBookOrder) // move pending order to history
        let orderBookOrderIndex = state.bids.indexOf(p.orderBookOrder); //search for order object in the array
        state.bids.splice(orderBookOrderIndex, 1); //remove
      }
      p.newOrder.status = 'executed' // change order status to executed
      state.ordersHistory.push(p.newOrder) // move order to history
    },
    pushNewBid (state, p) {
      p.newOrder.pending = true
      state.bids.push(p.newOrder)

    },
    pushNewAsk (state, p) {
      p.newOrder.pending = true //
      state.asks.push(p.newOrder)
    },
    deleteOrder (state, p) {
      const orderBookOrderIndex = state[p.from].indexOf(p.order); //search for order object in the array
      state[p.from].splice(orderBookOrderIndex, 1); //remove
    },
    addTrader (state, p) {
      state.traders.push({
        id: p.id,
        name: p.name,
        assetQuantity1: p.asset1,
        assetQuantity2: p.asset2,
        assetCurrentPrice: null,
        pendingOrders: [],
        executedOrders: [],
        visible: true
      })
      return 0
    },
    deleteTrader (state, id) {
      // delete all orders from trader
        const traderAskOrders = state.asks.filter (order => order.traderId === id )
        const traderBidOrders = state.bids.filter (order => order.traderId === id )
        traderAskOrders.forEach( order => {
          const orderBookOrderIndex = state.asks.indexOf(order); //search for order object in the array
          state.asks.splice(orderBookOrderIndex, 1); //remove
        })
        traderBidOrders.forEach( order => {
          const orderBookOrderIndex = state.bids.indexOf(order); //search for order object in the array
          state.bids.splice(orderBookOrderIndex, 1); //remove
        })
      // delete trader
      if (state.traders.length != 0) { // search for the seller
        var trader = state.traders.find((trader) => {
            return trader.id == id;
          })
        const traderIndex = state.traders.indexOf(trader)
        state.traders.splice(traderIndex, 1)
        }
      return 0
    },
    hideShowTrader (state, p) {
      if (state.traders.length != 0) { // search for trader
        var trader = state.traders.find((trader) => {
            return trader.id == p.traderId;
          })
        trader.visible = p.value
        }
    }
  }, 
  actions: {
  },
  modules: {
  }
});
