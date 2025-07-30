import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchText: null,
  }),
  
  getters: {
    // Add getters if needed
  },
  
  actions: {
    setSearchText(searchText) {
      this.searchText = searchText;
      return searchText;
    },
  }
});
