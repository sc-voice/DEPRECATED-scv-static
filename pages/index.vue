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
            It emits the <kbd>search-text</kbd> event with the search text as its value
          </details>

          <v-card light class="mt-5">
            <scv-search-field
              :lang="lang"
              v-on:search-text="search"
            />
            <v-spacer/>
          </v-card>
        </v-card-text>
      </v-card>
      <v-alert type="info" text elevation="10" :value="!!alertSearch"
        transition="expand"
      >
        You searched for "{{alertSearch}}"
      </v-alert/>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import ScvSearchField from '~/components/scv-search-field.vue';

export default {
  components: {
    ScvSearchField,
  },
  data: function(){
    return {
      alertSearch: '',
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
      Vue.set(this, "alertSearch", value);
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
