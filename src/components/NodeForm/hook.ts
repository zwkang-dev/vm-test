import { ref } from 'vue';

enum Date {
  day,
  week,
  month
}

type Recordable = Record<string, any>;

export function useNodeForm() {
  const formData = ref({
    user: '' as string,
    date: Date.day as Date,

    detail: null as any
  })

  function handleDayChange() {
    formData.value.detail = null;
  }

  function setFormData(data: Recordable) {
    formData.value.user = data.user;
    formData.value.date = data.date;
    formData.value.detail = data.detail;
  }

  function getFormData() {
    console.log(formData.value)
    return formData.value;
  }

  return {
    formData,

    handleDayChange,

    getFormData,
    setFormData,
  }
}