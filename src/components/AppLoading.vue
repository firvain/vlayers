<template>
  <div class="text-xs-center">
    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "AppLoading",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("app", ["loading"])
  }
};
</script>
