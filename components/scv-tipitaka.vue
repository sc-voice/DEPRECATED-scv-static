<template>
  <div class="scv-nav-sutta" v-if="sutta && sutta.sutta_uid">
    <v-btn v-if="previous" small text
      class="scv-text-btn scv-nav-btn"
      @click="clickSutta(previous)"
      > 
      <div class="scv-nav-text">
        <div>{{previous}}</div>
      </div>
    </v-btn>
    <v-icon v-else class="scv-nav-btn-disabled">{{mdiChevronLeft}}</v-icon>

    <v-spacer/>

    <v-btn text > {{current.sutta_uid}}/{{current.lang}}</v-btn>

    <v-spacer/>

    <v-btn v-if="next" small text
      class="scv-text-btn scv-nav-btn"
      @click="clickSutta(next)"
      > 
      <div class="scv-nav-text">
        <div>{{next}}</div>
      </div>
    </v-btn>
    <v-icon v-else class="scv-nav-btn-disabled">{{mdiChevronRight}}</v-icon>
  </div>
</template>

<script>
import {
  mdiChevronLeft,
  mdiChevronRight,
} from '@mdi/js';
const Tipitaka = require('../node_modules/scv-bilara/src/tipitaka');

export default {
  components: {
  },
  props: {
  },
  data: function(){
    return {
      mdiChevronLeft,
      mdiChevronRight,
      tipitaka: new Tipitaka(),
    };
  },
  async mounted() {
    let { $el={}, tipitaka } = this;
    console.log(`dbg mounted`, this.tipitaka.nextSuid('mn1'));
    this.$nuxt.$on('scv-load-sutta', payload=>{
      typeof $el.scrollIntoView === 'function' && $el.scrollIntoView({
        block: "center",
      });
    });
  },
  methods:{
    clickSutta(sutta_uid) {
      let { $store, settings, } = this;
      let lang = this.settings.lang;
      console.log(`clickSutta`, {sutta_uid, lang});
      $store.dispatch('scv/loadSutta', {sutta_uid, lang, });
    },
  },
  computed: {
    previous() {
        let { tipitaka, sutta } = this;
        let { sutta_uid, lang } = sutta;
        return tipitaka.previousSuid(sutta_uid);
    },
    current() {
        return this.sutta;
    },
    settings() {
      return this.$store.state.scv.settings;
    },
    next() {
        let { tipitaka, sutta } = this;
        let { sutta_uid, lang } = sutta;
        return tipitaka.nextSuid(sutta_uid);
    },
    sutta() {
        return this.$store.state.scv.sutta;
    },
  },
}
</script>
<style>
.scv-tipitaka {
    display: flex;
    flex-flow: row noWrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-left: 2em;
    padding-right: 2em;
}
.scv-tipitaka > button {
    width: 8em !important;
}
.scv-tipitaka-button {
  min-width: 5rem;
}
</style>
