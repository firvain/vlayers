<template>
  <v-container fluid pa-0 ma-0>
    <v-layout align-center justify-start row wrap fill-heigh>
      <v-flex xs12 md4>
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
      </v-flex>
      <v-flex xs12 md2 lg1 class="text-xs-center">
        <v-btn small color="error" @click="toolActionCancel()"
          >{{ $t("map.tools.cancel") }}
          <v-icon right small>mdi-cancel</v-icon>
        </v-btn>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
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
    ...mapActions("map", ["updateDrawType"]),
    toolActionCancel() {
      this.updateAppStatus("display");
      this.updateDrawType(undefined);
    }
  },
  watch: {}
};
</script>
