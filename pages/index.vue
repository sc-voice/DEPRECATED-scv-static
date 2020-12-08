<template>
  <div>
    <div class="text-h5"> Vue Components </div>
    <v-select :items="langItems" filled 
      v-model="$vuetify.lang.current" 
      label="Language" 
    />

    <v-expansion-panels multiple accordion flat v-model="panels">

      <v-expansion-panel >
        <v-expansion-panel-header>
          scv-search-field
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5">
            <scv-search-field
              :lang="lang"
              v-on:search-text="search"
            />
          </v-sheet>
          <details><summary>...</summary>
            ScvSearchField is an auto-completion text field that accepts
            Suttacentral sutta references as well as arbitrary search strings.
            Search strings are automatically completed with 
            <a :href="githubUrl('api/examples.json')"
              target="_blank">
              examples.json
            </a>. 
            It emits the <code>search-text</code> event with the search text as its value
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          scv-results
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5" style="min-width:22em; ">
            <scv-results :lang="lang" />
          </v-sheet>
          <details><summary>...</summary>
            ScvResults displays multiple search results.
            It listens for the <code>search-text</code> event.
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          scv-sutta
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card light class="mt-5">
            <scv-sutta />
          </v-card>
          <details><summary>...</summary>
            ScvSutta displays a single sutta
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel >
        <v-expansion-panel-header>
          scv-settings
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5">
            <scv-settings />
          </v-sheet>
          <details><summary>...</summary>
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
      panels: [0,1,2],
      lang: 'de',
    };
  },
  mounted() {
    let { $vuetify } = this;
    console.log(`dbg index mounted`, Object.keys($vuetify), $vuetify.lang);
  },
  methods:{
    search(value) {
      console.log(`search:`, value);
    },
    githubUrl(path) {
      return `https://github.com/sc-voice/scv-examples/blob/main/${path}`;
    },
  },
  computed: {
    g() {
        return this.$g || {};
    },
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

/*
button.v-expansion-panel-header,    
.v-expansion-panel-content > div { 
  xpadding-left: 0;
  xpadding-right: 0;
}
*/

</style>
