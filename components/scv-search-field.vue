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
        class="scv-inspire " :style="cssVars" small>
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
      seeker: null,
    };
  },
  async mounted() {
    let { $vuetify, $store, } = this;
    $store.dispatch('scv/loadExamples');
    this.seeker = new BilaraWeb({fetch});
  },
  methods:{
    async onSearchInput(pattern) { try {
      let noValue = {mlDocs:[]};
      let value = pattern && (await this.seeker.find({
        pattern, 
        lang: this.$vuetify.lang.current,
      })) || noValue;
      value.mlDocs.forEach(mld=>{
        mld.segments = Object.keys(mld.segMap).map(scid=>mld.segMap[scid]);
      });
      this.$store.commit('scv/searchResults', value);
      if (value.mlDocs.length === 1) {
        let { sutta_uid } = value.mlDocs[0];
        let lang = this.$vuetify.lang.current;
        this.$store.dispatch('scv/loadSutta', {sutta_uid, lang} );
      }
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
