<script lang="ts" setup>
import ButtonClose from "@/components/ButtonClose.vue";

export interface Item {
  id: number;
  name: string;
}

export interface Props {
  items: Item[];
  variant?: "add" | "remove";
}

withDefaults(defineProps<Props>(), {
  variant: "add",
});

const emits = defineEmits<{
  (event: "onAdd", value: Item): void;
  (event: "onRemove", value: Item): void;
}>();

const onAdd = (payload: Item) => {
  emits("onAdd", payload);
};

const onRemove = (payload: Item) => {
  emits("onRemove", payload);
};
</script>

<template>
  <ul class="list-base">
    <li v-for="item in items" :key="item.id" class="list-base__item">
      <button
        v-if="variant === 'add'"
        type="button"
        class="list-base__btn list-base__btn_add"
        @click="onAdd(item)"
      >
        {{ item.name }}
      </button>

      <div v-else class="list-base__btn">
        {{ item.name }}
        <ButtonClose @click="onRemove(item)" />
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list-base {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  &__item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 8px 9px 0;
    padding: 0;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 12px;
    background-color: $color-extra;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: $color-factory;

    &_add {
      border: 1px solid $color-extra;
      cursor: pointer;
      transition: background-color 0.5s ease 0s;

      &:hover {
        background-color: $color-white;
      }
    }
  }

  :deep(.button-close) {
    margin-left: 5px;
  }
}
</style>
