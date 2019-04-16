<template>
  <v-container fluid pt-0 pb-1 pl-0 pr-0>
    <v-layout
      v-if="appStatus === 'display'"
      class="grey darken-3"
      align-center
      justify-start
      row
      fill-height
    >
      <v-flex pa-1 shrink
        ><span class="white--text">{{ $t("map.tools.name") | uppercase }}</span>
      </v-flex>
      <v-flex shrink>
        <v-btn icon color="accent" @click="toolAction('draw')"
          ><v-icon>mdi-square-edit-outline</v-icon></v-btn
        >
        <v-btn icon color="accent" @click="toolAction('measure')"
          ><v-icon>mdi-tape-measure</v-icon></v-btn
        >
        <v-btn icon color="accent" @click="toolAction('info')"
          ><v-icon>mdi-information-variant</v-icon></v-btn
        >
        <v-btn icon color="accent" @click="toolAction('print')"
          ><v-icon>mdi-printer</v-icon></v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout
      v-if="appStatus !== 'display'"
      class="grey darken-3"
      align-center
      justify-start
      row
      wrap
      fill-height
    >
      <v-flex pa-2 shrink v-if="appStatus === 'draw'"
        ><drawTool></drawTool
      ></v-flex>
      <v-flex pa-2 shrink v-if="appStatus === 'measure'">
        <measureTool :output="output"></measureTool>
      </v-flex>
      <v-flex pa-2 shrink v-if="appStatus === 'info'"
        ><infoTool></infoTool
      ></v-flex>
      <v-flex pa-2 shrink v-if="appStatus === 'print'">
        <printTool></printTool>
      </v-flex>
      <v-flex shrink>
        <div class="text-xs-right">
          <v-btn small color="error" @click="toolActionCancel()"
            >{{ $t("map.tools.cancel") }}
            <v-icon right small>mdi-cancel</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
