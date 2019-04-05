<template>
  <v-container pa-0 text-xs-left>
    <v-layout row wrap align-center>
      <v-flex shrink>
        INFORMATION
      </v-flex>
      <v-flex shrink>
        <v-switch v-model="switch1" label="Multi"></v-switch>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "infotool",
  data() {
    return {
      switch1: true
    };
  },
  computed: {
    ...mapGetters("OpenLMAP", ["appStatus"])
  },
  methods: {
    ...mapActions("OpenLMAP", ["updateAppStatus"])
  }
};
</script>
