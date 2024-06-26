import { mockDelay } from './utils';
import { useAsyncState } from '@vueuse/core'
import { Message, MessagePlugin} from 'tdesign-vue-next';
import { injectDetailPage } from './use-detail-page';
import { computed } from 'vue';
import { DialogPlugin } from 'tdesign-vue-next';

// const auditAction = DialogPlugin({
//   header: '测试一下modal',
//   onConfirm: () => {
//     auditAction.hide();
//   }
// })
// 模拟弹窗
function useModal(type: 'fail' | 'success' = 'fail') {
  if(type === 'fail') {
    return Promise.reject(new Error('用户弹窗关闭'))
  }

  return Promise.resolve({
    description: '用户填写的用户信息',
    user: 'zwkang'
  })
}



// 保存操作
export function useSave() {
  const { state } = injectDetailPage()!;
  const disabled = computed(() => state.value.flowStatus === 1);

  const { execute, isLoading } = useAsyncState(async () => {

    await mockDelay(3000);

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
    if(disabled.value) {
      MessagePlugin.warning('禁用中 不允许保存')
      throw new Error('禁用中 不允许保存')
    }
    await execute(100)

    const params = {
      id: state.value.id,
      nodes: state.value.nodes,
      canvasHistoryId: state.value.canvasHistoryId,
      flowStatus: state.value.flowStatus,
      ext: state.value.ext,
    }

    console.log('params: ', params);
    MessagePlugin.success('保存成功')
  }

  return {
    action: handleSave,
    loading: isLoading,
    disabled,
    label: {
      form: '在表单里保存',
      toolbar: '保存',
    },
    icon: {
      form: 'sneer',
      toolbar: 'palette',
    }
  }
}
