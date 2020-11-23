<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <Logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to scv-examples
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Search"
          />
          examples: {{examples}}
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
import Logo from '~/components/logo.vue'
import examples from '../api/examples.json'

export default {
  components: {
    Logo,
  },
  computed: {
    g() {
        return this.$g || {};
    },
    examples() {
        let {
            language,
        } = this.g;
        let lang = (language||'noLanguage').split('-')[0];
        return examples[lang] || `no-examples ${lang}`;
    },
  },
}
</script>
