<template>
  <v-container v-if="this.selectedFeature.length !== 0" fluid grid-list-lg>
    <v-data-table
      :headers="headers"
      :items="this.selectedFeature"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="row">
        <td v-for="(i, key) in row.item" :key="key">
          {{ i }}
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "featureInfo",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("OpenLMAP", ["selectedFeature"]),
    headers() {
      let header = [];
      for (const item of Object.keys(this.selectedFeature[0])) {
        header.push({ text: item, align: "left", sortable: true, value: item });
      }
      console.log(header);
      return header;
    }
  },
  methods: {
    pickRandomProperty(obj) {
      let result;
      let count = 0;
      for (var prop in obj) if (Math.random() < 1 / ++count) result = prop;
      return result;
    }
  },
  watch: {}
};
</script>
