<template>
  <v-container v-if="this.selectedFeature.length !== 0" fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 v-for="(feature, key) in this.selectedFeature" :key="key">
        <v-card :color="pickRandomProperty($vuetify.theme)">
          <v-list dense>
            <v-list-tile
              v-for="(featureValue, feaureKey) in feature"
              :key="feaureKey"
              color="white"
            >
              <v-list-tile-action>
                <v-icon small color="white">mdi-record</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  v-text="feaureKey + ' : ' + featureValue"
                ></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "featureInfo",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("OpenLMAP", ["selectedFeature"])
  },
  methods: {
    pickRandomProperty(obj) {
      let result;
      let count = 0;
      for (var prop in obj) if (Math.random() < 1 / ++count) result = prop;
      return result;
    }
  },
  watch: {}
};
</script>
