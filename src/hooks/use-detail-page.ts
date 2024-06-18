import { createInjectionState } from '@vueuse/core'
import { ref } from 'vue'
import { mockDelay } from './utils';
import { useAsyncState } from '@vueuse/core'
import { MessagePlugin} from 'tdesign-vue-next';

let canvasHistoryId = 1;

function useDetailPage() {
  const state = ref({
    id: null as null | number,
    nodes: [] as any[],
    canvasHistoryId: null as null | number,
    // 0: 未发布 1: 已发布 2: 已下线
    flowStatus: null as null | number,

    ext: {
      createUsers: '' as string,
      inChargeUsers: '' as string,
      version: '',
    },

    dirty: true,
  })

  const { execute, isLoading } = useAsyncState(async () => {
    await mockDelay(2000);

    state.value.id = 1;
    state.value.nodes = [{
      id: '11',
      name: '开始',
      type: 'start',
      user: 'zwkang',
      x: 100,
      y: 100,
    }, {
      id: '22',
      name: "结束",
      type: 'end',
      x: 300,
      y: 300,
    }]
    state.value.canvasHistoryId = ++canvasHistoryId;
    state.value.flowStatus = 0;

    state.value.ext = {
      createUsers: '张三',
      inChargeUsers: '李四',
      version: '1.0.0',
    }
  }, null, {
    immediate: false,
    onError: (e) => {
      if(e instanceof Error) {
        MessagePlugin.error(e.message)
      }
    }
  })

  function updateDirty(bool: boolean) {
    state.value.dirty = bool;
  }
  

  return {
    loadDetailPage: execute,
    isLoading,
    state,
    updateDirty
  }
}


const [p, i] = createInjectionState(useDetailPage);

export {
  p as provideDetailPage,
  i as injectDetailPage,
}