import { computed } from "vue";
import { injectDetailPage } from "./use-detail-page";


export function useSplitDetailPage() {
  const { state } = injectDetailPage()!; 

  return {
    currentUsers: computed(() => state.value.ext.createUsers),
    inChargeUsers: computed(() => state.value.ext.inChargeUsers),

    currentId: computed(() => state.value.id),
    currentVersion: computed(() => state.value.ext.version || '1.0.0'),
  }
}