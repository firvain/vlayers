<template>
  <div id="app">
    <v-app id="GisApp">
      <v-navigation-drawer v-model="drawer" app :width="400" sm-and-down>
        <LayersTree></LayersTree>
        <!-- <featureInfo v-if="appStatus === 'info'"></featureInfo> -->
      </v-navigation-drawer>
      <v-toolbar color="primary" dark fixed app >
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title>Terra Gis</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items >
     
          <v-btn flat to="/"><v-icon>mdi-home</v-icon></v-btn>
          <v-btn flat to="/map"><v-icon>mdi-map</v-icon></v-btn>
          <v-btn flat to="/about"><v-icon>mdi-information</v-icon></v-btn>
          
         
        </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-down"> 
           <v-btn @click="country('en')" depressed flat small><country-flag country='gb' size='normal'/></v-btn>
          <v-btn @click="country('gr')" depressed flat small><country-flag country='gr' size='normal' @click="country('gr')"/></v-btn>
          <v-btn @click="country('mk')" depressed flat small><country-flag country='mk' size='normal' @click="country('mk')"/></v-btn>
         
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
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CountryFlag from 'vue-country-flag';
import LayersTree from "@/components/LayersTree.vue";
// import featureInfo from "@/components/featureInfo.vue";

export default {
  name: "App",
  components: {
    LayersTree,
    CountryFlag
    // featureInfo
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("OpenLMAP", ["appStatus", "sidebar"]),
    drawer: {
      get() {
        return this.sidebar;
      },
      set(value) {
        this.updateSidebar(value);
      }
    }
  },
  methods: {
    ...mapActions("OpenLMAP", ["updateSidebar"]),
    country(v) {
      this.$i18n.set(v)
    }
  }
};
</script>
