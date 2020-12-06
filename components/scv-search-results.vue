<template>
  <div v-if="mlDocs.length === 0"
    class="text-h6 pl-2"
  >
    {{foundSuttas}}
  </div>
  <details v-else-if="mlDocs.length" open> <!-- mlDocs -->
    <summary v-if="resultCount"
      role="main"
      ref="refResults"
      aria-level="1"
      :aria-label="ariaFoundSuttas(resultCount, playlistDuration.aria)"
      class='text-h6 pt-1 pb-1'>
      <span aria-hidden=true>
        {{foundSuttas}}
      </span>
    </summary>
    <v-card>
      <v-card-text>
        <div v-for="(mld,i) in results.mlDocs" :key="mld.sutta_uid+i">
          {{mld.sutta_uid}}
          {{mld.score}}

        <details v-show="searchResults" open>
        <!--
          <summary v-else
            role="main" ref="refResults"
            aria-level="1" 
            :aria-label="$t('noResultsText')"
            class='title'>
            {{$t('dataIterator.noResultsText')}}
          </summary>
          <div class="scv-playlist ml-3 pt-2 pl-3" 
            v-if="gscv.voices.length" >
            <v-btn icon small fab v-if="playable"
              @click="playSearchText()"
              :title="$t('speakSearchText')"
              :disabled="!playSearch.signature"
              class="scv-icon-btn" :style="cssVars" >
              <v-icon>chat_bubble_outline</v-icon>
            </v-btn>
            <v-btn icon v-if="playable"
              @click="playAll()"
              :title="$t('playAll')"
              class="scv-icon-btn" :style="cssVars" small>
              <v-icon>play_circle_outline</v-icon>
            </v-btn>
            <v-btn icon v-if="playable"
              @click="downloadBuild()"
              :aria-label="`${ariaDownload} ${resultId()}`"
              class="scv-icon-btn" :style="cssVars" small>
              <v-icon>arrow_downward</v-icon>
            </v-btn>
          </div>
          <details role="heading" aria-level="2"
              v-for="(result,i) in (searchResults && searchResults.results||[])"
              :key="`${result.uid}_${i}`"
              class="scv-search-result" :style="cssVars">
              <summary class="scv-search-result-summary">
                <div style="display: inline-block; width: 96%; ">
                  <div style="display:flex; justify-content: space-between; ">
                    <div v-html="resultTitle(result)"></div>
                    <div class="caption" 
                      :aria-label="duration(result.stats.seconds).aria">
                      {{duration(result.stats.seconds).display}}
                    </div>
                  </div>
                </div>
              </summary>
              <div v-if="gscv.showId" class="scv-search-result-scid scv-scid">
                SC&nbsp;{{result.quote.scid}}
              </div>
              <div v-if="result.quote && showPali && result.quote.pli"
                class="scv-search-result-pli">
                <div>
                  <div v-html="result.quote.pli"></div>
                </div>
              </div>
              <div v-if="result.quote && showTrans && result.quote[language]"
                class="scv-search-result-lang">
                <div>
                  <span v-html="result.quote[gscv.lang]"></span>
                  <div v-if="gscv.showId" class='scv-scid'>
                    &mdash;
                    {{result.author}} 
                  </div>
                </div>
              </div>
              <div class="ml-3 pt-2" 
                style="display:flex; justify-content: space-between">
                <div>
                  <v-btn icon v-if="result.quote && playable"
                    @click="playQuotes(i, result)"
                    :class="btnPlayQuotesClass(i)" :style="cssVars" small>
                    <v-icon>chat_bubble_outline</v-icon>
                  </v-btn>
                  <v-btn icon v-if="result.quote && playable"
                    @click="playOne(result)"
                    class="scv-icon-btn" :style="cssVars" small>
                    <v-icon>play_circle_outline</v-icon>
                  </v-btn>
                  <v-btn icon v-if="result.quote"
                    :href="resultLink(result)"
                    class="scv-icon-btn" :style="cssVars" small>
                  <v-icon>open_in_new</v-icon>
                  </v-btn>
                  <v-btn icon v-if="playable"
                    @click="downloadBuild(resultRef(result))"
                    :aria-label="`${ariaDownload} ${resultId()}`"
                    class="scv-icon-btn" :style="cssVars" small>
                    <v-icon>arrow_downward</v-icon>
                  </v-btn>
                </div>
                <div class="scv-score">
                  {{$t('relevance')}}
                  {{score(result)}}
                </div>
            </div>
            -->
          </details><!-- search result i -->
        </div>
      </v-card-text>
    </v-card>
  </details><!-- mlDocs -->
</template>

<script>
import Vue from 'vue';
import examples from '../api/examples.json';
const GITHUB = 'https://raw.githubusercontent.com';
const SuttaDuration = require('~/src/sutta-duration');

export default {
  components: {
  },
  props: {
  },
  data: function(){
    return {
      examples: null,
      search: '',
      suttaDuration: null,
    };
  },
  async mounted() {
    let { $vuetify, } = this;
    let lang = ($vuetify.lang.current||'noLanguage').split('-')[0];
    let url = `${GITHUB}/sc-voice/scv-examples/main/api/examples.json`;
    let exLang = `no-examples ${lang}`;
    try {
      let res = await this.$axios.get(url);
      Vue.set(this, 'examples', res.data);
      console.log(`examples loaded: ${Object.keys(res.data)}`);
    } catch(e) {
      Vue.set(this, 'examples', examples);
      console.warn(`${e.message} => using default examples:${Object.keys(res.data)}`);
    }
    let axios = this.$axios;
    this.suttaDuration = await new SuttaDuration({axios}).initialize();
  },
  methods:{
    ariaFoundSuttas(resultCount, duration) {
        //:aria-label="`Found ${resultCount} sootas ${playlistDuration.aria}`"
        var tmplt = this.$t && this.$t('ariaFoundSuttas') || '';
        var text = tmplt
            .replace("A_SEARCH", this.search)
            .replace("A_RESULTCOUNT", this.resultCount)
            .replace("A_DURATION", this.duration);
        return text;
    },
    durationDisplay(totalSeconds) {
      totalSeconds = Math.round(totalSeconds);
      var seconds = totalSeconds;
      var hours = Math.trunc(seconds / 3600);
      seconds -= hours * 3600;
      var minutes = Math.trunc(seconds / 60);
      seconds -= minutes * 60;
      if (hours) {
          var tDisplay = this.$t('HHMM');
          var tAria = this.$t('ariaHHMM');
      } else if (minutes) {
          var tDisplay = this.$t('MMSS');
          var tAria = this.$t('ariaMMSS');
      } else {
          var tDisplay = this.$t('seconds');
          var tAria = this.$t('ariaSeconds');
      }
      var display = tDisplay
          .replace(/A_HOURS/, hours)
          .replace(/A_MINUTES/, minutes)
          .replace(/A_SECONDS/, seconds);
      var aria = tAria
          .replace(/A_HOURS/, hours)
          .replace(/A_MINUTES/, minutes)
          .replace(/A_SECONDS/, seconds);

      return {
          totalSeconds,
          hours,
          minutes,
          seconds,
          display,
          aria,
      }
    },
  },
  computed: {
    foundSuttas() {
      let { resultCount, search, } = this;
      return this.$t && this.$t('foundSuttas')
        .replace(/A_RESULTCOUNT/,resultCount)
        .replace(/A_SEARCH/, search);
    },
    mlDocs() {
      return this.results.mlDocs || [];
    },
    searchResults() { // DEPRECATED
      let { results } = this;
      return { results }
    },
    results() {
      return this.$store.state.scv.searchResults || {};
    },
    resultCount() {
      return this.mlDocs.length;
    },
    duration() {
      let { results, suttaDuration:sd } = this;
      return sd
        ? results.mlDocs.reduce((a,mld)=> a + (sd.duration(mld.sutta_uid)||0), 0)
        : 0;
    },
    playlistDuration() {
      let { mlDocs, suttaDuration:sd } = this;
      var seconds = mlDocs.reduce((a,mld) => {
          return a + sd.duration(mld.sutta_uid);
      }, 0);
      return this.durationDisplay(seconds);
    },
    cssVars() {
      return {
        //"--seg-text-width": this.segTextWidth,
        //'--success-color': this.$vuetify.theme.success,
      }
    },
  },
}
</script>
<style>
.scv-inspire {
    margin-left: 1px;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 1em;
    text-transform: none;
    font-size: 12px;
    border: 1px solid #383838;
    height: 24px;
    //background: #212121 !important;
}
.scv-inspire:focus {
    border: 1pt solid #888;
    border-color: #82B1FFa;
    outline: 1pt solid #82B1FF;
}
.scv-inspire-row {
    margin: -0.8em 0 0.5em 0;
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>
