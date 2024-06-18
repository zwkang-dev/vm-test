import { mockDelay } from './utils';
import { useAsyncState } from '@vueuse/core'
import { MessagePlugin} from 'tdesign-vue-next';
import { injectDetailPage } from './use-detail-page';
import { computed } from 'vue';
import { DialogPlugin } from 'tdesign-vue-next';
import { injectActions } from './use-actions-provider';
import { useSplitDetailPage } from './use-split-detail-page';

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
export function usePublish() {
  const { state, updateDirty } = injectDetailPage()!;

  const { useValue } = injectActions()!;
  const saveCommand = useValue('save-command')
  const { dirty } = useSplitDetailPage();

  const { execute, isLoading } = useAsyncState(async () => {
    await mockDelay(3000);

  }, null, {
    immediate: false,
    onError: (e) => {
      if(e instanceof Error) {
        MessagePlugin.error(e.message)
      }
    }
  })

  async function handlePublish() {
    if(saveCommand.value.loading) {
      return MessagePlugin.warning('正在保存，请稍后重试')
    }

    // 发布前先执行一下保存
    if(dirty.value) {
      await saveCommand.value.action()

      updateDirty(false);


      setTimeout(() => {
        updateDirty(true);
      }, 10000)
    }
    await execute(100)

    const params = {
      id: state.value.id,
      nodes: state.value.nodes,
      canvasHistoryId: state.value.canvasHistoryId,
      flowStatus: state.value.flowStatus,
      ext: state.value.ext,
    }
    MessagePlugin.success('发布成功')
    console.log('params: ', params);

  }

  return {
    action: handlePublish,
    loading: isLoading,
    label: {
      form: '在表单里发布',
      toolbar: '发布',
    },
    icon: {
      form: 'palette',
      toolbar: 'sneer',
    }
  }
}
