<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { provideDetailPage } from './hooks/use-detail-page';
import { providePollingFlowStatus } from './hooks/use-polling-flow-status';
import NodeForm from './components/NodeForm'
import { provideFlowStatus } from './hooks/use-flow-status';
import { ref } from 'vue';
import DialogForm from './components/DialogForm/DialogForm.vue';

provideDetailPage();

const { isActive } = providePollingFlowStatus()!
const { statusText } = provideFlowStatus();


const showDialog = ref(false);
</script>

<template>
  <div class="h-screen w-screen ">
    <p>
      上线状态 {{ statusText }}
    </p>

    <t-loading v-if="isActive" text="轮询中" size="small"></t-loading>
    
    <!-- <NodeForm /> -->
    <t-button @click="showDialog = !showDialog">
      {{ showDialog ? '关闭' : '打开' }}
    </t-button>

    <DialogForm v-if="showDialog" :formData="{}" :show="showDialog" @cancel="showDialog = false" @submit="showDialog = false" />
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
