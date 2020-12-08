<template>
  <div v-if="mlDocs.length === 0" class="text-h6 pl-2" >
    {{foundSuttas}}
  </div>
  <details v-else-if="mlDocs.length" 
    class="scv-results-details"
    open> <!-- mlDocs -->
    <summary v-if="resultCount"
      class='text-subtitle-2 pt-1 pb-1'
      role="main"
      ref="refResults"
      aria-level="1"
      :aria-label="ariaFoundSuttas(resultCount, playlistDuration.aria)"
    >
      <span aria-hidden=true>
        {{foundSuttas}}
        ({{playlistDuration.display}})
      </span>
    </summary>
    <v-card>
      <v-card-text>
        <details 
          role="heading" aria-level="2"
          v-for="(mld,i) in results.mlDocs" :key="mld.sutta_uid+i" 
        >
          <summary >
            <div class="scv-result-summary" >
              <div v-html="resultTitle(mld)" 
                class="scv-result-title"
              />
              <!--div class="caption" >{{mld.score}}</div-->
              <div class="caption text-right" 
                :aria-label="mldDuration(mld).aria">
                {{mldDuration(mld).display}}
              </div>
            </div><!-- scv-result-summary -->
          </summary>

        <!--
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
          -->
          <!--
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
          </details>
          -->
        </details><!-- search result i-->
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
    width: {
      type: String,
      default: '35em',
    },
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
    suttaId(mld) {
      let { sutta_uid } = mld;
      if (/th.g/.test(sutta_uid)) {
        return sutta_uid.replace(/^t/, 'T');
      } else {
        return sutta_uid.toUpperCase();
      }
    },
    resultTitle(mld) {
      let suid = this.suttaId(mld);
      let parts = mld.title.split('\n');
      switch (parts.length) {
        case 0: return suid;
        case 1: return `${suid}: ${parts[0]}`;
        default: return `${suid}: ${parts[1]}`;
      }
    },
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
    mldDuration(mld) {
      let { suttaDuration:sd } = this;
      let { sutta_uid, } = mld;
      return this.durationDisplay(sd.duration(mld.sutta_uid));
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
.scv-results-details {
}
.scv-results > summary {
}
.scv-result-summary {
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: space-between;
  min-width: 22.5em; /* iPhone 6/7/8 */
  max-width: 80%;
}
.scv-result-title {
  padding-left: 3em;
  text-indent: -3em;
}
</style>
