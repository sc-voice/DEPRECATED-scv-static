<template>
  <article class="nuxt-content scv-article">
    <div class="scv-wiki-heading">
      <a :href="imgSrc" target="_blank">
        <img :src="article.img" />
      </a>
      <div>
        <div class="text-caption" >
          <NuxtLink to="/wiki">Wiki</NuxtLink>
          &gt;
          <span v-if="dir">
            <NuxtLink :to="`/wiki/${dir}-index`">{{ dir }}</NuxtLink>
            &gt;
          </span>
          {{pagePath}}
        </div>
        <h1 class="nuxt-content">{{ title }} </h1>
        <details class="ml-1">
          <summary class="text-caption">
            {{ article.description }} 
          </summary>
          <div class="ml-5">
            <div class="text-caption" >updated: {{date(article.updatedAt)}}</div>
            <nav v-if="article.toc">
              <ul>
                <li v-for="link of article.toc" :key="link.id">
                  <NuxtLink :to="`#${link.id}`" >{{ link.text }}</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </details>
      </div>
    </div>

    <nuxt-content :document="article" />

    <div v-if="article.slugDir"
      <div v-for="item of items" 
        :key="item.slug" 
        v-if="item.title"
        class="scv-toc-item">
        <NuxtLink :to="itemLink(item)">
          <img :src="item.img" style="height:50px"/>
          <div class="scv-toc-item-text">
            <div class="scv-toc-item-title">
              {{ item.title }}
            </div>
            <div class="scv-toc-item-subtitle">
              {{ item.description }}
            </div>
          </div>
        </NuxtLink>
      </div><!-- scv-toc-item -->
    </div> <!-- article.slugDir -->

  </article>
</template>
<script>
  export default {
    props: {
      article: {
        type: Object,
        default: ()=>({
          title: 'article.title?',
          description: 'article.description?',
          path: 'article.path?',
          updatedAt: 'article.updatedAt?',
          slugDir: null,
        }),
      }
    },
    data: ()=>({
      items: []
    }),
    async fetch() {
      const { article, $content } = this;
      const { slugDir } = article;
      if (slugDir) {
        this.items = await $content(slugDir).fetch();
      }
    },
    methods: {
      date(d) {
        return (new Date(d)).toLocaleDateString();
      },
      itemLink(item) {
        let { article } = this;
        return { 
          name: `${article.slugDir}-slug`, 
          params: { slug: item.slug } 
        }
      },
    },
    computed: {
      dir() {
        return this.article.dir.replace('/','');
      },
      imgSrc() {
        let { article={} } = this;
        let { img, imgSrc } = article;

        if (!imgSrc) {
          if (/-unsplash/.test(img)) {
            imgSrc = img.replace(/-unsplash.*/,'');
            imgSrc = imgSrc.substring(imgSrc.length - 11);
            imgSrc = `https://unsplash.com/photos/${imgSrc}`;
          }
        }

        return imgSrc;
      },
      pagePath() {
        return this.article.path
            .replace(/.*\//, '')
            .replace(/\.md/, '')
      },
      title() {
        return this.article.title || "(no title)";
      }
    }
  }
</script>
