import { createInjectionState } from "@vueuse/core";
import { computed, ref } from "vue";
import { get } from 'lodash-es'

type ActionType = {
  label: Record<string, string>;
  icon: string | Record<string, string>;
  action: () => Promise<any> | any;
}


function useActionsProvider() {
  const actions = ref<Record<string, ActionType>>({});

  function register(id: string, cb: any) {
    const val = cb();
    actions.value[id] = val;

    return val;
  }

  function useValue(path: string) {
    return computed(() => get(actions.value, path));
  }

  return {
    register,
    useValue,
  }
}

const [p, i] = createInjectionState(useActionsProvider);

export {
  p as provideActions,
  i as injectActions,
}