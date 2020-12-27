<template>
  <div class="scv-more" v-if="isMounted">
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
          <summary class="scv-summary">
            <div class="scv-settings-title">
                <div>{{$t('languages')}}</div>
                <div v-if="openDetail!=='lang'" class="body-2">
                  {{locale.toUpperCase()}} {{lang.toUpperCase()}}
                </div>
            </div><!--scv-settings-title-->
          </summary>
          <div class="scv-settings">
            <div class="scv-select-container">
              <select name="Locale" id="locale-select" 
                ref="lang-focus"
                class="scv-select"
                v-model="locale"
                @click="stopPropagation($event)">
                <option v-for="item in languages" :key="item.code" 
                  :selected="item.code===locale"
                  :value="item.code">{{item.label}}</option>
              </select>
              <label for="locale-select">{{$t('uiLanguage')}}</label>
            </div>
            <div class="scv-select-container">
              <select name="Lang" id="lang-select" 
                class="scv-select"
                v-model="lang"
                @click="stopPropagation($event)">
                <option v-for="item in transLanguages" :key="item.code" 
                  :selected="item.code===lang"
                  :value="item.code">{{item.label}}</option>
              </select>
              <label for="lang-select">{{$t('transLanguage')}}</label>
            </div>
          </div>
        </details>
      </li>
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('useCookies', $event)"
          :open="showDetail('useCookies')"
        >
          <summary class="scv-summary">
            <div class="scv-settings-title">
                <div>{{$t('general')}}</div>
                <div v-if="useCookies && openDetail!=='useCookies'" 
                  class="body-2">cookies</div>
            </div><!--scv-settings-title-->
          </summary>
          <div class="scv-settings">
            <scv-checkbox v-model="useCookies"
              ref="useCookies-focus"
              :label="$t('storeSettingsInCookies')"/>
          </div>
        </details>
      </li>
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('trans', $event)"
          :open="showDetail('trans')"
        >
          <summary class="scv-summary">
            <div class="scv-settings-title">
                <div>{{$t('translation')}}</div>
                <div >
                  <span v-if="showPali" class="body-2">Pali</span>
                  <format-align-justify-icon 
                    v-if="fullLine && showPali && showTrans" />
                  <format-columns-icon 
                    v-if="!fullLine && showPali && showTrans" />
                  <span v-if="showTrans" class="body-2">
                    {{lang.toUpperCase()}}</span>
                </div>
            </div><!--scv-settings-title-->
          </summary>
          <div class="scv-settings">
            <scv-checkbox v-model="showPali" 
              ref="trans-focus"
              :aria-checked="showPali"
              :label="$t('showPaliText')"
              @click="stopPropagation($event)"
              />
            <scv-checkbox v-model="showTrans" 
              :aria-checked="showTrans"
              :label="$t('showTransText')"
              @click="stopPropagation($event)"
              />
            <scv-checkbox v-model="fullLine" 
              :aria-checked="fullLine"
              :label="$t('showLineByLine')"
              @click="stopPropagation($event)"
              />
          </div>
        </details>
      </li>
      <li class="" role="none" >
        <details role="menuitem"
          @click="clickDetails('reader', $event)"
          :open="showDetail('reader')"
          >
          <summary class="scv-summary">
            <div class="scv-settings-title">
              <div>{{$t('reader')}}</div>
              <div>
                <span class="body-2" v-if="showPali && openDetail!=='reader'">
                  {{vnameRoot}}</span>
                <span class="body-2" v-if="showTrans && openDetail!=='reader'">
                  {{vnameTrans}}</span>
              </div>
            </div><!--scv-settings-title-->
          </summary>
          <div class="scv-settings">
            <div class="scv-select-container">
              <select name="Lang" id="reader-select" 
                class="scv-select"
                ref="reader-focus"
                v-model="vnameTrans"
                @click="stopPropagation($event)">
                <option v-for="item in langVoices" :key="item.code" 
                  :selected="item.name===vnameTrans"
                  :value="item.name">{{item.name}}</option>
              </select>
              <label for="reader-select">{{$t('reader')}}</label>
            </div>

<div v-if="false">
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
</div>
        </details>
      </li>
<div v-if="false">
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
import ScvCheckbox from '../components/scv-checkbox';
import CogIcon from 'vue-material-design-icons/Cog.vue';
import FormatAlignJustifyIcon from 'vue-material-design-icons/FormatAlignJustify.vue';
import FormatColumnsIcon from 'vue-material-design-icons/FormatColumns.vue';
import RobotOutlineIcon from 'vue-material-design-icons/RobotOutline.vue';
const ScvSettings = require('../src/scv-settings');
const BilaraWeb = require('../src/bilara-web');

export default {
  components: {
    CogIcon,
    FormatColumnsIcon,
    RobotOutlineIcon,
    ScvCheckbox,
  },
  props: {
  },
  data: function(){
    return {
      isMounted: false,
      moreVisible: false,
      openDetail: null,
      languages: ScvSettings.WEB_LANGUAGES,
      moreFocus: null,
    };
  },
  mounted() {
    this.$store.dispatch('scv/loadVoices');
    Vue.set(this, "isMounted", true);
    console.log(`scv-settings mounted`, this);
  },
  methods:{
    clickDetails(id, evt) {
      let opening = id !== this.openDetail;
      Vue.set(this, "openDetail", opening ? id : undefined);
      let refFocus = `${id}-focus`;
      let idFocus = opening && this.$refs[refFocus];
      if (idFocus) {
        this.$nextTick(()=>{ 
          if (idFocus.$refs && idFocus.$refs.input) {
            idFocus.$refs.input.focus();
          } else if (idFocus.$el) {
            idFocus.$el.focus();
          } else {
            idFocus.focus(); 
          }
        });
      } else {
        console.log(`clickDetails no focus:`, refFocus);
      }
      evt.preventDefault();
    },
    showDetail(id) {
      return this.openDetail === id;
    },
    langLabel(lang) {
        return ScvSettings.langLabel(lang);
    },
    clickSettings() {
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
    stopPropagation(event) {
      event.stopPropagation();
    },
    localeChanged(event, code) {
      console.log('localeChanged', event, code);
    },
  },
  computed: {
    ready() {
      return this.hasOwnProperty('$t');
    },
    fullLine: {
      get: function() { return this.$store.state.scv.settings.fullLine; },
      set: function(value) { this.$store.commit("scv/settings", {fullLine:value}); },
    },
    showTrans: {
      get: function() { return this.$store.state.scv.settings.showTrans; },
      set: function(value) { this.$store.commit("scv/settings", {showTrans:value}); },
    },
    showPali: {
      get: function() { return this.$store.state.scv.settings.showPali; },
      set: function(value) { this.$store.commit("scv/settings", {showPali:value}); },
    },
    lang: {
      get: function() { return this.$store.state.scv.settings.lang; },
      set: function(value) { this.$store.commit("scv/settings", {lang:value}); },
    },
    locale: {
      get: function() { return this.$store.state.scv.settings.locale; },
      set: function(value) { this.$store.commit("scv/settings", {locale:value}); },
    },
    useCookies: {
      get: function() { return !!this.$store.state.scv.settings.useCookies; },
      set: function(value) { 
        this.$store.commit("scv/settings", {useCookies:value}); 
      },
    },
    vnameRoot: {
      get: function() { return this.$store.state.scv.settings.vnameRoot; },
      set: function(value) { 
        this.$store.commit("scv/settings", {vnameRoot:value}); 
      },
    },
    vnameTrans: {
      get: function() { return this.$store.state.scv.settings.vnameTrans; },
      set: function(value) { 
        this.$store.commit("scv/settings", {vnameTrans:value}); 
      },
    },
    settings() {
      return this.$store.state.scv.settings;
    },
    voices() {
      return this.$store.state.scv.voices;
    },
    transLanguages() {
      return ScvSettings.TRANS_LANGUAGES;
    },
    langVoices() {
      let { lang, voices, vnameTrans } = this;
      let langVoices = voices.filter(v=>v.langTrans===lang);
      if (!langVoices.some(v=>v.name === vnameTrans)) {
      console.log(`dbg langVoices`, langVoices, vnameTrans);
        this.$nextTick(()=> {
          this.vnameTrans = langVoices[0].name;
          console.log(`dbg langVoices2`, langVoices, this.vnameTrans);
        });
      }
      return langVoices;
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
    align-items: baseline;
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
