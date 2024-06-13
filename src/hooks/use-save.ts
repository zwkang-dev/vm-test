import { createInjectionState } from '@vueuse/core'
import { mockDelay } from './utils';
import { useAsyncState } from '@vueuse/core'
import { MessagePlugin} from 'tdesign-vue-next';
import { injectDetailPage } from './use-detail-page';

// 保存操作
function useSave() {
  const { state } = injectDetailPage()!;

  const { execute, isLoading } = useAsyncState(async () => {
    await mockDelay(2000);

    state.value.flowStatus = 1;
  }, null, {
    immediate: false,
    onError: (e) => {
      if(e instanceof Error) {
        MessagePlugin.error(e.message)
      }
    }
  })

  async function handleSave() {
    await mockDelay(2000)

    const params = {
      id: state.value.id,
      nodes: state.value.nodes,
      canvasHistoryId: state.value.canvasHistoryId,
      flowStatus: state.value.flowStatus,
      ext: state.value.ext,
    }

    console.log('params: ', params);
  }

  return {
    save: execute,
    isLoading,
  }
}


const [p, i] = createInjectionState(useSave);

export {
  p as provideDetailPage,
  i as injectDetailPage,
}