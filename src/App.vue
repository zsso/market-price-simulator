<template>
  <div id="app" style="height: 100%">
    test
    <!-- <NavBar /> -->
    <div class="mt-2 container fluid bg-light" style="height: 100%">
      divvv
      <!-- <MarketInfo />
      <Traders class="" /> -->
    </div>
  </div>
</template>

<script>
// import MarketInfo from './components/MarketInfo.vue'
// import Traders from './components/Traders.vue'
// import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    // MarketInfo,
    // Traders,
    // NavBar
  },
  created () {
            document.title = "Market Price Simulator";
        },
  mounted: function () {
    this.$nextTick(function() {
    window.addEventListener('resize', this.getDim)
    this.getDim()
    })
  },
  data() {
    return {
      layoutOption: 1
    }
  },
  methods: {
    getDim () {
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      let upperPart = (height - 32) /2 ;
      this.$store.commit( 'setHeight', height)
    console.log("width: ", width, " height: ", height, " upperPart: ", upperPart)
    }
  }
}
</script>

<style>
  * {
    scrollbar-width: thin;
    scrollbar-color: grey whitesmoke;
  }

  /* Works on Chrome/Edge/Safari */
  *::-webkit-scrollbar {
    width: 7px;
  }

  *::-webkit-scrollbar-track {
    background: whitesmoke;
  }

  *::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 20px;
    border: 2px solid grey;
  }
  html {
    font-size: 0.8rem;
    height: 100%;
  }
  body {
    background-color: #343a40 !important;
    height: 100%;
  } 
  /* @media screen and (min-height: px) and (orientation: landscape) {
    body {
      background-color: lightgreen !important;
    } 
  }*/
</style>
