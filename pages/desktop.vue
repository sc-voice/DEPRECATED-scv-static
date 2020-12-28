<template>
  <v-sheet light class="scv-layout1" >
    <div class="scv-search-pane">
      <scv-search-field
        :lang="lang"
        v-on:search-text="search"
      />
      <scv-results :lang="lang" />
      <scv-settings />
    </div>
    <scv-sutta />
  </v-sheet>
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

.scv-search-pane {
  max-width: 28rem;
}

.ex-more {
  width: 2em;
  margin-left: auto;
  margin-right: auto;
}

.scv-layout1 {
  display: flex;
  flex-flow: row wrap;
}

</style>
