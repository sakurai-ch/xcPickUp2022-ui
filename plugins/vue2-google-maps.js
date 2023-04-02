import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDl8xxS8qKPoS2iLHWQSQYn6FzYKpIAwnM',
    libraries: 'places',
  },
})