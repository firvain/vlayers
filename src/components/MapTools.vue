<template>
  <v-container fluid class="grey darken-3" pa-0>
    <v-layout align-center justify-start row wrap fill-height>
      <component :is="component"></component>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
// import MapToolsInfoToolTable from "@/components/MapToolsInfoToolTable.vue";

export default {
  name: "MapTools",
  data() {
    return {
      component: null
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus"])
  },
  methods: {},
  watch: {
    appStatus(newValue) {
      if (newValue === "display") {
        this.component = () => import("@/components/MapToolsActions");
      } else {
        this.component = () => import("@/components/MapToolsModules");
      }
    }
  },
  mounted() {
    this.component = () => import("@/components/MapToolsActions");
  }
};
</script>
