<template>
  <v-sheet light class="desktop" >
    <div class="desktop-nav">
      <div class="text-h6">Sample Desktop Layout</div>
      <scv-settings dark :js="js" 
        :monolingual="monolingual"
        :version="`version ${version}`"
        />
    </div>
    <div class="desktop-search">
      <scv-search-field :js="js"
        v-on:search-text="search"
      />
      <scv-results :js="js"/>
    </div>
    <scv-sutta :js="js" />
  </v-sheet>
</template>

<script>
import Vue from 'vue';
import { ScvVue } from '../index';
let {
  ScvSearchField,
  ScvResults,
  ScvSettings,
  ScvSutta,
} = ScvVue;

const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka: require('scv-bilara/src/tipitaka'),
}

export default {
  components: {
    ScvSearchField,
    ScvResults,
    ScvSutta,
    ScvSettings,
  },
  data: function(){
    return {
      panels: [0,1],
      monolingual: 'de',
    };
  },
  mounted() {
  },
  methods:{
    search(value) {
      console.log(`search:`, value);
    },
    githubUrl(path) {
      return `https://github.com/sc-voice/scv-static/blob/main/${path}`;
    },
  },
  computed: {
    version() {
      return require('../package.json').version;
    },
    js() { 
      return JS;
    },
  },
}
</script>
<style>
.v-application code {
  background-color: #000;
}

.desktop-search {
  xmax-width: 28rem;
}

.desktop-nav {
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  background-color: #eee;
}

.desktop {
  display: flex;
  flex-flow: column;
  align-items: center;
}

</style>
