<template>
  <OpenLMAP></OpenLMAP>
</template>
<script>
import { mapActions } from "vuex";

import OpenLMAP from "@/components/OpenLMAP.vue";

export default {
  name: "Map",
  components: {
    OpenLMAP
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("app", ["updateLoading"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.updateLoading(true);
    });
  }
};
</script>
