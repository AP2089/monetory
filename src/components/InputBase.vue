<script lang="ts" setup>
import { computed } from "vue";

export interface Props {
  placeholder: string;
  modelValue: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});
</script>

<template>
  <label class="input-base">
    <input type="text" class="input-base__field" v-model="value" />
    <div class="input-base__placeholder">{{ placeholder }}</div>
  </label>
</template>

<style lang="scss" scoped>
.input-base {
  display: block;
  position: relative;

  &__field {
    display: block;
    width: 100%;
    height: 48px;
    background-color: $color-white;
    border: 2px solid $color-primary;
    border-radius: 8px;
    padding: 0 17px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }

  &__placeholder {
    max-width: calc(100% - 32px);
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: $color-primary;
    padding: 0 4px;
    background-color: $color-white;
    transform: translateY(-50%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    top: 0;
    left: 16px;
    z-index: 1;
  }
}
</style>
