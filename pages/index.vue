<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="headline" style="display: flex; align-items: center"> 
        <Logo/>
        scv-examples 
      </div>
      <v-card>
        <v-card-title class="caption">
          scv-search component
        </v-card-title>
        <v-card-text>
          <scv-search
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import Logo from '~/components/logo.vue';
import ScvSearch from '~/components/scv-search.vue';

export default {
  components: {
    Logo,
    ScvSearch,
  },
  data: function(){
    return {
    };
  },
  mounted() {
  },
  methods:{
  },
  computed: {
    g() {
        return this.$g || {};
    },
  },
}
</script>
