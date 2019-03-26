<template>
  <v-container fluid fill-height pa-0>
    <v-layout row wrap>
      <v-flex class="text-xs-center">
        INFO
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
    return {};
  },
  computed: {
    ...mapGetters("OpenLMAP", ["appStatus"])
  },
  methods: {
    ...mapActions("OpenLMAP", ["updateAppStatus"]),
    toolAction(value) {
      this.updateAppStatus(value);
    }
  }
};
</script>
