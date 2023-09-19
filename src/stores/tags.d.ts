import { Ref } from "vue";

export interface TagsKit {
  id: number;
  name: string;
}

export interface TagsTags {
  id: number;
  name: string;
  aliases: string[];
}

export interface TagsSubcategories {
  id: number;
  name: string;
  tags: TagsTags[];
}

export interface TagsCategories {
  id: number;
  name: string;
  subcategories: TagsSubcategories[];
}

export interface TagsData {
  id: number;
  name: string;
  categories: TagsCategories[];
}

export interface TagsStore {
  isShow: Ref<boolean>;
  phrase: Ref<string>;
  searchItems: Ref<TagsKit[]>;
  selectedItems: Ref<TagsKit[]>;
  isLoading: Ref<boolean>;
  onFetch: () => Promise<void>;
  onModalToggle: (payload: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
  onAdd: (payload: TagsKit) => void;
  onRemove: (payload: TagsKit) => void;
}

export interface TagsError {
  error: string;
}
