<template>
  <v-container fluid pt-0 pb-1 pl-0 pr-0>
    <v-layout
      v-if="appStatus === 'display'"
      class="grey darken-3"
      align-center
      justify-start
      row
      wrap
      fill-height
      xs6
    >
      <v-flex shrink>
        <p style="display:inline-block;color:white">{{ $t("map.tools.name") | uppercase }}</p>
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
      <v-flex pa-2 xs12 v-if="appStatus === 'draw'"
        ><drawTool></drawTool
      ></v-flex>
      <v-flex pa-2 xs12 v-if="appStatus === 'measure'">
        <measureTool :output="output"></measureTool>
      </v-flex>
      <v-flex pa-2 xs12 v-if="appStatus === 'info'"
        ><infoTool></infoTool
      ></v-flex>
      <v-flex pa-2 xs12 v-if="appStatus === 'print'">
        <printTool></printTool>
      </v-flex>
      <!-- <v-spacer></v-spacer> -->
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
    }
  },
  watch: {}
};
</script>
