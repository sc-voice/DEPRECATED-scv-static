<template>
  <div v-if="examples">
    <v-autocomplete 
      ref="refSearchAuto"
      v-model="search"
      :items="searchItems"
      :search-input.sync="search"
      :filter="searchFilter"
      clearable
      @input="onSearchInput($event)"
    ></v-autocomplete>
    <div class="scv-inspire-row">
      <v-btn @click="clickInspireMe()"
        role="button"
        color="primary"
        :aria-label="$t('inspireMe')"
        class="scv-inspire " :style="cssVars" small>
        {{$t('inspireMe')}}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import examples from '../api/examples.json';
const GITHUB = 'https://raw.githubusercontent.com';

export default {
  components: {
  },
  props: {
  },
  data: function(){
    return {
      examples: null,
      search: '',
    };
  },
  async mounted() {
    let { $vuetify, } = this;
    let lang = ($vuetify.lang.current||'noLanguage').split('-')[0];
    let url = `${GITHUB}/sc-voice/scv-examples/main/api/examples.json`;
    let exLang = `no-examples ${lang}`;
    try {
      let res = await this.$axios.get(url);
      Vue.set(this, 'examples', res.data);
      console.log(`examples loaded: ${Object.keys(res.data)}`);
    } catch(e) {
      Vue.set(this, 'examples', examples);
      console.warn(`${e.message} => using default examples:${Object.keys(res.data)}`);
    }
  },
  methods:{
    $t(key) {
      let { 
        $vuetify,
      } = this;
      return $vuetify.lang.t(`$vuetify.scv.${key}`);
    },
    onSearchInput(value) {
      console.log(`onSearchInput emit:${value}`);
      this.$emit("search-text", value);
    },
    searchFilter(item, queryText, itemText) {
      let it = itemText.toLowerCase();
      let qt = queryText.toLowerCase();
      return it.indexOf(qt) >= 0;
    },
    clickInspireMe() {
      let { 
        $vuetify,
        examples, 
      } = this;
      let that = this;
      let langEx = examples[$vuetify.lang.current] || examples.en;
      let iExample = Math.trunc(Math.random() * langEx.length);
      let eg = langEx[iExample];
      Vue.set(this, "search", eg);
      this.$nextTick(()=>{
        that.onSearchInput(eg);
      });
      console.log('clickInspireMe', eg);
    },
  },
  computed: {
    cssVars() {
      return {
        //"--seg-text-width": this.segTextWidth,
        //'--success-color': this.$vuetify.theme.success,
      }
    },
    searchItems() {
      let { $vuetify, } = this;
      var search = (this.search||'').toLowerCase();
      var langEx = this.examples[$vuetify.lang.current] || this.examples.en;
      var examples = search
        ? langEx.filter(ex=>ex.toLowerCase().indexOf(search)>=0)
        : langEx;
      return !search || examples.includes(this.search) 
        ? [ ...examples ]
        : [`${this.search}`, ...examples];
    },
  },
}
</script>
<style>
.scv-inspire {
    margin-left: 1px;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 1em;
    text-transform: none;
    font-size: 12px;
    border: 1px solid #383838;
    height: 24px;
    //background: #212121 !important;
}
.scv-inspire:focus {
    border: 1pt solid #888;
    border-color: #82B1FFa;
    outline: 1pt solid #82B1FF;
}
.scv-inspire-row {
    margin: -0.8em 0 0.5em 0;
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>
