<template>
  <v-app >
    <v-app-bar dark :clipped-left="clipped" fixed app hide-on-scroll flat >
      <scv-app-bar title="Scv-Static" imgUrl="amanda-flavell-buddha.png">
        <v-btn icon to="/components" class="scv-icon-btn" >
          <menu-icon class="scv-settings-icon"/>
        </v-btn>
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
const { version } = require('~/package.json');
import { ScvVue } from '../index';
let {
  ScvAppBar,
  ScvCursor,
} = ScvVue;

export default {
  components: {
    ScvCursor,
    ScvAppBar,
  },
  data () {
    return {
      clipped: false,
    }
  },
  methods: {
  },
  computed: {
    version() {
      return version;
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
