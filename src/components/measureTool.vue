<template>
  <v-container fluid pa-0 ma-0>
    <v-layout align-center justify-space-around row wrap fill-heigh>
      <v-flex xs9 md4 lg3>
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

          <!-- <template v-slot:append v-if="output"
            ><code class="result text-no-wrap black--text"
              >{{ $t("map.tools.result") | uppercase }} : {{ output }}</code
            >
          </template> -->
        </v-radio-group>
      </v-flex>
      <v-flex xs12 md4 lg1>
        <v-chip label color="pink" text-color="white" v-model="result">
          <v-icon left>label</v-icon>{{ output }}
        </v-chip>
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
    },
    result() {
      if (this.output) return true;
      return false;
    }
  },
  methods: {
    ...mapActions("app", ["updateAppStatus"]),
    ...mapActions("map", ["updateDrawType"]),
    toolAction(value) {
      this.updateAppStatus(value);
    },
    toolActionCancel() {
      this.updateAppStatus("display");
      this.updateDrawType(undefined);
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
