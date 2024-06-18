import { createInjectionState } from "@vueuse/core";
import { ref } from 'vue';

type ReturnValues = {
  nodes: any[];
  edges: any[];
  flowExt: any;
}

type MaybePromise<T> = T | Promise<T>;

type ContentType<T extends 'canvas' | 'form'> = T extends 'canvas' ? {
  validate: () => MaybePromise<boolean>
  getValues: () => MaybePromise<ReturnValues>;
} :  T extends 'form' ? {
  validate: () => MaybePromise<boolean>;
  getValues: () => MaybePromise<ReturnValues>;
} : never;



export function useContent() {
  const contentRef = ref<ContentType<'canvas'> | ContentType<'form'> | null>(null)

  return {
    content: contentRef,
  }
}

const [p, i] = createInjectionState(useContent);

export {
  p as provideContent,
  i as injectContent,
}