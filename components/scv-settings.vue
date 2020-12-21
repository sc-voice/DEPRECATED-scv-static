<template>
  <div class="scv-more" >
    <v-btn icon
        id="more-menu-btn"
        @click="clickSettings()"
        aria-haspopup="true"
        aria-controls="more-menu"
        :aria-label="$t('ariaMore')"
        :aria-expanded="moreVisible"
        class="scv-icon-btn" :style="cssProps" >
        <cog-icon class="scv-settings-icon"/>
    </v-btn>
    <ul class="scv-more-menu" 
      id = "more-menu"
      ref="ref-more-menu"
      aria-labelledby="more-menu-btn"
      v-if="moreVisible"
      @focusin="focusMore(true)"
      :aria-hidden="!moreVisible">
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('lang', $event)"
          :open="showDetail('lang')"
        >
          <summary >
            <div class="scv-settings-title">
                <div>{{$t('uiLanguage')}}</div>
                <div>{{langLabel(settings.locale)}}</div>
            </div>
          </summary>
          <div class="scv-settings">
            <v-radio-group v-model="settings.locale"
              @change="localeChanged()"
              column>
            <v-radio v-for="lang in settings.languages" 
              :key="`lang${lang.name}`"
              :disabled="lang.disabled"
              :label="lang.label" :value="lang.name" 
              > </v-radio>
            </v-radio-group>
          </div>
        </details>
      </li>
<div v-if="false">
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('trans', $event)"
          :open="showDetail('trans')"
        >
          <summary class="scv-settings-title">
              {{$vuetify.lang.t('$vuetify.scv.translation')}}
          </summary>
          <div class="scv-settings">
            <v-checkbox v-model="showPali" role="checkbox"
              :aria-checked="showPali"
              v-on:change="gscv.changed('showLang')"
              :label="$vuetify.lang.t('$vuetify.scv.showPaliText')"
              />
            <v-checkbox v-model="showTrans" role="checkbox"
              :aria-checked="showTrans"
              v-on:change="gscv.changed('showLang')"
              :label="$vuetify.lang.t('$vuetify.scv.showTransText')"
              />
            <v-checkbox v-model="fullLine" role="checkbox"
              :aria-checked="fullLine"
              v-on:change="gscv.changed('fullLine')"
              :label="$vuetify.lang.t('$vuetify.scv.showLineByLine')"
              />
            <div class="subheading scv-settings-subtitle">
              {{$vuetify.lang.t('$vuetify.scv.transLanguage')}}
            </div>
            <v-radio-group v-model="gscv.lang"
              @change="langChanged()"
              column>
             <v-radio v-for="lang in gscv.transLanguages"
               :disabled="lang.disabled"
               :label="lang.label" :value="lang.name" :key="`lang${lang.name}`">
               </v-radio>
            </v-radio-group>
          </div>
        </details>
      </li>
      <li class="" role="none" >
        <details role="menuitem"
          @click="clickDetails('reader', $event)"
          :open="showDetail('reader')"
          >
          <summary class="scv-settings-title">
              {{$vuetify.lang.t('$vuetify.scv.reader')}}
          </summary>
          <div class="scv-settings">
            <v-radio-group v-model="gscv.vnameTrans"
                @change="gscv.changed('vnameTrans')"
                column>
               <v-radio v-for="v in gscv.langVoices()"
                 :label="v.label" :value="v.name" 
                 :key="`voice${v.name}`">
                 </v-radio>
            </v-radio-group>

            <div class="subheading scv-settings-subtitle">
              {{$vuetify.lang.t('$vuetify.scv.rootLanguage')}}
            </div>
            <v-radio-group v-model="gscv.vnameRoot"
                @change="gscv.changed('vnameRoot')"
                column>
               <v-radio v-for="v in gscv.langVoices('pli')"
                 :label="v.label" :value="v.name" :key="`voice${v.name}`">
                 </v-radio>
            </v-radio-group>
          </div>
        </details>
      </li>
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('sound', $event)"
          :open="showDetail('sound')"
          >
          <summary class="scv-settings-title">
            {{$vuetify.lang.t('$vuetify.scv.bellSound')}}
          </summary>
          <div class="scv-settings" v-if="gscv">
            <v-radio-group v-model="gscv.ips" 
                @change="gscv.changed('ips')"
                column>
               <v-radio v-for="(ips) in ipsChoices.filter(ips=>!ips.hide)"
                 :label="ips.label" :value="ips.value" 
                 :key="`ips${ips.value}`">
                 </v-radio>
            </v-radio-group>
          </div>
        </details>
      </li>
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('search', $event)"
          :open="showDetail('search')"
          >
          <summary class="scv-settings-title">
            {{$vuetify.lang.t('$vuetify.scv.searchResults')}}
          </summary>
          <div class="scv-settings" v-if="gscv">
            <v-radio-group v-model="gscv.maxResults"
                @change="gscv.changed('maxResults')"
                column>
               <v-radio v-for="(mr) in maxResultsChoices"
                 :label="mr.label" :value="mr.value" 
                 :key="`maxResults${mr.value}`">
                 </v-radio>
            </v-radio-group>
          </div>
        </details>
      </li>
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('audio', $event)"
          :open="showDetail('audio')"
          >
          <summary class="scv-settings-title">
            {{$vuetify.lang.t('$vuetify.scv.audio')}}
          </summary>
          <div class="scv-settings" v-if="gscv">
            <v-radio-group v-model="gscv.audio"
              v-on:change="gscv.changed('audio')"
              row>
              <v-radio label="Opus" :value="gscv.AUDIO_OPUS" > </v-radio>
              <v-radio label="Ogg" :value="gscv.AUDIO_OGG" > </v-radio>
              <v-radio label="MP3" :value="gscv.AUDIO_MP3" > </v-radio>
            </v-radio-group>
          </div>
        </details> <!-- General -->
      </li>
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('general', $event)"
          :open="showDetail('general')"
          >
          <summary class="scv-settings-title">
            {{$vuetify.lang.t('$vuetify.scv.general')}}
          </summary>
          <div class="scv-settings" v-if="gscv">
            <v-checkbox v-model="gscv.showId" role="checkbox"
              :aria-checked="gscv.showId"
              v-on:change="gscv.changed('showId')"
              :label="$vuetify.lang.t('$vuetify.scv.showTextSegmentIds')"
              />
            <v-checkbox v-model="gscv.useCookies" role="checkbox"
              v-on:change="gscv.changed('useCookies')"
              :aria-checked="gscv.useCookies"
              :label="$vuetify.lang.t('$vuetify.scv.storeSettingsInCookies')"
              />
            <span class="scv-version">v{{version}}</span>
          </div>
        </details> <!-- General -->
      </li>
      <li class="text-center settings-close" role="none">
        <v-btn id="btnSettings" 
          small
          class="scv-text-button"
          dark :style="cssProps"
          :aria-label="$vuetify.lang.t('$vuetify.scv.ariaClose')"
          @click="focusMore(false,$event)"
          >
          {{$vuetify.lang.t('$vuetify.close')}}
        </v-btn>
      </li>
</div><!-- v-if false -->
    </ul> <!-- scv-more-menu -->
  </div> <!-- scv-more -->
</template>

<script>
import Vue from "vue";
import 'vue-material-design-icons/styles.css';
import CogIcon from 'vue-material-design-icons/Cog.vue';
const ScvSettings = require('../src/scv-settings');

export default {
  components: {
    CogIcon,
  },
  props: {
  },
  data: function(){
    return {
      moreVisible: false,
      openDetail: null,
      languages: ScvSettings.WEB_LANGUAGES,
      moreFocus: null,
    };
  },
  async mounted() {
    this.$store.dispatch('scv/loadSettings');
  },
  methods:{
    clickDetails(id, evt) {
      Vue.set(this, "openDetail", id === this.openDetail ? undefined : id);
      evt.preventDefault();
    },
    showDetail(id) {
      return this.openDetail === id;
    },
    langLabel(lang) {
        return ScvSettings.langLabel(lang);
    },
    clickSettings() {
      console.log('dbg clickSettings');
      Vue.set(this, "moreVisible", !this.moreVisible);
    },
    focusMore(focus) {
      this.moreFocus = focus;
      setTimeout(()=>{
          if (!this.moreFocus) {
              this.moreVisible = false;
          }
      }, 500);
    },
    clickBackdrop(){
      this.focusMore(false);
    },
  },
  computed: {
    settings() {
      return this.$store.state.scv.settings;
    },
    cssProps() {
        return {
            'margin': '0',
        };
    },
  },
}
</script>
<style>
.scv-settings-title {
    width: var(--scv-settings-width);
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-top: 0.1em;
    font-size: 120%;
    font-weight: 500;
}
.scv-settings-title:focus {
    border-color: #82B1FF;
    outline: 1pt solid #82B1FF;
}

.scv-settings-icon {
}
.scv-settings-icon:focus > svg {
  background-color: $focus-color;
  margin-bottom: 5px;
}
.scv-more-menu {
    position: absolute;
    list-style: none;
    top: 3em;
    right: 0;
    min-width: 23em;
    text-align: left;
    border-top: 1pt solid #888;
    padding-top: 0.5em;
    padding-bottom: 1em;
    border: 1pt solid #555;
    border-right: 1pt solid #555;
    border-bottom: 1pt solid #555;
    border-radius: 2pt;
    background-color: var(--scv-background-color);
}
</style>
