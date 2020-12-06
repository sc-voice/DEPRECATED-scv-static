<template>
  <div v-if="mlDocs.length === 1"
    class="pl-2"
  >
    <div class="text-h6">{{mld.sutta_uid}}</div>
    <div>
      {{JSON.stringify(mld.segMap, null,2)}}
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
