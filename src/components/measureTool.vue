<template>
  <v-radio-group
    ref="measureTypeRadioPicker"
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

    <template v-slot:append v-if="output"
      ><code class="result text-no-wrap black--text"
        >{{ $t("map.tools.result") | uppercase }} : {{ output }}</code
      >
    </template>
  </v-radio-group>
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
    return {
      radioGroupItems: [
        {
          id: 1,
          label: "LineString",
          value: "LineString"
        },
        {
          id: 2,
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
    ...mapActions("app", ["updateAppStatus"]),
    ...mapActions("map", ["updateDrawType"]),
    toolAction(value) {
      this.updateAppStatus(value);
    }
  }
};
</script>
<style lang="scss" scoped>
.result {
  // line-height: 2 !important;
  font-size: 100%;
}
</style>
