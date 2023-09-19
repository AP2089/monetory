<script lang="ts" setup>
export interface Props {
  isLoading: boolean;
}

defineProps<Props>();
</script>

<template>
  <Transition name="loader">
    <div class="loader" v-if="isLoading">
      <div class="loader__spinner"></div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin: 20px auto 0 auto;
    background-color: $color-global;
    box-shadow: 0 0 10px 0 $color-excess;
    border-radius: 5px;

    &:before {
      content: "";
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 3px solid;
      border-color: $color-white;
      border-right-color: $color-primary;
      animation: loader 1s infinite linear;
    }
  }
}

@keyframes loader {
  to {
    transform: rotate(1turn);
  }
}

.loader-enter-active,
.loader-leave-active {
  transform: translateY(0);
  transition: transform 0.5s ease 0s;
}

.loader-enter-from,
.loader-leave-to {
  transform: translateY(-100px);
}
</style>
