<template>
  <v-card dark>
    <v-card-actions>
      <v-container pa-0 ma-0>
        <v-layout
          row
          wrap
          align-center
          justify-start
          v-if="appStatus === 'display'"
        >
          <v-flex xs1 text-xs-center
            ><span>{{ $t("map.tools.name") | uppercase }}</span></v-flex
          >
          <v-flex shrink>
            <v-btn small icon color="accent" @click="toolAction('draw')"
              ><v-icon small>mdi-square-edit-outline</v-icon></v-btn
            >
            <v-btn small icon color="accent" @click="toolAction('measure')"
              ><v-icon small>mdi-tape-measure</v-icon></v-btn
            >
            <v-btn small icon color="accent" @click="toolAction('info')"
              ><v-icon small>mdi-information-variant</v-icon></v-btn
            >
            <v-btn small icon color="accent" @click="toolAction('print')"
              ><v-icon small>mdi-printer</v-icon></v-btn
            >
          </v-flex>
        </v-layout>
        <v-layout
          v-if="appStatus !== 'display'"
          row
          wrap
          align-center
          justify-start
        >
          <drawTool v-if="appStatus === 'draw'"></drawTool>
          <measureTool
            v-if="appStatus === 'measure'"
            :output="output"
          ></measureTool>
          <infoTool v-if="appStatus === 'info'"></infoTool>
          <printTool v-if="appStatus === 'print'"></printTool>
          <v-flex grow>
            <div class="text-xs-right">
              <v-btn small color="error" @click="toolActionCancel()"
                >{{ $t("map.tools.cancel") }}
                <v-icon right small>mdi-cancel</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Vue2Filters from "vue2-filters";

import infoTool from "@/components/infoTool";
import drawTool from "@/components/drawTool";
import measureTool from "@/components/measureTool";
import printTool from "@/components/printTool";

export default {
  name: "maptools",
  components: {
    drawTool,
    measureTool,
    infoTool,
    printTool
  },
  mixins: [Vue2Filters.mixin],
  props: {
    output: String
  },
  computed: {
    ...mapGetters("app", ["appStatus"])
  },
  methods: {
    ...mapActions("app", ["updateAppStatus"]),
    ...mapActions("map", ["map", "updateDrawType"]),
    toolAction(value) {
      this.updateAppStatus(value);
    },
    toolActionCancel() {
      this.$emit("cancel", this.appStatus);
      this.updateAppStatus("display");
      this.updateDrawType(undefined);
    }
  },
  watch: {}
};
</script>
