<template>
  <div class="scv-history">
    <v-btn v-if="previous" small text
        @click="clickSutta(previous.sutta_uid)"
    > {{previous.sutta_uid}} </v-btn>
    <v-btn v-else disabled icon > <chevron-left /> </v-btn>

    <v-btn text > {{current.sutta_uid}}</v-btn>

    <v-btn v-if="next" small text
        @click="clickSutta(next.sutta_uid)"
    > {{next.sutta_uid}} </v-btn>
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
    clickSutta(sutta_uid) {
        let { history, $store } = this;
        let h = history.find(h=>h.sutta_uid===sutta_uid);
        let updateHistory = false;
        console.log(`dbg clickSutta`,{sutta_uid, updateHistory});
        $store.dispatch('scv/loadSutta', {sutta_uid, updateHistory});
    },
  },
  computed: {
    previous() {
        let { history, sutta_uid } = this;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid);
        return history[iCur-1];
    },
    current() {
        let { history, sutta_uid } = this;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid);
        return history[iCur] || {};
    },
    next() {
        let { history, sutta_uid } = this;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid);
        return history[iCur+1];
    },
    sutta_uid() {
        return this.$store.state.scv.sutta.sutta_uid;
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
