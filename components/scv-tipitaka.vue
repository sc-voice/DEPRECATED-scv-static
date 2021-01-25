<template>
  <div class="scv-nav-sutta" v-if="sutta && sutta.sutta_uid">
    <v-btn v-if="previous" small text
      class="scv-text-btn scv-nav-btn"
      @click="clickSutta(previous)"
      > 
      <div class="scv-nav-text">
        <div>{{previous.sutta_uid}}/{{sutta.lang}}</div>
        <!--div>{{previous.pli}}</div--> 
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
        <div>{{next.sutta_uid}}/{{sutta.lang}}</div>
        <!--div>{{next.pli}}</div--> 
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
      tipitaka: Tipitaka.create(),
    };
  },
  async mounted() {
    let { $el={} } = this;
    console.log(`dbg mounted`, this.tipitaka.nextId('mn1'));
    this.$nuxt.$on('scv-load-sutta', payload=>{
      typeof $el.scrollIntoView === 'function' && $el.scrollIntoView({
        block: "center",
      });
    });
  },
  methods:{
    clickSutta({sutta_uid, lang}) {
      let { $store } = this;
      console.log(`clickSutta`, sutta_uid);
      $store.dispatch('scv/loadSutta', {sutta_uid, lang, });
    },
  },
  computed: {
    previous() {
        let { tipitaka, sutta } = this;
        let { sutta_uid, lang } = sutta;
        let prevId = tipitaka.previousId(sutta_uid);
        let entry = tipitaka.entryOfId(prevId);
        return entry && Object.assign({ sutta_uid:prevId, lang }, entry);
    },
    current() {
        return this.sutta;
    },
    next() {
        let { tipitaka, sutta } = this;
        let { sutta_uid, lang } = sutta;
        let nextId = tipitaka.nextId(sutta_uid);
        let entry = tipitaka.entryOfId(nextId);
        return entry && Object.assign({ sutta_uid:nextId, lang }, entry);
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
