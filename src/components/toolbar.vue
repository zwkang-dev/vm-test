<script lang="ts" setup>
import { defineEmits, defineProps, toRefs } from 'vue';
import { injectActions } from '../hooks/use-actions-provider';

interface IProps{

}

const props = defineProps<IProps>();

const {  } = toRefs(props);
const {
  useValue,
} = injectActions()!;

const saveCommander = useValue('save-command' as any)
const publishCommander = useValue('publish-command' as any)
</script>

<template>
  <div>
    <t-button :loading="saveCommander.loading" @click="saveCommander.action" :disabled="saveCommander.disabled" class="mx-3">
      {{ saveCommander.label?.toolbar || saveCommander.label || '' }}
    </t-button>

    <t-button :loading="publishCommander.loading" @click="publishCommander.action" :disabled="publishCommander.disabled">
      {{ publishCommander.label?.toolbar || publishCommander.label || '' }}
    </t-button>
  </div>
</template>

<style lang="scss" scoped>

</style>
