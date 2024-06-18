<script lang="ts" setup>
import { watch, computed, defineEmits, defineProps, toRef, toRefs, ref } from "vue";
import { useNodeForm } from "./hook";

interface IProps {
  formData: any;
}

const props = defineProps<IProps>();
const { formData } = toRefs(props);
const emits = defineEmits(['submit', 'cancel'])

// const { toggle, isActive } = injectPollingFlowStatus()!;
// const text = computed(() => (isActive.value ? "停止轮询" : "开始轮询"));

const formRef = ref();
const { getFormData, formData: FormData, setFormData, handleDayChange } = useNodeForm();

watch(formData, (newVal) => {
  setFormData(newVal);
});

const options = [
  { label: '天', value: 0 },
  { label: '周', value: 1 },
  { label: '月', value: 2 },
];

defineExpose({
  getValues: () => {
    return {
      edges: [],
      flowExt: {},
      nodes: [getFormData()],
    }
  }
})
</script>

<template>
  <div class="w-[300px] flex flex-col mt-2">
    <t-form class="mt-2" ref="formRef">
      <t-form-item label="用户名">
        <t-input v-model="FormData.user" placeholder="请填写用户名"></t-input>
      </t-form-item>
      <t-form-item label="周期">
        <t-select v-model="FormData.date" @change="handleDayChange" :options="options" />
      </t-form-item>
      <t-form-item label="自定义输入">
        <t-input v-model="FormData.detail" placeholder="请填写自定义输入" />
      </t-form-item>
      <div class="flex flex-row items-center justify-center" >

        <t-button @click="() => emits('submit', getFormData())" class="mr-2">提交</t-button>
        <t-button @click="$emit('cancel')">取消</t-button>
      </div>
    </t-form>
  </div>

  <div>
    formdata: {{ FormData }}
  </div>
</template>

<style lang="scss" scoped></style>
