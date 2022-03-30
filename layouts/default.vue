<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      :style="{ background: $vuetify.theme.themes.light.bar }"
      style="z-index:900;"
    >
      <v-toolbar-title v-text="title"/>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
      :style="{ background: $vuetify.theme.themes.light.bar }"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      title: '2022 Sky Grand Prix in Ashio'
    }
  }
}
</script>
