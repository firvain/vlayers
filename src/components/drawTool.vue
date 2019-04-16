<template>
  <v-radio-group
    ref="drawTypeRadioPicker"
    row
    v-model="radioGroup"
    hide-details
    :label="$t('map.tools.selectFeature') | uppercase"
    class="pa-1 ma-0"
    dark
  >
    <v-radio
      v-for="item in radioGroupItems"
      :key="item.id"
      :label="item.label"
      :value="item.value"
    ></v-radio>
  </v-radio-group>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "drawtool",
  data() {
    return {
      radioGroupItems: [
        {
          id: 1,
          label: "Point",
          value: "Point"
        },
        {
          id: 2,
          label: "LineString",
          value: "LineString"
        },
        {
          id: 3,
          label: "Polygon",
          value: "Polygon"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus"]),
    ...mapGetters("map", ["drawType"]),
    radioGroup: {
      get: function() {
        return this.drawType;
      },
      set: function(newValue) {
        this.updateDrawType(newValue);
      }
    }
  },
  methods: {
    ...mapActions("app", ["updateAppStatus"]),
    ...mapActions("map", ["updateDrawType"])
  },
  watch: {}
};
</script>
