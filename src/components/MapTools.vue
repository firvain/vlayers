<template>
  <v-card dark>
    <v-card-actions>
      <v-container pa-0 fluid fill-height>
        <v-layout row wrap align-center justify-start>
          <v-flex xs9 md9 lg9>
            <div class="text-xs-left">
              <v-btn
                small
                fab
                color="success"
                @click="toolAction('draw')"
                v-if="appStatus === 'display'"
                ><v-icon small>mdi-square-edit-outline</v-icon></v-btn
              >
              <v-btn
                small
                fab
                color="error"
                @click="toolAction('measure')"
                v-if="appStatus === 'display'"
                ><v-icon small>mdi-tape-measure</v-icon></v-btn
              >
              <v-btn
                small
                fab
                color="info"
                @click="toolAction('info')"
                v-if="appStatus === 'display'"
                ><v-icon small>mdi-information-variant</v-icon></v-btn
              >
              <drawTool v-if="appStatus === 'draw'"></drawTool>
              <measureTool
                v-if="appStatus === 'measure'"
                :output="output"
              ></measureTool>
              <infoTool v-if="appStatus === 'info'"></infoTool>
            </div>
          </v-flex>
          <v-flex xs3 md3 lg3>
            <div class="text-xs-right">
              <v-btn
                small
                color="error"
                v-if="appStatus !== 'display'"
                @click="toolActionCancel()"
                >cancel<v-icon right small>mdi-cancel</v-icon></v-btn
              >
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

import infoTool from "@/components/infoTool";
import drawTool from "@/components/drawTool";
import measureTool from "@/components/measureTool";

export default {
  name: "maptools",
  components: {
    drawTool,
    measureTool,
    infoTool
  },
  props: {
    output: String
  },
  computed: {
    ...mapGetters("OpenLMAP", ["appStatus"])
  },
  methods: {
    ...mapActions("OpenLMAP", ["updateAppStatus", "updateDrawType"]),
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
