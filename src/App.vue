<template>
  <div id="app">
    <v-app id="GisApp">
      <v-navigation-drawer v-model="drawer" app :width="400" sm-and-down>
        <LayersTree></LayersTree>
      </v-navigation-drawer>
      <v-toolbar color="primary" dark fixed app>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title>Terra Gis</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/"><v-icon>mdi-home</v-icon></v-btn>
          <v-btn flat to="/map"><v-icon>mdi-map</v-icon></v-btn>
          <v-btn flat to="/about"><v-icon>mdi-information</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer color="primary" dark app>
        <span class="white--text">&copy; Terra Cognita 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import LayersTree from "@/components/LayersTree.vue";

export default {
  name: "App",
  components: {
    LayersTree
  },
  data() {
    return {
      drawer: false
    };
  },
  mounted() {
    console.log(this.$router.path);
  }
};
</script>
