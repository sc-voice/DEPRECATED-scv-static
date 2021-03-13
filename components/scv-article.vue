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
          <span v-if="dir && dir !== 'wiki'">
            <NuxtLink :to="`/wiki/${dir}`">{{ dir }}</NuxtLink>
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
            <div class="text-caption" >
              updated: {{date(article.updatedAt)}} ({{language}})
            </div>
            <nav v-if="article.toc">
              <ul>
                <li >
                  <b>env:</b> {{$nuxt.context.env}}
                </li>
                <li >
                  <b>Source:</b> {{sourceUrl}}
                </li>
                <li v-for="link of article.toc" :key="link.id">
                  <NuxtLink :to="`#${link.id}`" >{{ link.text }}</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </details>
      </div>
    </div>
    <div v-if="article.link" class="scv-article-link">
      <a :href="article.link">{{article.link}}</a>
    </div>

    <slot>
      <!--
        <nuxt-content :document="article" />
      -->
    </slot>

    <scv-article-items :article="article" :items="items" />
  </article>
</template>
<script>
  import ScvArticleItems from './scv-article-items';
  export default {
    components: {
      ScvArticleItems,
    },
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
        let items = await $content(slugDir)
          .only(['title', 'description', 'img', 'slug', 'order', 'author'])
          .fetch();

        this.items = items.sort((a,b) => {
          let cmp = Number(a.order ?? 9999) - Number(b.order ?? 9999);
          if (cmp) {
            return cmp;
          }
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase);
        });
      }
    },
    methods: {
      date(d) {
        return (new Date(d)).toLocaleDateString(navigator.language);
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
      language() {
        return navigator.language;
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
      sourceUrl() {
        let { path } = this.article;
        let { repository } = this.$nuxt.context.env;
        return `https://github.com/ACCOUNT/${repository}/content${path}.md`;
      },
      title() {
        return this.article.title || "(no title)";
      }
    }
  }
</script>
