<template>
  <v-flex shrink>
    <v-container fluid fill-height pa-0>
      <v-layout row wrap justify-center align-center>
        <v-flex>
          INFORMATION
        </v-flex>
        <v-flex>
          <v-switch v-model="switch1" label="Multi"></v-switch>
        </v-flex> </v-layout
    ></v-container>
  </v-flex>
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
    ...mapActions("OpenLMAP", ["updateAppStatus", "updateSidebar"])
  },
  mounted() {
    this.updateSidebar(true);
  }
};
</script>
