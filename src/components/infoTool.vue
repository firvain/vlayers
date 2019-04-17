<template>
  <v-container fluid pa-0 ma-0>
    <v-layout align-center justify-space-around row wrap fill-heigh>
      <v-flex xs6 md4 lg2>
        <v-select
          v-model="selectedLayer"
          :items="items"
          :label="$t('map.tools.select.tooltip') | uppercase"
          solo
          dense
          hide-details
          return-object
          @change="updateActiveLayer"
        ></v-select>
      </v-flex>
      <v-flex xs6 md2 lg1>
        <v-switch
          v-model="switch1"
          hide-details
          dark
          :label="$t('map.tools.info.multi') | uppercase"
          class="ma-0 pa-0"
        ></v-switch>
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
import Vue2Filters from "vue2-filters";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "infotool",
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      selectedLayer: {}
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus", "multiInfo"]),
    ...mapGetters("map", ["layers", "multiInfo"]),
    items() {
      let target = [];
      Object.keys(this.layers).map(k => {
        // const original = this.layers[k];
        if (!this.layers[k]["visible"]) return;
        const value = k;
        const text = this.layers[k]["title"];
        const item = { value, text };
        target.push(item);
      });
      return target;
    },
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
      "updateMultinfo",
      "updateActiveLayer"
    ]),
    ...mapActions("map", ["updateMultinfo", "updateActiveLayer"]),
    toolActionCancel() {
      this.updateAppStatus("display");
    }
  },
  mounted() {
    // this.updateSidebar(true);
  }
};
</script>
