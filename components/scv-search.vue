<template>
  <v-autocomplete v-if="examples"
    ref="refSearchAuto"
    v-model="search"
    :items="searchItems"
    :search-input.sync="search"
    :filter="searchFilter"
    clearable
    @input="onSearchInput($event)"
  ></v-autocomplete>
</template>

<script>
import Vue from 'vue';
import examples from '../api/examples.json';

export default {
  components: {
  },
  data: function(){
    return {
      examples: 'tbd',
      search: '',
    };
  },
  mounted() {
    let {
        language,
    } = this.g;
    let lang = (language||'noLanguage').split('-')[0];
    Vue.set(this, "examples", examples[lang] || `no-examples ${lang}`);
  },
  methods:{
    onSearchInput(value) {
      console.log(`onSearchInput`, value, this.search);
    },
    searchFilter(item, queryText, itemText) {
      let it = itemText.toLowerCase();
      let qt = queryText.toLowerCase();
      return it.indexOf(qt) >= 0;
    }
  },
  computed: {
    g() {
        return this.$g || {};
    },
    searchItems() {
      var slt = (this.search||'').toLowerCase();
      var examples = slt
        ? this.examples.filter(ex=>ex.toLowerCase().indexOf(slt)>=0)
        : this.examples;
      return !slt || examples.includes(this.search) 
        ? [ ...examples ]
        : [`${this.search}`, ...examples];
    },
  },
}
</script>
