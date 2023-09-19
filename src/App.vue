<script setup lang="ts">
import { onMounted } from "vue";
import Sprite from "@/components/Sprite.vue";
import Loader from "@/components/Loader.vue";
import TagsModal from "@/components/TagsModal.vue";
import ButtonBase from "@/components/ButtonBase.vue";
import useTags from "@/stores/tags";

const tags = useTags();

onMounted(() => {
  tags.onFetch();
});
</script>

<template>
  <Sprite />
  <Loader :isLoading="tags.isLoading" />

  <div class="container">
    <ButtonBase @click="tags.onModalToggle(true)">Добавить теги</ButtonBase>
  </div>

  <TagsModal
    v-model="tags.isShow"
    v-model:phrase="tags.phrase"
    :searchItems="tags.searchItems"
    :selectedItems="tags.selectedItems"
    @onSave="tags.onSave"
    @onCancel="tags.onCancel"
    @onAdd="tags.onAdd"
    @onRemove="tags.onRemove"
  />
</template>

<style lang="scss" scoped>
.container {
  padding: 30px 15px;
  display: flex;
  justify-content: center;
}
</style>
