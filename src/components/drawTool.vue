<template>
  <v-flex>
    <v-radio-group
      ref="drawTypeRadioPicker"
      row
      v-model="radioGroup"
      hide-details
      :label="$t('map.tools.selectFeature') | uppercase"
      class="ma-0 pa-0"
    >
      <v-radio
        v-for="item in radioGroupItems"
        :key="item.id"
        :label="item.label"
        :value="item.value"
      ></v-radio>
    </v-radio-group>
  </v-flex>
</template>
<script>
import Vue2Filters from "vue2-filters";

import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "drawtool",
  mixins: [Vue2Filters.mixin],
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
  watch: {
    // appStatus(value) {
    //   if (value === "draw") {
    //     this.columns = 4;
    //   } else {
    //     this.columns = 1;
    //   }
    // }
  }
};
</script>
