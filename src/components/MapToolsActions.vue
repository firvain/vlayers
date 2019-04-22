<template>
  <v-flex xs12>
    <p class="ma-0 d-inline white--text">
      {{ $t("map.tools.name") | uppercase }}
    </p>

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
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "MapToolsActions",
  data() {
    return {};
  },
  methods: {
    ...mapActions("app", ["updateAppStatus"]),

    toolAction(value) {
      this.updateAppStatus(value);
    }
  }
};
</script>
