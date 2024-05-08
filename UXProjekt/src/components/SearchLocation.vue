<template>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        placeholder="Sök plats..."
      />
      <ul v-if="showSuggestions && suggestions.length">
        <li v-for="suggestion in suggestions" :key="suggestion.place_id" @click="selectLocation(suggestion)">
          {{ suggestion.display_name }}
        </li>
      </ul>
      <div v-if="error">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script>
  import { useNominatimSearch } from "@/scripts/useNominatimSearch";
  import debounce from "lodash/debounce";
  
  export default {
    data() {
      return {
        searchQuery: '',
        suggestions: [],
        showSuggestions: true,
        error: null
      };
    },
    methods: {
      async fetchSuggestions() {
        if (this.searchQuery.length > 2) {
          const { results, error } = await useNominatimSearch(this.searchQuery);
          if (error) {
            this.error = error;
            this.suggestions = [];
          } else {
            this.suggestions = results;
          }
        } else {
          this.suggestions = [];
        }
      },
      handleInput() {
        this.debouncedFetchSuggestions();
      },
      selectLocation(suggestion) {
        this.searchQuery = suggestion.display_name;
        this.showSuggestions = false;
        console.log(`Selected location: Latitude ${suggestion.lat}, Longitude ${suggestion.lon}`);
      }
    },
    created() {
      this.debouncedFetchSuggestions = debounce(this.fetchSuggestions, 300);
    }
  };
  </script>
  
  