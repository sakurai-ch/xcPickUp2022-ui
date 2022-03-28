<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card 
        nuxt 
        to="/headquarters"
        class="pink lighten-5 logo my-4 py-4 d-flex justify-center"
      >
        <v-card-title class="headline">
          本部
        </v-card-title>
      </v-card>

      <v-card
        v-for="driver in drivers" 
        :key="driver.id"
        nuxt 
        :to="'/driver/' + driver.id"
        class="modal logo my-4 py-4 d-flex justify-center"
      >
        <v-card-title class="headline">
          {{ driver.name }}
        </v-card-title>
      </v-card>

      <v-card 
        nuxt 
        to="/players"
        class="blue lighten-4 logo my-4 py-4 d-flex justify-center"
      >
        <v-card-title class="headline">
          選手用
        </v-card-title>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      drivers : [],
    };
  },
  methods: {
    async getDrivers() {
      this.drivers = (await this.$axios.get("/drivers/")).data.data;
    }
  },
  created() {
    this.getDrivers();
  }
}
</script>
