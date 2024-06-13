import { createInjectionState } from '@vueuse/core'
import { ref } from 'vue'

function useShareLoadings() {
  const loadings = ref({
    save: false,
    publish: false,
    compile: false,
    preview: false,
  })

  return {
    loadings,
  }
}

const [p, i] = createInjectionState(useShareLoadings);

export {
  p as provideShareLoadings,
  i as injectShareLoadings,
}