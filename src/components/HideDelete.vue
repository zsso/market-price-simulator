<template>
    <div>
      <b-form inline>
        {{trader.name}}
        <b-checkbox switch v-model="status" class="pr-2 ml-auto" right> 
          <span v-html="this.hiddenVisible()"></span>
        </b-checkbox>
        <b-button variant="danger" @click="deleteTrader" size="sm" right>X</b-button>
      </b-form>
    </div>
</template>

<script>


export default {
  name: 'HideDelete',
  props: {
    trader: Object
  },
  data(){
    return {
    }
  },
  computed: {
    status: {
      get () {
        return this.$store.getters.traderStatus(this.trader.id)
      },
      set (value) {
        this.visible = value
        this.$store.commit('hideShowTrader', {
          traderId: this.trader.id,
          value: value
        })
      }
    }
  },
  methods: {
    deleteTrader () {
      this.$store.commit('deleteTrader', this.trader.id)
    },
    hiddenVisible () {
      return "Visibility"
      //return (this.$store.getters.traderStatus(this.trader.id) ? 'Hidden/<b>Visible</b>' : '<b>Hidden</b>/Visible')
    }
  }
}
</script>