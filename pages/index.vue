<template>
  <div>
    <div class="text-h5"> Choose view </div>
    <ul>
        <li><nuxt-link to="/main">Main</nuxt-link></li>
        <li><nuxt-link to="/components">Components</nuxt-link></li>
        <li><nuxt-link to="/news/2021-02-25">News</nuxt-link></li>
        <li><nuxt-link to="/wiki/">Wiki</nuxt-link></li>
    </ul>
  </div>
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
