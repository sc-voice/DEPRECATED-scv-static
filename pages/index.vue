<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-h5"> Vue Components </div>
      <v-select :items="langItems" filled 
        v-model="$vuetify.lang.current" 
        label="Language" 
      />

      <v-card>
        <v-card-text>
          <details>
            <summary class="text-h6">scv-search-field</summary>
            ScvSearchField is an auto-completion text field that accepts
            Suttacentral sutta references as well as arbitrary search strings.
            Search strings are automatically completed with 
            <a :href="githubUrl('api/examples.json')"
              target="_blank">
              examples.json
            </a>. 
            It emits the <code>search-text</code> event with the search text as its value
          </details>

          <v-card light class="mt-5">
            <scv-search-field
              :lang="lang"
              v-on:search-text="search"
            />
          </v-card>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-text>
          <details>
            <summary class="text-h6">scv-search-results</summary>
            ScvSearchResults displays multiple search results.
            It listens for the <code>search-text</code> event.
          </details>

          <v-card light class="mt-5">
            <scv-search-results
              :lang="lang"
            />
            <v-spacer/>
          </v-card>
        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import ScvSearchField from '~/components/scv-search-field.vue';
import ScvSearchResults from '~/components/scv-search-results.vue';

export default {
  components: {
    ScvSearchField,
    ScvSearchResults,
  },
  data: function(){
    return {
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
</style>
