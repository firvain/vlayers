<template>
  <v-container fuild fill-height>
    <v-layout align-center justify-center column fill-height>
      <v-flex xs3>
        <span class="display-3 font-weight-black ">Welcome</span>
      </v-flex>
      <v-flex xs3 pa-0>
        <span class="display-2 font-weight-regular">to</span>
      </v-flex>
      <v-flex xs3 pa-0>
        <span class="display-3 font-weight-black primary--text">
          Terrarum
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  date() {
    return {};
  }
};
</script>
