<template>
  <div v-if="displayable" class="pl-1">
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
        class="scv-text-btn " :style="cssVars" small>
        {{$t('inspireMe')}}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
const GITHUB = 'https://raw.githubusercontent.com';
const BilaraWeb = require('~/src/bilara-web');

export default {
  components: {
  },
  props: {
  },
  data: function(){
    return {
      bilaraWeb: null,
    };
  },
  async mounted() {
    let { $vuetify, $store, $refs } = this;
    $store.dispatch('scv/loadExamples');
    this.bilaraWeb = new BilaraWeb({fetch});
    this.$nuxt.$on('scv-load-example', payload => {
        let { $el:refSearchAuto } = $refs['refSearchAuto'] || {};
        refSearchAuto && refSearchAuto.scrollIntoView({
            block: "center",
        });
    });
  },
  methods:{
    async onSearchInput(pattern='') { try {
      let { bilaraWeb, lang } = this;
      let noValue = {mlDocs:[]};
      pattern = pattern.toLowerCase().trim();
      let slashParts = pattern.split('/');
      if (bilaraWeb.suidMap[slashParts[0]]) {
        let sutta_uid = slashParts[0];
        slashParts[1] && (lang = slashParts[1]);
        this.$store.dispatch('scv/loadSutta', {sutta_uid, lang} );
        return;
      }

      console.log(`dbg dispatch scv/loadExample`, {pattern, lang});
      this.$store.dispatch('scv/loadExample', {pattern, lang});
      /*
      let value = pattern && (await bilaraWeb.find({
        pattern, 
        lang,
      })) || noValue;
      value.mlDocs.forEach(mld=>{
        mld.segments = Object.keys(mld.segMap).map(scid=>mld.segMap[scid]);
      });
      this.$store.commit('scv/searchResults', value);
      if (value.mlDocs.length === 1) {
        let { sutta_uid } = value.mlDocs[0];
        this.$store.dispatch('scv/loadSutta', {sutta_uid, lang} );
      }
      */
    } catch(e) {
      console.error(`onSearchInput(${pattern})`, e.message);
    }},
    searchFilter(item, queryText, itemText) {
      let it = itemText.toLowerCase();
      let qt = queryText.toLowerCase();
      return it.indexOf(qt) >= 0;
    },
    clickInspireMe() {
      let { 
        $vuetify,
        examples, 
        lang,
        locale,
      } = this;
      let that = this;
      let langEx = examples[lang] || examples[locale] || examples.en;
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
    lang() {
        return this.$store.state.scv.settings.lang;
    },
    locale() {
        return this.$store.state.scv.settings.locale;
    },
    displayable() {
        return !!this.$store.state.scv.examplesLoaded;
    },
    examples() {
        return this.$store.state.scv.examples;
    },
    search: {
        get: function() { return this.$store.state.scv.search },
        set: function(value) { this.$store.commit('scv/search', value); },
    },
    cssVars() {
      return {
        //"--seg-text-width": this.segTextWidth,
        //'--success-color': this.$vuetify.theme.success,
      }
    },
    searchItems() {
      let { $vuetify, lang, locale, } = this;
      var search = (this.search||'').toLowerCase();
      var langEx = this.examples[lang] || this.examples[locale] || this.examples.en;
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
</style>
