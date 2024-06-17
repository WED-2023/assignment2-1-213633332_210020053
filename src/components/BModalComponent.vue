<template>
    <b-modal
      v-model="showModal"
      :title="title"
      @ok="handleOk"
      @cancel="handleCancel"
      ok-title="Save"
      cancel-title="Cancel"
    >
      <slot></slot>
    </b-modal>
  </template>
  
  <script>
  import { BModal } from 'bootstrap-vue'
  
  export default {
    name: 'BModalComponent',
    components: {
      BModal
    },
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        showModal: false
      }
    },
    methods: {
      handleOk() {
        this.$emit('ok')
      },
      handleCancel() {
        this.$emit('cancel')
      },
      open() {
        this.showModal = true
      },
      close() {
        this.showModal = false
      }
    }
  }
  </script>
  