<template>
  <div v-if="!!sutta" class="pl-2" >
    <header>
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
    <div class="scv-text-container">
      <div v-for="seg in segments" :key="seg.scid" class="scv-segment">
        <div v-html="seg.pli" class="scv-text-root"/>
        <div v-html="seg[sutta.lang]" class="scv-text-trans"/>
      </div>
    </div><!-- scv-text-container -->
  </div>
</template>

<script>
import ScvSuttaHistory from './scv-sutta-history'

export default {
  components: {
    ScvSuttaHistory,
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
    title(n) {
        return this.titles[n] || {};
    },
  },
  computed: {
    titles() {
      return this.sutta.segments.filter(seg=>/:0/.test(seg.scid));
    },
    segments() {
      return this.sutta.segments.filter(seg=>!/:0/.test(seg.scid));
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
.scv-division {
  font-size: var(--scv-division-title-font-size);
  text-align: center;
}
.scv-division-root {
  xfont-variant-caps: all-small-caps; /* ugly without SC font */
  font-feature-settings: normal; /* vs. smcp */
  font-family: var(--scv-sans-font);
}
.scv-division-trans {
  xfont-variant-caps: all-small-caps; /* ugly without SC font */
  font-feature-settings: normal; /* vs. smcp */
  font-family: var(--scv-serif-font);
}
.scv-sutta-title {
  font-size: var(--scv-sutta-title-font-size);
  text-align: center;
  font-weight: 300;
  line-height: 1.3333;
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
}
.scv-sutta-title-root {
  xfont-variant-caps: small-caps; /* ugly without SC font */
  font-feature-settings: normal; /* vs. smcp */
  font-family: var(--scv-sans-font);
}
.scv-sutta-title-trans {
  xfont-variant-caps: small-caps; /* ugly without SC font */
  xfont-feature-settings: normal; /* vs. smcp */
  font-family: var(--scv-serif-font);
}
header {
  margin-bottom: var(--scv-header-margin-bottom);
}
.scv-text-container {
  font-size: var(--scv-text-font-size);
  line-height: var(--scv-text-line-height);
  margin-left: auto;
  margin-right: auto;
}
.scv-segment {
  margin-bottom: var(--scv-segment-margin-bottom);
  margin-left: auto;
  margin-right: auto;
}

</style>
