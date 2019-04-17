<template>
  <v-container fluid pa-0 ma-0>
    <v-layout align-center justify-space-around row wrap fill-heigh>
      <v-flex xs3 md2 lg1>
        <v-select
          v-model="selectDim"
          :items="dims"
          label="Standard"
          solo
          dense
          hide-details
          return-object
        ></v-select>
      </v-flex>

      <v-flex xs3 md2 lg1>
        <v-select
          v-model="selectResolution"
          :items="resolutions"
          label="Standard"
          solo
          dense
          hide-details
          return-object
        ></v-select>
      </v-flex>
      <v-flex xs3 md2 lg1 class="text-xs-center">
        <v-btn
          small
          color="success"
          @click="exportButton"
          :loading="print.loading"
          :disabled="print.loading"
        >
          Print
        </v-btn>
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
// import jsPDF from "jspdf";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selectDim: { text: "a4", value: [420, 297] },
      dims: [
        { text: "A1", value: [1189, 841] },
        { text: "A2", value: [841, 594] },
        { text: "A3", value: [594, 420] },
        { text: "A4", value: [420, 297] },
        { text: "A5", value: [210, 148] }
      ],
      resolutions: [
        { text: "72 dpi (fast)", value: "72" },
        { text: "150 dpi", value: "150" },
        { text: "300 dpi (slow)", value: "300" }
      ],
      selectResolution: { text: "150 dpi", value: "150" }
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus", "print"])
  },
  methods: {
    ...mapActions("app", ["updateAppStatus", "updatePrint"]),
    exportButton() {
      const width = Math.round(
        (this.selectDim.value[0] * this.selectResolution.value) / 25.4
      );
      const height = Math.round(
        (this.selectDim.value[1] * this.selectResolution.value) / 25.4
      );
      const dim0 = this.selectDim.value[0];
      const dim1 = this.selectDim.value[1];
      const format = this.selectDim.text;

      this.updatePrint({
        value: true,
        height,
        width,
        dim0,
        dim1,
        format,
        loading: true
      });
    },
    toolActionCancel() {
      this.updateAppStatus("display");
    }
  }
};
</script>
