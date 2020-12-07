<template>
  <div v-if="mlDocs.length === 1"
    class="pl-2"
  >
    <div class="text-h6">{{mld.sutta_uid}}</div>
    <div v-for="seg in mld.segments" :key="seg.scid">
      <div v-html="seg.pli" class="scv-text-root"/>
      <div v-html="seg[mld.lang]" class="scv-text-trans"/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
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
  },
  computed: {
    mld() {
      return this.mlDocs && this.mlDocs[0] || {};
    },
    mlDocs() {
      return this.results.mlDocs || [];
    },
    results() {
      return this.$store.state.scv.searchResults || {};
    },
    resultCount() {
      return this.mlDocs.length;
    },
  },
}
</script>
<style>
</style>
