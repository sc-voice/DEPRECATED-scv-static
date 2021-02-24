<template>
  <v-app >
    <v-app-bar dark :clipped-left="clipped" fixed app hide-on-scroll flat >
      <scv-app-bar title="Scv-Static" imgUrl="amanda-flavell-buddha.png">
        <v-btn icon to="/desktop" class="scv-icon-btn" >
          <monitor-icon class="scv-settings-icon"/>
        </v-btn>
        <v-btn icon to="/components" class="scv-icon-btn" >
          <menu-icon class="scv-settings-icon"/>
        </v-btn>
        <scv-settings :js="js" 
          :monolingual="monolingual"
          :version="`version ${version}`"
        />
      </scv-app-bar>
    </v-app-bar>
    <div class="site-main">
      <v-container class="site-content">
        <nuxt />
      </v-container>
    </div>
    <v-footer app dark >
      <scv-cursor />
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Logo from '~/components/logo.vue';
const { version } = require('~/package.json');
import HomeIcon from 'vue-material-design-icons/Home.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import MonitorIcon from 'vue-material-design-icons/Monitor.vue';
import { ScvVue } from '../index';
let {
  ScvAppBar,
  ScvCursor,
} = ScvVue;
const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka: require('scv-bilara/src/tipitaka'),
}


export default {
  components: {
    Logo,
    HomeIcon,
    MenuIcon,
    MonitorIcon,
    ScvCursor,
    ScvAppBar,
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      monolingual: null,
      items: [
        { icon: 'home-icon', title: 'Home', to: '/' },
        { icon: 'monitor-icon', title: 'Desktop', to: '/desktop' },
        { icon: 'menu-icon', title: 'Components', to: '/components' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'scv-static'
    }
  },
  methods: {
    menuClicked() {
      Vue.set(this, "drawer", true);
    },
  },
  computed: {
    version() {
      return version;
    },
    js() { 
      return JS;
    },
  },
}
</script>
<style>
.site-main {
}
.site-content {
  margin-top: 90px;
  padding: 0;
  padding-bottom: 60px;
}
</style>
