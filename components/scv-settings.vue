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
          <summary class="scv-settings-title">
            {{$vuetify.lang.t('$vuetify.scv.uiLanguage')}}
          </summary>
          <div class="scv-settings">
            <v-radio-group v-model="gscv.locale"
              @change="localeChanged()"
              column>
            <v-radio v-for="lang in gscv.languages" 
              :key="`lang${lang.name}`"
              :disabled="lang.disabled"
              :label="lang.label" :value="lang.name" 
              > </v-radio>
            </v-radio-group>
          </div>
        </details>
      </li>
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
    </ul> <!-- scv-more-menu -->
  </div> <!-- scv-more -->
</template>

<script>
import 'vue-material-design-icons/styles.css';
import CogIcon from 'vue-material-design-icons/Cog.vue';

export default {
  components: {
    CogIcon,
  },
  props: {
  },
  data: function(){
    return {
      moreVisible: false,
    };
  },
  async mounted() {
  },
  methods:{
    clickSettings() {
        console.log('dbg clickSettings');
    },
  },
  computed: {
    cssProps() {
        return {
            'margin': '0',
        };
    },
  },
}
</script>
<style>
.scv-settings-icon {
}
.scv-settings-icon:focus > svg {
  background-color: $focus-color;
  margin-bottom: 5px;
}
</style>
