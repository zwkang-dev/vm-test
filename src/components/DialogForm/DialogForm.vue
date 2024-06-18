<script lang="ts" setup>
import { defineEmits, defineProps, toRefs } from 'vue';
import NodeForm from '../NodeForm/NodeForm.vue';
import { injectActions } from '../../hooks/use-actions-provider';

interface IProps{
  show: boolean;

  formData: any;
}

const props = defineProps<IProps>();

const {  } = toRefs(props);

const { useValue } = injectActions()!;
const saveCommand = useValue('save-command')
const publishCommand = useValue('publish-command')
</script>

<template>
  <t-dialog :visible="show">
    <t-button @click="saveCommand.action" :loading="saveCommand.loading">{{ saveCommand.label?.form || saveCommand.label || '' }}</t-button>
    <t-button @click="publishCommand.action" :loading="publishCommand.loading">{{ publishCommand.label?.form || publishCommand.label || '' }}</t-button>
    <!-- <NodeForm v-bind="$attrs" :formData="formData" /> -->
  </t-dialog>
</template>

<style lang="scss" scoped>

</style>
