<template>
  <div class="nuxt-content scv-toc">
    <h1>Wiki Contents</h1>
    <div v-for="article of articles" 
      :key="article.slug" 
      v-if="article.title"
      class="scv-toc-item">
      <NuxtLink :to="{ name: 'wiki-slug', params: { slug: article.slug } }">
        <img :src="article.img" style="height:50px"/>
        <div class="scv-toc-item-text">
          <div class="scv-toc-item-title">
            {{ article.title }}
          </div>
          <div class="scv-toc-item-subtitle">
            {{ article.description }}
          </div>
        </div>
      </NuxtLink>
    </div><!-- scv-toc-item -->
  </div>
</template>
<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content()
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
<style>
</style>
