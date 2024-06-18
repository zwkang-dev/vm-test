import { injectDetailPage } from "./use-detail-page";
import { useTimeoutPoll, createInjectionState } from '@vueuse/core'
import { mockDelay } from "./utils";

function usePollingFlowStatus() {
  const { state } = injectDetailPage()!;

  async function pollingUpdateDetailPageStatus() {
    await mockDelay(2000)
    state.value.flowStatus = Math.floor(Math.random() * 4)
  }

  const {
    resume,
    pause,
    isActive,
  } = useTimeoutPoll(pollingUpdateDetailPageStatus, 2000)

  function togglePolling() {
    if(isActive.value) {
      pause()
    } else {
      resume()
    }
  }
  
  return {
    resume,
    pause,
    isActive,
    toggle: togglePolling
  }
}

const [p, i] = createInjectionState(usePollingFlowStatus);

export {
  p as providePollingFlowStatus,
  i as injectPollingFlowStatus,
}