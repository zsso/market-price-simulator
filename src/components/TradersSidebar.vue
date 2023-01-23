<template>
  <div>
    <b-sidebar id="sidebar-right" title="Traders" right shadow  width="480px">
      <div class="px-3 py-2">
        <b-list-group>
          <b-list-group-item v-bind:key="trader.id" v-for="trader in this.$store.state.traders">
            <b-form inline></b-form>
              <b-avatar button variant="primary" text="FF" class="align-baseline" inline></b-avatar>
              <!-- <span class="px-3">{{trader.name}}</span> -->
              <HideDelete v-bind:trader="trader"/>
            
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import HideDelete from './HideDelete'

export default {
  name: 'TradersSidebar',
  components: {
    HideDelete
  },
  computed: {
  },
  methods: {
    // hideShow(id, e) {
    //   // console.log(id, e)
    // }
  }
}
</script>