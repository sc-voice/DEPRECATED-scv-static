<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-h5"> Vue Components </div>
      <v-card>
        <v-card-title class="text-h6">
          scv-search-field
        </v-card-title>
        <v-card-text>
          ScvSearchField is an auto-completion text field that accepts
          Suttacentral sutta references as well as arbitrary search strings.
          Search strings are automatically completed with 
          <a href="https://github.com/sc-voice/scv-examples/blob/main/api/examples.json"
            target="_blank">
            examples.json
          </a>. 
          It emits the <kbd>search-text</kbd> event with the search text as its value

          <v-card light class="mt-5">
            <scv-search-field
              lang="de"
              v-on:search-text="searchText"
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
    };
  },
  mounted() {
  },
  methods:{
    searchText(value) {
      console.log(`searchText`, value);
      Vue.set(this, "alertSearch", value);
    },
  },
  computed: {
    g() {
        return this.$g || {};
    },
  },
}
</script>
