<template>
  <v-card flat>
    <v-card-text class="nuxt-content">
      <h1> Welcome to Scv-Static</h1>
      <ul>
          <li><nuxt-link to="/suttas">Suttas</nuxt-link></li>
          <li><nuxt-link to="/news/2021-02-25">News</nuxt-link></li>
          <li><nuxt-link to="/wiki/">Wiki</nuxt-link></li>
          <li><nuxt-link to="/components">Components</nuxt-link></li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  components: {
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
  },
}
</script>
<style>
</style>
