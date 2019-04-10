<template>
  <v-flex>
    <v-radio-group
      ref="measureTypeRadioPicker"
      row
      v-model="radioGroup"
      hide-details
      :label="$t('map.tools.selectFeature') | uppercase"
      class="ma-0 pa-0"
    >
      <v-radio label="LineString" value="LineString"></v-radio>
      <v-radio label="Polygon" value="Polygon"></v-radio>
      <template v-slot:append v-if="output"
        ><code class="a body-2 text-no-wrap black--text"
          >{{ $t("map.tools.result") | uppercase }} : {{ output }}</code
        >
      </template>
    </v-radio-group>
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
<style lang="scss" scoped>
.a {
  line-height: 2;
}
</style>
