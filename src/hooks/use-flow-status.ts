import { createInjectionState } from '@vueuse/core'
import { injectDetailPage } from './use-detail-page';
import { computed } from 'vue';

function useFlowStatus() {
  const { state } = injectDetailPage()!;

  const statusText = computed(() => {
    switch(state.value.flowStatus) {
      case 0:
        return '未发布';
      case 1:
        return '已发布';
      case 2:
        return '已下线';
      default:
        return '未知状态';
    }
  })

  return {
    statusText
  }
}

const [p, i] = createInjectionState(useFlowStatus);

export {
  p as provideFlowStatus,
  i as injectFlowStatus,
}