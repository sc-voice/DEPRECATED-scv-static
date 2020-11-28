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
const GITHUB = 'https://raw.githubusercontent.com';

export default {
  components: {
  },
  data: function(){
    return {
      examples: 'tbd',
      search: '',
    };
  },
  async mounted() {
    let {
        language,
    } = this.g;
    let lang = (language||'noLanguage').split('-')[0];
    let url = `${GITHUB}/sc-voice/scv-examples/main/api/examples.json`;
    let exLang = `no-examples ${lang}`;
    try {
      let res = await this.$axios.get(url);
      exLang = res.data[lang] || exLang;
      console.log(`current examples loaded ${lang}:${exLang.length}`);
    } catch(e) {
      exLang = examples[lang] || exLang;
      console.warn(`${e.message} => using default examples ${lang}:${exLang.length}`);
    }
    Vue.set(this, "examples", exLang);
  },
  methods:{
    onSearchInput(value) {
      console.log(`onSearchInput emit:${value}`);
      this.$emit("search-text", value);
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
      var search = (this.search||'').toLowerCase();
      var examples = search
        ? this.examples.filter(ex=>ex.toLowerCase().indexOf(search)>=0)
        : this.examples;
      return !search || examples.includes(this.search) 
        ? [ ...examples ]
        : [`${this.search}`, ...examples];
    },
  },
}
</script>
