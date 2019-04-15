<template>
  <v-flex shrink>
    <v-container>
      <v-layout row wrap align-center justify-center>
        <v-flex shrink>
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
        <v-flex shrink>
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
        <v-flex shrink>
          <v-btn small color="success" @click="exportButton">
            Print
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>
<script>
import jsPDF from "jspdf";

export default {
  data() {
    return {
      selectDim: { text: "a4", value: [420, 297] },
      dims: [
        { text: "a1", value: [1189, 841] },
        { text: "a2", value: [841, 594] },
        { text: "a3", value: [594, 420] },
        { text: "a4", value: [420, 297] },
        { text: "a5", value: [210, 148] }
      ],
      resolutions: [
        { text: "72 dpi (fast)", value: "72" },
        { text: "150 dpi", value: "150" },
        { text: "300 dpi (slow)", value: "300" }
      ],
      selectResolution: { text: "150 dpi", value: "150" }
    };
  },
  methods: {
    exportButton() {
      const canvas = document.querySelector("#mymap canvas");
      const data = canvas.toDataURL("image/jpeg");
      const width = Math.round(
        (this.selectDim.value[0] * this.selectResolution.value) / 25.4
      );
      const height = Math.round(
        (this.selectDim.value[1] * this.selectResolution.value) / 25.4
      );
      console.log(width, height);
      const pdf = new jsPDF("landscape", undefined, this.selectDim.text);
      pdf.addImage(
        data,
        "JPEG",
        0,
        0,
        this.selectDim.value[0].toString(),
        this.selectDim.value[1].toString()
      );
      pdf.save("map.pdf");
    }
  }
};
</script>
