<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <home-icon v-if="item.icon==='home-icon'" />
            <apps-icon v-if="item.icon==='apps-icon'" />
            <monitor-icon v-if="item.icon==='monitor-icon'" />
            <cellphone-icon v-if="item.icon==='cellphone-icon'" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <Logo/>
      <menu-icon  class="scv-app-icon"
        @click="menuClicked"
        />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} v{{version}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Logo from '~/components/logo.vue';
const { version } = require('~/package.json');
import AppsIcon from 'vue-material-design-icons/Apps.vue';
import CellphoneIcon from 'vue-material-design-icons/Cellphone.vue';
import HomeIcon from 'vue-material-design-icons/Home.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import MonitorIcon from 'vue-material-design-icons/Monitor.vue';

export default {
  components: {
    Logo,
    HomeIcon,
    AppsIcon,
    MenuIcon,
    MonitorIcon,
    CellphoneIcon,
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'home-icon', title: 'Home', to: '/' },
        { icon: 'monitor-icon', title: 'Desktop', to: '/desktop' },
        { icon: 'cellphone-icon', title: 'Cellphone', to: '/cellphone' }, 
        { icon: 'apps-icon', title: 'Components', to: '/components'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'scv-static'
    }
  },
  methods: {
    menuClicked() {
      console.log(`dbg menu`);
      Vue.set(this, "drawer", true);
    },
  },
  computed: {
    version() {
      return version;
    },
  },
}
</script>
<style>
</style>
