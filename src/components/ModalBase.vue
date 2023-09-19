<script lang="ts" setup>
import { ref, useSlots, onMounted } from "vue";
import { getScrollbarWidth, hasVerticalScrollbar } from "@/utils/scrollbar";

export interface Props {
  modelValue: boolean;
}

const emits = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const props = defineProps<Props>();

const slots = useSlots();
const scrollbarWidth = ref(0);

const onHide = () => {
  emits("update:modelValue", false);
};

onMounted(() => {
  scrollbarWidth.value = getScrollbarWidth();

  if (props.modelValue) {
    onBeforeEnter();
  }
});

const onBeforeEnter = () => {
  document.body.style.overflow = "hidden";

  if (hasVerticalScrollbar()) {
    document.body.style.paddingRight = scrollbarWidth.value + "px";
  }
};

const onAfterLeave = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};
</script>

<template>
  <Transition
    name="modal"
    @before-enter="onBeforeEnter"
    @after-leave="onAfterLeave"
  >
    <div class="modal-base" v-if="modelValue" @click="onHide">
      <div class="modal-base__wrap" @click.stop>
        <div class="modal-base__content">
          <div v-if="slots.head" class="modal-base__head">
            <slot name="head" />
          </div>

          <div class="modal-base__body">
            <slot />
          </div>

          <div v-if="slots.foot" class="modal-base__foot">
            <slot name="foot" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal-base {
  width: 100%;
  height: 100%;
  padding: 40px 15px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $color-excess;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  &__wrap {
    max-width: 540px;
    margin: 0 auto;
    background-color: $color-white;
    border-radius: 10px;
    position: relative;
    z-index: 1;
  }

  &__head {
    padding: 40px 40px 20px 40px;
    border-bottom: 1px solid $color-general;
  }

  &__body {
    padding: 40px 40px 24px 40px;
  }

  &__foot {
    border-top: 1px solid $color-general;
    padding: 40px 40px 24px 40px;
  }
}

.modal-enter-active,
.modal-leave-active {
  opacity: 1;
  transition: opacity 0.5s ease 0s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
