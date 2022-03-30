<template>
  <v-row>
    <!-- reload -->
    <v-col
      cols=6 
      class="mt-5"
    ></v-col>
    <v-col
      cols=6 
      class="mt-5"
    >
      <v-row justify="end" >
        <v-btn
          height=32
          color="orange lighten-3 mt-5 mb-0 mx-5"
          @click= loadData()
        >
          更新
        </v-btn>
      </v-row>
    </v-col>

    <!-- headquarters -->
    <v-col 
      class="text-center" 
      lg=12 md=12 sm=12 cols=12
    >
      <div class="my-5">
        <table>
          <thead>
            <tr>
              <td width="10%">No</td>
              <td width="20%">Name</td>
              <td width="15%">Type</td>
              <td width="10%">Sts</td>
              <td width="15%">Dist</td>
              <td width="10%">Map</td>
              <td width="10%">Drv</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="player in players" >
              <template>
                <tr :key= player.id>
                  <td>{{ player.no }}</td>
                  <td>{{ player.name }}</td>
                  <td>{{ player.glider_type }}</td>
                  <td 
                    :class= stateColor(player.state)
                    @click= openEdit(player)
                  >
                    {{ player.state }}
                  </td>
                  <td>{{ player.direction }}{{ player.distance }}</td>
                  <td 
                    v-if="player.map!='' && player.map!=null" 
                    :key="'map'+player.id"
                  >
                    <v-icon
                      small
                      class="mr-2"
                      @click= openMap(player)
                    >
                      mdi-google-maps
                    </v-icon>
                  </td>
                  <td v-else :key="'map'+player.id">
                  </td>
                  <td>{{ player.driver.substr(0,1) }}</td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  data() {
    return {
      players : [],
    };
  },
  methods: {
    loadData() {
      this.getPlayers();
    },

    async getPlayers() {
      this.players = (await this.$axios.get("/players")).data.data;
    },

    stateColor(playerState) {
      switch(playerState) {
        case "未":
          return "red-text";
        default:
      }
    },

    openMap(player) {
      window.open(player.map, '_blank');
    },
  },

  created() {
    this.loadData();
  }
}

</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

thead tr {
  border-top: solid 1px grey;
  border-bottom: solid 1px grey;
}

.red-text{
  color: red;
}

</style>