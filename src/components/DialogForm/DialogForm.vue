<script lang="ts" setup>
import { defineEmits, defineProps, toRefs } from 'vue';
import NodeForm from '../NodeForm/NodeForm.vue';

interface IProps{
  show: boolean;

  formData: any;
}

const props = defineProps<IProps>();

const {  } = toRefs(props);
</script>

<template>
  <t-dialog :visible="show">
    <NodeForm v-bind="$attrs" :formData="formData" />
  </t-dialog>
</template>

<style lang="scss" scoped>

</style>
