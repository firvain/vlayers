<template>
  <v-flex shrink>
    <v-container fluid fill-height pa-0 text-xs-center>
      <v-layout row wrap justify-center align-center>
        <v-flex>
          <v-radio-group ref="measureTypeRadioPicker" row v-model="radioGroup">
            <v-radio label="LineString" value="LineString"></v-radio>
            <v-radio label="Polygon" value="Polygon"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex>{{ output }}</v-flex>
      </v-layout></v-container
    >
  </v-flex>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "measuretool",
  props: {
    output: String
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("OpenLMAP", ["appStatus", "drawType"]),
    radioGroup: {
      get: function() {
        if (this.drawType) {
          return this.drawType;
        }
        this.updateDrawType("LineString");
        return "LineString";
      },
      set: function(newValue) {
        this.updateDrawType(newValue);
      }
    }
  },
  methods: {
    ...mapActions("OpenLMAP", ["updateAppStatus", "updateDrawType"]),
    toolAction(value) {
      this.updateAppStatus(value);
    }
  },
  mounted() {
    // this.updateDrawType("LineString");
  },
  updated() {
    // this.updateDrawType("LineString");
  }
};
</script>
