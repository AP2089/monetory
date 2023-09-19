<script lang="ts" setup>
export interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary";
}

withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "default",
});
</script>

<template>
  <button :type="type" :class="['button-base', `button-base_${variant}`]">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  outline: none;
  padding: 5px 16px;
  height: 40px;
  cursor: pointer;
  text-decoration: none;
  opacity: 1;
  transition: color 0.5s ease 0s, background-color 0.5s ease 0s,
    opacity 0.5s ease 0s;

  &:hover {
    text-decoration: none;
  }

  &_default {
    border-color: $color-primary;
    background-color: $color-primary;
    color: $color-white;

    &:hover:not(:disabled) {
      color: $color-primary;
      background-color: $color-white;
    }
  }

  &_primary {
    border-color: $color-extra;
    background-color: $color-extra;
    color: $color-global;

    &:hover:not(:disabled) {
      color: $color-global;
      background-color: $color-white;
    }
  }

  &:disabled {
    cursor: default !important;
    opacity: 0.7 !important;
  }
}
</style>
