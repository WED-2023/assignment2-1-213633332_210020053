<template>
  <b-modal
    v-model="showModal"
    :title="title"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <slot></slot>

    <!-- Custom buttons -->
    <!-- <b-button class="mt-3" variant="outline-success" block @click="handleOk">Save</b-button> --> 
    <!-- <b-button class="mt-2" variant="outline-danger" block @click="handleCancel">Cancel</b-button> --> 
  </b-modal>
</template>

<script>
import { BModal, BButton } from 'bootstrap-vue';

export default {
  name: 'BModalComponent',
  components: {
    BModal,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    handleOk() {
      this.$emit('ok');
      this.showModal = false;
    },
    handleCancel() {
      this.$emit('cancel');
      this.showModal = false;
    },
    open() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped>

.b-modal-footer {
  display: none; /* Hide default footer */
}

/* Optional: Add some padding to the buttons for better spacing */
.b-modal-content .btn {
  margin-top: 10px;
}

.okVariant{
  background-color: red;
  color: red;
}

</style>
