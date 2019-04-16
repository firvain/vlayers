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
    ...mapGetters("app", ["appStatus", "multiInfo"]),
    ...mapGetters("map", ["multiInfo"]),
    switch1: {
      get() {
        return this.multiInfo;
      },
      set(v) {
        this.updateMultinfo(v);
      }
    }
  },
  methods: {
    ...mapActions("app", [
      "updateAppStatus",
      "updateSidebar",
      "updateMultinfo"
    ]),
    ...mapActions("map", ["updateMultinfo"])
  },
  mounted() {
    this.updateSidebar(true);
  }
};
</script>
