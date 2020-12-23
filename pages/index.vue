<template>
  <div>
    <div class="text-h5"> Choose view </div>
    <ul>
        <li><nuxt-link to="/desktop">Desktop Layout</nuxt-link></li>
        <li><nuxt-link to="/cellphone">Cellphone Layout</nuxt-link></li>
        <li><nuxt-link to="/components">Components</nuxt-link></li>
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
