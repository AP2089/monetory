<template>
  <button type="button" class="button-close">
    <svg class="button-close__icon">
      <use xlink:href="#close"></use>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.button-close {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  padding: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-color: transparent;
  opacity: 1;
  transition: opacity 0.5s ease 0s;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &__icon {
    width: 10px;
    height: 10px;
    color: $color-global;
  }

  &:disabled {
    cursor: default !important;
    opacity: 0.3 !important;
  }
}
</style>
