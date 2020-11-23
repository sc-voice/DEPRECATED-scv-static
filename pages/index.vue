<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <Logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to ScvExamples
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Search"
          />
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

export default {
  components: {
    Logo,
  }
}
</script>
