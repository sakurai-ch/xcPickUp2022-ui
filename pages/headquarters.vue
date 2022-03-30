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

    <!-- headquarters -->
    <v-col 
      class="text-center" 
      lg=6 md=6 sm=6 cols=12
    >
      <div class="my-5">
        <p class="mb-1 ml-4 text-left">
          ■ 未手配
        </p>
        <table>
          <thead>
            <tr>
              <td width="10%">No</td>
              <td width="20%">Name</td>
              <td width="15%">Type</td>
              <td width="10%">Sts</td>
              <td width="15%">Dist</td>
              <td width="10%">Map</td>
              <td width="10%">Edit</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="player in players" >
              <template v-if="player.driver=='---'">
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

    <!-- driver -->
    <v-col 
      class="text-center" 
      lg=6 md=6 sm=6 cols=12
    >
      <div 
        v-for="driver in drivers" 
        :key= driver.id
        class="my-5 mb-10"
      >
        <p class="mb-1 ml-4 text-left">
        ■ {{ driver.name }} （定員：{{ driver.capacity }} ）
        </p>
        <table>
          <thead>
            <tr>
              <td width="10%">No</td>
              <td width="20%">Name</td>
              <td width="15%">Type</td>
              <td width="10%">Sts</td>
              <td width="15%">Dist</td>
              <td width="10%">Map</td>
              <td width="10%">Edit</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="player in players">
              <template v-if="player.driver==driver.name">
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
                    v-if="player.map!=''" 
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

      <!-- button -->
      <v-row 
        justify="end" 
        class="mt-10 mr-2"
      >
        <v-btn
          height=28
          color="grey mb-10"
          nuxt-link
          to="/driverRegister"
        >
          ドライバー追加
        </v-btn>
      </v-row>

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
            {{ editedPlayer.id }}  {{ editedPlayer.name }}
          </h2>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <p>手配状況</p>
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
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <p>回収担当</p>
              <v-radio-group
                v-model="editedPlayer.driver"
                row
              >
                <v-radio
                  :label= noDriver
                  color="yellow"
                  :value= noDriver
                  class="mb-3 mr-5"
                ></v-radio>
                <template v-for="driver in drivers">
                  <v-radio
                    :key="driver.id"
                    :label="driver.name"
                    :color= driver.color
                    :value="driver.name"
                    class="mb-3 mr-5"
                  ></v-radio>
                </template>
              </v-radio-group>
            </v-col>
            <v-col>
              <span>GoogleマップURL</span>
              <v-text-field v-model="editedPlayer.map"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>回収依頼サンプル</span>
              <v-icon 
                @click="copyMessage()" 
                class="ml-2 mb-3"
              >
                mdi-content-copy
              </v-icon>
              <div style="border:solid 1px;" class="pt-2 px-3 pb-0">
                <p id="copyMessage" style="max-width:600px">
                  {{ editedPlayer.driver }}さん<br>
                  No.{{ editedPlayer.id }}  {{ editedPlayer.name }}さん({{ editedPlayer.glider_type }})の回収をお願いします。<br>
                  TOから{{ editedPlayer.direction }}{{ editedPlayer.distance }}Km地点です。<br>
                  {{ editedPlayer.map }}
                </p>
              </div>
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

  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  data() {
    return {
      drivers : [],
      noDriver : "---",
      selfDriver : "自己回収",

      states : [
        { id: 1, label: "---",    color: "yellow",  value: "---"  },
        { id: 2, label: "未",     color: "red",     value: "未"   },
        { id: 3, label: "手配済", color: "primary", value: "手配" },
        { id: 4, label: "回収済", color: "grey",   value: "済"   },
      ],
      
      players : [],
      editedPlayer: {},
      currentPlayerState: "",
      currentPlayerDriver: "",
      currentPlayerMap: "",
      editModal:false,
      btnClick: false,
    };
  },
  methods: {
    loadData() {
      this.getDrivers();
      this.getPlayers();
    },

    async getPlayers() {
      this.players = (await this.$axios.get("/players")).data.data;
    },

    async getDrivers() {
      this.drivers = (await this.$axios.get("/drivers")).data.data;
      this.drivers.forEach(driver => driver["color"]="primary");
      this.drivers.push(
        { 
          id: this.drivers.length+1, 
          name: this.selfDriver, 
          capacity: "-", 
          created_at: "", 
          updated_at: "", 
          color: "grey" 
        }
      );
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

    copyMessage() {
      const copyMessage = document.querySelector('#copyMessage');
      navigator.clipboard.writeText(copyMessage.innerText);
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
  min-width: 350px;
}

.red-text{
  color: red;
}

@media (max-width: 768px) {
  .modal-inner {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
    min-width: 350px;
  }
}
</style>