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
            <monitor-icon v-if="item.icon==='monitor-icon'" />
            <menu-icon v-if="item.icon==='menu-icon'" />
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
      <v-toolbar-title >
        scv-static{{$route.path}}
      </v-toolbar-title>
      <v-spacer />
      <menu-icon  class="scv-app-icon"
        @click="menuClicked"
        />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
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
  ScvCursor
} = ScvVue;


export default {
  components: {
    Logo,
    HomeIcon,
    MenuIcon,
    MonitorIcon,
    ScvCursor,
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
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
  },
}
</script>
<style>
</style>
