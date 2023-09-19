import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { useToast } from "vue-toastification";
import { TagsData, TagsKit, TagsStore, TagsError } from "./tags.d";
import { getTagsData } from "@/data/tags";
import { LOCAL_STORE } from "@/config";

const useTags = defineStore("tags", (): TagsStore => {
  const isShow = ref(false);
  const phrase = ref("");
  const items = ref<TagsData[]>([]);
  const selectedItems = ref<TagsKit[]>([]);
  const isLoading = ref(false);
  const notification = useToast();

  const savedItems = ref<TagsKit[]>(
    JSON.parse(localStorage.getItem(LOCAL_STORE) || "[]")
  );

  const searchItems = computed(() => {
    if (phrase.value.length === 0) {
      return [];
    }

    const searchValue = phrase.value.toLocaleLowerCase();
    const searchResult: TagsKit[] = [];

    items.value.forEach((item) => {
      item.categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          subcategory.tags.forEach((tag) => {
            const isTagAdd = selectedItems.value.find((selectedItem) => {
              return selectedItem.id === tag.id;
            });

            if (!isTagAdd) {
              const name = tag.name.toLowerCase();

              const aliases = tag.aliases.filter((alias) => {
                return alias.toLowerCase().startsWith(searchValue);
              });

              if (name.startsWith(searchValue) || aliases.length > 0) {
                const isTagSearch = searchResult.find((searchItem) => {
                  return searchItem.id === tag.id;
                });

                if (!isTagSearch) {
                  searchResult.push({
                    id: tag.id,
                    name: tag.name,
                  });
                }
              }
            }
          });
        });
      });
    });

    return searchResult;
  });

  const onFetch = async () => {
    try {
      isLoading.value = true;

      const data = await getTagsData();
      items.value = data as TagsData[];
    } catch (e: unknown) {
      notification.error((e as TagsError).error);
    } finally {
      isLoading.value = false;
    }
  };

  const onSave = () => {
    savedItems.value = selectedItems.value;
    localStorage.setItem(LOCAL_STORE, JSON.stringify(savedItems.value));
    onModalToggle(false);
    phrase.value = "";
  };

  const onCancel = () => {
    onModalToggle(false);
    phrase.value = "";
  };

  const onModalToggle = (payload: boolean) => {
    isShow.value = payload;
    selectedItems.value = isShow.value ? [...savedItems.value] : [];
  };

  const onAdd = (payload: TagsKit) => {
    if (!selectedItems.value.find((item) => item.id === payload.id)) {
      selectedItems.value.push(payload);
    }
  };

  const onRemove = (payload: TagsKit) => {
    selectedItems.value = selectedItems.value.filter((item) => {
      return item.id !== payload.id;
    });
  };

  return {
    isShow,
    phrase,
    searchItems,
    selectedItems,
    isLoading,
    onFetch,
    onModalToggle,
    onSave,
    onCancel,
    onAdd,
    onRemove,
  };
});

export default useTags;

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTags, import.meta.hot));
}
