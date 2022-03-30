<template>
  <v-row>
    <v-spacer/>
    <v-col
      lg=6 md=6 sm=6 cols=10
      class="mt-5"
    >
      <p class="mb-2 mt-5">ドライバー登録</p>
      <v-card 
        flat 
        class="modal-inner modal"
      >
        <v-card-text>
          <v-container>
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
                @click= createDriver()
                v-if= !btnClick
              >
                登録
              </v-btn>

              <v-btn
                class="grey"
                v-if= btnClick
              >
                登録
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
      name: "",
      capacity: 1,
      capacityItems: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      btnClick: false,
    }
  },
  methods: {
    async createDriver() {
      this.btnClick = true,
      await this.$axios.post("/drivers",
        {
          name: this.name,
          capacity: this.capacity,
        }
      );
      this.$router.push('/headquarters');
    },
  }
}
</script>

<style>

</style>