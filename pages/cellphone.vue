<template>
  <div>
    <div class="text-h5"> Cell Phone</div>
    <scv-search-field
      :lang="lang"
      v-on:search-text="search"
    />
    <scv-results :lang="lang" />
    <scv-sutta />
    <v-expansion-panels multiple accordion flat v-model="panels">
      <v-expansion-panel >
        <v-expansion-panel-header>
          scv-settings
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5">
            <scv-settings />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            ScvSettings is menu for Voice settings
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script>
import Vue from 'vue';
import ScvSearchField from '~/components/scv-search-field.vue';
import ScvResults from '~/components/scv-results.vue';
import ScvSutta from '~/components/scv-sutta.vue';
import ScvSettings from '~/components/scv-settings.vue';

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
      lang: 'de',
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
    langItems() {
      return [
        { text: 'English', value: 'en', },
        { text: 'Deutsch', value: 'de', },
      ];
    },
  },
}
</script>
<style>
.v-application code {
  background-color: #000;
}

button.v-expansion-panel-header,    
.v-expansion-panel-content > div { 
  padding-left: 0.2em;
  padding-right: 0.2em;
}
.v-expansion-panel > .v-expansion-panel-header {
  background: linear-gradient(to bottom, #555, rgb(30,30,30));
  min-height: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.ex-more {
  width: 2em;
  margin-left: auto;
  margin-right: auto;
}

</style>
