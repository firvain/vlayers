<template>
  <v-flex>
    <v-switch
      v-model="switch1"
      hide-details
      :label="$t('map.tools.info.multi') | uppercase"
      class="ma-0 pa-0"
    ></v-switch>
  </v-flex>
</template>
<script>
import Vue2Filters from "vue2-filters";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "infotool",
  mixins: [Vue2Filters.mixin],
  data() {
    return {};
  },
  computed: {
    ...mapGetters("OpenLMAP", ["appStatus", "multiInfo"]),
    switch1: {
      get() {
        return this.multInfo;
      },
      set(v) {
        this.updateMultinfo(v);
      }
    }
  },
  methods: {
    ...mapActions("OpenLMAP", [
      "updateAppStatus",
      "updateSidebar",
      "updateMultinfo"
    ])
  },
  mounted() {
    this.updateSidebar(true);
  }
};
</script>
