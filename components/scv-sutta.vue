<template>
  <div v-if="sutta && sutta.sutta_uid" class="scv-sutta" >
    <header class="scv-header">
      <scv-sutta-history />
      <div class="scv-division mt-5">
        <div class="scv-division-root" v-html="title(0).pli" />
        <div class="scv-division-trans" v-html="title(0)[lang]" />
      </div>
      <div class="scv-division">
        <div class="scv-division-root" v-html="title(1).pli" />
        <div class="scv-division-trans" v-html="title(1)[lang]" />
      </div>
      <div class="scv-sutta-title">
        <div class="scv-sutta-title-root" v-html="title(2).pli" />
        <div class="scv-sutta-title-trans" v-html="title(2)[lang]" />
      </div>
    </header>
    <div class="scv-text-container" @click="textClicked($event)">
      <div v-for="seg in segments" :key="seg.scid" class="scv-segment">
        <div v-if="settings.showId" class="scv-scid">{{seg.scid}}</div>
        <div v-if="settings.showPali" v-html="seg.pli" class="scv-text-root"/>
        <div v-if="settings.showTrans" v-html="seg[sutta.lang]" class="scv-text-trans"/>
      </div>
    </div><!-- scv-text-container -->
  </div>
</template>

<script>
import ScvSuttaHistory from './scv-sutta-history'
const BilaraWeb = require('~/src/bilara-web');

export default {
  components: {
    ScvSuttaHistory,
  },
  props: {
  },
  data: function(){
    return {
      bilaraWeb: null,
    };
  },
  async mounted() {
    this.bilaraWeb = new BilaraWeb({fetch});
  },
  methods:{
    title(n) {
        return this.titles[n] || {};
    },
    textClicked(event) {
      let { sutta, lang, $store } = this;
      if (event.target.className === 'scv-matched') {
        let text = event.target.innerText;
        let pattern = this.bilaraWeb.exampleOfMatch(text, lang);
        console.log(`textClicked`, event, text, 'example:', pattern, lang);
        if (pattern) {
          $store.dispatch('scv/loadExample', {pattern, lang});
        }
      }
    },
  },
  computed: {
    titles() {
      return this.sutta.segments.filter(seg=>/:0/.test(seg.scid));
    },
    segments() {
      return this.sutta.segments.filter(seg=>!/:0/.test(seg.scid));
    },
    settings() {
      return this.$store.state.scv.settings;
    },
    sutta() {
      return this.$store.state.scv.sutta;
    },
    lang() {
      return this.sutta.lang || 'en';
    }
  },
}
</script>
<style>
.scv-text-container .scv-matched {
  cursor: pointer;
}
</style>
