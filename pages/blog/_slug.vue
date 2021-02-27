<template>
  <article class="scv-article">
    <a :href="article.img"
      <img :src="article.img" height="200px" target="_blank"/>
    </a>
    <div class="text-h4">BLOG {{ title }} </div>
    <div class="text-subtitle ml-1"> {{ article.description }} </div>
    <div class="text-caption ml-5" >updated: {{article.updatedAt}}</div>
    <div class="text-caption ml-5" >file: contents{{article.path}}.md</div>

    <nuxt-content :document="article" class="mt-5"/>

  </article>
</template>
<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('articles', params.slug).fetch()

      return { article }
    },

    computed: {
      title() {
        return this.article.title || "(no title)";
      }
    }
  }
</script>
