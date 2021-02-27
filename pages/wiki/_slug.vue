<template>
  <article class="scv-article">
    <a :href="article.img"
      <img :src="article.img" height="200px" target="_blank"/>
    </a>
    <div class="text-h4">WIKI {{ title }} </div>
    <div class="text-subtitle ml-1"> {{ article.description }} </div>
    <div class="text-caption ml-5" >updated: {{article.updatedAt}}</div>
    <div class="text-caption ml-5" >file: contents{{article.path}}.md</div>

    {{article}}

    <nuxt-content :document="article" class="mt-5"/>

  </article>
</template>
<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content(params.slug).fetch()

      return { article }
    },

    computed: {
      title() {
        return this.article.title || "(no title)";
      }
    }
  }
</script>
