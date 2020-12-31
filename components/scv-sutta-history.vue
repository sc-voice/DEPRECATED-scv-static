<template>
  <div class="scv-history" v-if="sutta && sutta.sutta_uid">
    <v-btn v-if="previous" small text
        @click="clickSutta(previous)"
    > {{previous.sutta_uid}}/{{previous.lang}}` </v-btn>
    <v-btn v-else disabled icon > <chevron-left /> </v-btn>

    <v-spacer/>

    <v-btn text > {{current.sutta_uid}}/{{current.lang}}</v-btn>

    <v-spacer/>

    <v-btn v-if="next" small text
        @click="clickSutta(next)"
    > {{next.sutta_uid}}/{{next.lang}} </v-btn>
    <v-btn v-else disabled icon > <chevron-right/> </v-btn>
  </div>
</template>

<script>
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'

export default {
  components: {
    ChevronRight,
    ChevronLeft,
  },
  props: {
  },
  data: function(){
    return {
    };
  },
  async mounted() {
  },
  methods:{
    clickSutta({sutta_uid, lang}) {
        let { history, $store } = this;
        let h = history.find(h=>h.sutta_uid===sutta_uid && h.lang===lang);
        let updateHistory = false;
        $store.dispatch('scv/loadSutta', {sutta_uid, lang, updateHistory});
    },
  },
  computed: {
    previous() {
        let { history, sutta } = this;
        let { sutta_uid, lang } = sutta;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid && h.lang===lang);
        return history[iCur-1];
    },
    current() {
        let { history, sutta } = this;
        let { sutta_uid, lang } = sutta;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid && h.lang===lang);
        return history[iCur] || sutta;
    },
    next() {
        let { history, sutta } = this;
        let { sutta_uid, lang } = sutta;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid && h.lang===lang);
        return history[iCur+1];
    },
    sutta() {
        return this.$store.state.scv.sutta;
    },
    history() {
      return this.$store.state.scv.suttaHistory;
    },
  },
}
</script>
<style>
.scv-history {
    display: flex;
    flex-flow: row noWrap;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.scv-history > button {
    width: 8em !important;
}
</style>
