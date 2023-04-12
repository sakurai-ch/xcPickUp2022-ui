<template>
  <v-row>
    <!-- reload -->
    <v-col
      cols=6 
      class="mt-5"
    >
      <v-row justify="start" >
        <v-btn
          height=32
          color="grey mt-5 mb-0 mx-5"
          nuxt-link
          to="/"
        >
          戻る
        </v-btn>
      </v-row>
    </v-col>
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

    <!-- driver -->
    <v-col 
      class="text-center" 
      lg=12 md=12 sm=12 cols=12
    >
      <div 
        class="my-5 mb-10"
      >
        <p class="mb-1 ml-4 text-left">
        ■ {{ driver.name }} （定員：{{ driver.capacity }} ）
        </p>
        <table>
          <thead>
            <tr>
              <td width="7%">順</td>
              <td width="7%">{{$config.playerNo}}</td>
              <td width="10%">{{$config.trackerNo}}</td>
              <td width="20%">名前</td>
              <td width="13%">Class</td>
              <td width="10%">状態</td>
              <td width="10%">距離</td>
              <td width="10%">Map</td>
              <td width="10%"></td>
            </tr>
          </thead>
          <tbody>
            <template v-for="player in sortedPlayers">
              <template v-if="player.driver==driver.name && (player.state=='配車' || player.state=='済')">
                <tr 
                  :key= player.id 
                  style="height:36px;"
                >
                  <td>{{ player.order }}</td>
                  <td>{{ player.no }}</td>
                  <td>{{ player.comp_id }}</td>
                  <td>{{ player.name }}</td>
                  <td>{{ player.glider_type.substr(0,2) }}</td>
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
                  <td 
                    v-else 
                    :key="'map'+player.id"
                  ></td>
                  <td>
                    <v-icon
                      small
                      class="mr-2"
                      @click= openEdit(player)
                    >
                      mdi-pencil
                    </v-icon>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </v-col>
    
    <!-- edit box -->
    <div
      v-show="editModal"
      @click= closeModal()
      class="modal-outer"
    ></div>
    <v-card 
      v-show="editModal"
      flat 
      class="modal-inner modal"
    >
      <v-card-text>
        <v-container>
          <h2 class="mb-8">
            {{ $config.playerNo }}{{ editedPlayer.no }} / {{ $config.trackerNo }}{{ editedPlayer.comp_id }}<br>
            {{ editedPlayer.name }}
          </h2>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <p>回収状況</p>
              <v-radio-group
                v-model="editedPlayer.state"
                column
              >
                <template v-for="state in states">
                  <v-radio
                    :key= state.id
                    :label= state.label
                    :color= state.color
                    :value= state.value
                    class="mb-3 mr-5"
                  ></v-radio>
                </template>
              </v-radio-group>
            </v-col>
          </v-row>

        </v-container>
      </v-card-text>

      <v-row class="pa-10 pt-0 mt-0">
        <v-col cols=6>
          <v-row justify="start" >
            <v-btn
              color="grey"
              @click= closeModal()
            >
              キャンセル
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols=6>
          <v-row justify="end" >
            <v-btn
              class="orange lighten-3"
              @click= editPlayer()
              v-if= !btnClick
            >
              決定
            </v-btn>

            <v-btn
              class="grey"
              v-if= btnClick
            >
              決定
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-col cols="12" sm="8" md="6">
      <v-card>
        <GmapMap
          map-type-id="roadmap"
          :center="maplocation"
          :zoom="zoom"
          :style="styleMap"
          :options="mapOptions"
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in this.markers"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            :label="m.target_name"
          />
        </GmapMap>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  data() {
    return {
      driver: {},

      states : [
        { id: 3, label: "回収中", color: "primary", value: "配車" },
        { id: 4, label: "回収済", color: "grey",   value: "済"   },
      ],
      
      sortedPlayers : [],
      editedPlayer: {},
      currentPlayerState: "",
      currentPlayerDriver: "",
      currentPlayerMap: "",
      editModal:false,
      btnClick: false,

      markers: [],
      maplocation: { lat: 36.276837, lng: 140.145816 },
      zoom: 10,
      styleMap: {
        width: '100%',
        height: '400px',
      },
      mapOptions: {
        streetViewControl: false,
        styles: [],
      },
    };
  },
  methods: {
    loadData() {
      this.getDrivers();
      this.getPlayers();
    },

    async getDrivers() {
      const drivers = (await this.$axios.get("/drivers")).data.data;
      this.driver = drivers.find((driver) => driver.id == this.$route.params.id);
    },
    
    async getPlayers() {
      this.sortedPlayers = (await this.$axios.get("/players?sort=order")).data.data;
      this.createMap();
    },

    createMap() {
      let maxLat = null;
      let minLat = null;
      let maxLng = null;
      let minLng = null;
      this.markers = [];

      for (const player of this.sortedPlayers) {
        if( player.driver==this.driver.name && player.state=="配車" && player.no && player.latitude && player.longitude){
          // marker
          this.markers.push(
            {
              target_name: String(player.no),
              title: player.name,
              position: { 
                lat: Number(player.latitude), 
                lng: Number(player.longitude),
              },
            }
          );

          // max-min
          if( Number(player.latitude) > maxLat || maxLat == null ){
            maxLat = Number(player.latitude);
          }
          if( Number(player.latitude) < minLat || minLat == null ){
            minLat = Number(player.latitude);
          }
          if( Number(player.longitude) > maxLng || maxLng == null ){
            maxLng = Number(player.longitude);
          }
          if( Number(player.longitude) < minLng || minLng == null ){
            minLng = Number(player.longitude);
          }
        }
      }

      // map center
      if( maxLat == null || minLat == null ){
        this.maplocation.lat = 36.276837;
      } else {
        this.maplocation.lat = ( maxLat + minLat ) / 2; 
      }
      if( maxLng == null || minLng == null ){
        this.maplocation.lng = 140.145816;
      } else {
        this.maplocation.lng = ( maxLng + minLng ) / 2;
      }

      // map size
      const len =  Math.max( ( maxLat - minLat ) * 111 , 16 ) 
      this.zoom = 15 - Math.log2(len);
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

    openEdit(player) {
      this.editedPlayer = player;
      this.currentPlayerState = player.state;
      this.currentPlayerDriver = player.driver;
      this.currentPlayerMap = player.map;
      this.editModal = true;
    },

    closeModal() {
      this.editedPlayer.state = this.currentPlayerState;
      this.editedPlayer.driver = this.currentPlayerDriver;
      this.editedPlayer.map = this.currentPlayerMap;
      this.editModal = false;
    },

    async editPlayer() {
      this.btnClick = true;
      const updatedPlayer = await this.$axios.put("/players",
        {
          id: this.editedPlayer.id,
          state: this.editedPlayer.state,
          map: this.editedPlayer.map,
          driver: this.editedPlayer.driver,
        }
      )
      this.getPlayers();
      this.btnClick = false;
      this.editModal = false;
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

.modal-outer {
  position: absolute;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  background-color: rgba(0,0,0,0);
}

.modal-inner {
  position: absolute;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  min-width: 300px;
}

.red-text{
  color: red;
}

</style>