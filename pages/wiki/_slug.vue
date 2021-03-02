<template>
  <article class="nuxt-content scv-article">
    <div class="scv-wiki-heading">
      <a :href="article.imgSrc" target="_blank">
        <img :src="article.img" target="_blank"/>
      </a>
      <div>
        <h1 class="nuxt-content">WIKI {{ title }} </h1>
        <div class="text-subtitle ml-1"> {{ article.description }} </div>
        <div class="text-caption ml-5" >updated: {{date(article.updatedAt)}}</div>
        <div class="text-caption ml-5" >file: contents{{article.path}}.md</div>
        <nav>
          <ul>
            <li v-for="link of article.toc" :key="link.id">
              <NuxtLink :to="`#${link.id}`" >{{ link.text }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <nuxt-content :document="article" />

  </article>
</template>
<script>
  export default {
    async asyncData({ $content, params }) {
      console.log('params', params);
      const contentSlug = $content(params.slug);
      console.log('contentSlug', $content, contentSlug);
      const article = await contentSlug.fetch()
      console.log('article', article);

      return { article }
    },

    methods: {
      date(d) {
        return (new Date(d)).toLocaleDateString();
      },
    },
    computed: {
      title() {
        return this.article.title || "(no title)";
      }
    }
  }
</script>
