<script setup lang="ts">
import { computed } from "vue";
import ModalBase from "@/components/ModalBase.vue";
import ButtonBase from "@/components/ButtonBase.vue";
import InputBase from "@/components/InputBase.vue";
import ListBase from "@/components/ListBase.vue";

export interface Item {
  id: number;
  name: string;
}

export interface Props {
  modelValue: boolean;
  phrase: string;
  searchItems: Item[];
  selectedItems: Item[];
  maxLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxLength: 20,
});

const emits = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "update:phrase", value: string): void;
  (event: "onAdd", value: Item): void;
  (event: "onRemove", value: Item): void;
  (event: "onSave"): void;
  (event: "onCancel"): void;
}>();

const isShow = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});

const phraseValue = computed({
  get: () => props.phrase,
  set: (val) => emits("update:phrase", val),
});

const counter = computed(() => {
  return props.maxLength - props.selectedItems.length;
});

const isSearchItems = computed(() => {
  return props.searchItems.length > 0;
});

const isSelectedItems = computed(() => {
  return props.selectedItems.length > 0;
});

const isPhrase = computed(() => {
  return phraseValue.value.length > 0;
});

const onSave = () => {
  emits("onSave");
};

const onCancel = () => {
  emits("onCancel");
};

const onAdd = (payload: Item) => {
  if (props.maxLength > props.selectedItems.length) {
    emits("onAdd", payload);
  }
};

const onRemove = (payload: Item) => {
  emits("onRemove", payload);
};
</script>

<template>
  <ModalBase v-model="isShow" class="tags-modal" @update:modelValue="onCancel">
    <template #head>
      <h4 class="tags-modal__heading">Добавление тегов</h4>
      <div class="tags-modal__caption">
        Вы можете добавить ещё
        <span class="tags-modal__counter">{{ counter }}</span>
      </div>
    </template>

    <InputBase
      placeholder="Название тега"
      v-model="phraseValue"
      class="tags-modal__field"
    />

    <ListBase
      v-if="isSearchItems && isPhrase"
      :items="searchItems"
      @onAdd="onAdd"
    />

    <div v-if="!isSearchItems && isPhrase" class="tags-modal__noresult">
      По запросу ничего не найдено
    </div>

    <ListBase
      v-if="isSelectedItems"
      :items="selectedItems"
      variant="remove"
      class="tags-modal__saved"
      @onRemove="onRemove"
    />

    <template #foot>
      <div class="tags-modal__buttons">
        <ButtonBase @click="onSave">Сохранить</ButtonBase>
        <ButtonBase variant="primary" @click="onCancel">Отмена</ButtonBase>
      </div>
    </template>
  </ModalBase>
</template>

<style lang="scss" scoped>
.tags-modal {
  &__field {
    margin-bottom: 20px;
  }

  &__counter {
    color: $color-factory;
    font-weight: 600;
  }

  &__noresult {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: $color-base;
  }

  &__saved {
    margin: 24px -40px 0 -40px;
    border-top: 1px solid $color-general;
    padding: 24px 40px 0 40px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    :deep(.button-base) {
      min-width: 110px;
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
