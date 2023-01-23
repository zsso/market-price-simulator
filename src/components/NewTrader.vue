<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      ok-title="+ Add user"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Asset 1 amount"
          label-for="asset1-input"
          invalid-feedback="Amount is required"
        >
          <b-form-input
            id="asset1-input"
            v-model="asset1"
            :state="asset1State"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Asset quanity"
          label-for="asset2-input"
          invalid-feedback="Asset amount is required"
        >
          <b-form-input
            id="asset2-input"
            v-model="asset2"
            :state="asset2.State"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  const uniqueId = require("lodash.uniqueid");

  export default {
    data() {
      return {
        name: '',
        nameState: null,
        asset1: 10000,
        asset1State: null,
        asset2: 10000,
        asset2State: null,
        submitted: []
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.$store.commit('addTrader', {
          id: uniqueId("trader_"),
          name: this.name,
          asset1: this.asset1,
          asset2: this.asset2
          })
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>