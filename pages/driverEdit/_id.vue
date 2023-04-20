<template>
  <v-row>
    <v-spacer/>
    <v-col
      lg=6 md=6 sm=6 cols=10
      class="mt-5"
    >
      <p class="mb-2 mt-5 text-h6">ドライバー編集</p>
      <p class="mb-0 mt-5">・ドライバー名の最初の2文字が、選手が確認する画面に表示されます。</p>
      <p class="mb-2 mt-0 red--text">★選手を配車した状態の時は、ドライバー名の変更はしないで下さい。</p>
      <v-card 
        flat 
        class="modal-inner modal"
      >
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols=2>
                <span>ID</span>
                <v-text-field v-model="id"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols=12>
                <span>名前</span>
                <v-text-field v-model="name"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols=4>
                <span>定員</span>
                <v-select
                  v-model="capacity"
                  :items= capacityItems
                  width= 100px
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-row class="pa-10 pt-0 mt-0">
          <v-col cols=6>
            <v-row justify="start" >
              <v-btn
                color="grey"
                nuxt-link
                to="/headquarters"
              >
                キャンセル
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols=6>
            <v-row justify="end" >
              <v-btn
                class="orange lighten-3"
                @click= updateDriver()
                v-if= !btnClick
              >
                編集
              </v-btn>

              <v-btn
                class="grey"
                v-if= btnClick
              >
                編集
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-spacer/>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      driver: {},
      id: null,
      name: "",
      capacity: 1,
      capacityItems: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,70],
      btnClick: false,
    }
  },
  methods: {
    async getDrivers() {
      const drivers = (await this.$axios.get("/drivers")).data.data;
      this.driver = drivers.find((driver) => driver.id == this.$route.params.id);

      this.id = this.driver.id;
      this.name = this.driver.name;
      this.capacity = this.driver.capacity;
    },

    async updateDriver() {
      this.btnClick = true,
      await this.$axios.put("/drivers",
        {
          id: this.id,
          name: this.name,
          capacity: this.capacity,
        }
      );
      this.$router.push('/headquarters');
    },
  },

  created() {
    this.getDrivers();
  }
}
</script>

<style>

</style>