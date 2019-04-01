<template>
  <v-container grid-list-md fluid pa-1 ma-0>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12>
        <MapTools :output="measureOutput" @cancel="cancel"></MapTools>
      </v-flex>
      <v-flex>
        <vl-map
          ref="map"
          :load-tiles-while-animating="true"
          :load-tiles-while-interacting="true"
          style="height:800px;width:100%"
          @mounted="onMapMounted"
        >
          <vl-view
            :zoom.sync="zoom"
            :center.sync="centerInProjection"
            :rotation.sync="rotation"
          ></vl-view>

          <!-- Base layers from Vuex-->
          <vl-layer-tile
            v-for="(layer, key) in baseLayers"
            :key="key"
            :id="key"
            :visible="layer.visible"
          >
            <component
              :is="'vl-source-' + layer.name"
              v-bind="layer"
            ></component>
          </vl-layer-tile>
          <!--// Base layers from Vuex-->
          <!-- other layers from Vuex -->
          <component
            v-for="(layer, key) in layers"
            :is="layer.cmp"
            v-if="layer.visible"
            :key="key"
            :id="key"
            v-bind="layer"
          >
            <!-- add vl-source-* -->
            <component :is="layer.source.cmp" v-bind="layer.source">
              <!-- add static features to vl-source-vector if provided -->
              <vl-feature
                v-if="
                  layer.source.staticFeatures &&
                    layer.source.staticFeatures.length
                "
                v-for="feature in layer.source.staticFeatures"
                :key="feature.id"
                :id="feature.id"
                :properties="feature.properties"
              >
                <component
                  :is="geometryTypeToCmpName(feature.geometry.type)"
                  v-bind="feature.geometry"
                ></component>
              </vl-feature>

              <!-- add inner source if provided (like vl-source-vector inside vl-source-cluster) -->
              <component
                v-if="layer.source.source"
                :is="layer.source.source.cmp"
                v-bind="layer.source.source"
              >
                <!-- add static features to vl-source-vector if provided -->
                <vl-feature
                  v-if="
                    layer.source.source.staticFeatures &&
                      layer.source.source.staticFeatures.length
                  "
                  v-for="feature in layer.source.source.staticFeatures"
                  :key="feature.id"
                  :id="feature.id"
                  :properties="feature.properties"
                >
                  <component
                    :is="geometryTypeToCmpName(feature.geometry.type)"
                    v-bind="feature.geometry"
                  ></component>
                </vl-feature>
              </component>
            </component>
            <!--// vl-source-* -->

            <!-- add style components if provided -->
            <!-- create vl-style-box or vl-style-func -->
            <component
              v-if="layer.style"
              v-for="(style, i) in layer.style"
              :key="i"
              :is="style.cmp"
              v-bind="style"
            >
              <!-- create inner style components: vl-style-circle, vl-style-icon, vl-style-fill, vl-style-stroke & etc -->
              <component
                v-if="style.styles"
                v-for="(st, cmp) in style.styles"
                :key="cmp"
                :is="cmp"
                v-bind="st"
              >
                <!-- vl-style-fill, vl-style-stroke if provided -->
                <vl-style-fill v-if="st.fill" v-bind="st.fill"></vl-style-fill>
                <vl-style-stroke
                  v-if="st.stroke"
                  v-bind="st.stroke"
                ></vl-style-stroke>
              </component>
            </component>
            <!--// style -->
          </component>
          <!--// other layers from Vuex-->

          <!-- Drawing Layers -->
          <component
            v-for="(layer, key) in utilityLayers"
            :is="layer.cmp"
            v-if="
              layer.visible && (appStatus === 'draw' || appStatus === 'measure')
            "
            :key="key"
            :id="layer.id"
            v-bind="layer"
          >
            <component
              :is="layer.source.cmp"
              v-bind="layer.source"
              :ident="layer.id"
              :features.sync="drawnFeatures"
            >
            </component>
            <component
              v-if="layer.style"
              v-for="(style, i) in layer.style"
              :key="i"
              :is="style.cmp"
              v-bind="style"
            >
              <!-- create inner style components: vl-style-circle, vl-style-icon, vl-style-fill, vl-style-stroke & etc -->
              <component
                v-if="style.styles"
                v-for="(st, cmp) in style.styles"
                :key="cmp"
                :is="cmp"
                v-bind="st"
              >
                <!-- vl-style-fill, vl-style-stroke if provided -->
                <vl-style-fill v-if="st.fill" v-bind="st.fill"></vl-style-fill>
                <vl-style-stroke
                  v-if="st.stroke"
                  v-bind="st.stroke"
                ></vl-style-stroke>
              </component>
            </component>
          </component>
          <!--// Drawing Layers -->
          <!-- Interactions -->
          <vl-interaction-draw
            v-if="(appStatus === 'draw' || appStatus === 'measure') && drawType"
            source="draw-target"
            :type="drawType"
            :stopClick="true"
            @drawstart="measureDrawStart"
          ></vl-interaction-draw>
          <!--// Interactions-->
        </vl-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MapTools from "@/components/MapTools";
import { mapGetters } from "vuex";
import { fromLonLat } from "ol/proj";
import { getArea, getLength } from "ol/sphere.js";
import { Polygon } from "ol/geom.js";
import ScaleLine from "ol/control/ScaleLine";
import FullScreen from "ol/control/FullScreen";
import OverviewMap from "ol/control/OverviewMap";
import ZoomSlider from "ol/control/ZoomSlider";

export default {
  name: "OpenLMAP",
  components: {
    MapTools
  },
  data() {
    return {
      zoom: 5,
      rotation: 0,
      drawnFeatures: [],
      measureFeatures: [],
      measureOutput: ""
    };
  },
  computed: {
    ...mapGetters("OpenLMAP", [
      "mapCenter",
      "appStatus",
      "drawType",
      "baseLayers",
      "layers",
      "utilityLayers"
    ]),
    centerInProjection: {
      get: function() {
        return fromLonLat(this.mapCenter);
      },
      set: function() {
        return null;
      }
    }
  },
  methods: {
    formatLength(line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        output = Math.round(length * 100) / 100 + " " + "m";
      }
      return output;
    },
    formatArea(polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + " " + "km2";
      } else {
        output = Math.round(area * 100) / 100 + " " + "m2";
      }
      return output;
    },
    onMapMounted() {
      // now ol.Map instance is ready and we can work with it directly
      this.$refs.map.$map.getControls().extend([
        new ScaleLine(),
        new FullScreen(),
        new OverviewMap({
          collapsed: false,
          collapsible: true
        }),
        new ZoomSlider()
      ]);
    },
    measureDrawStart(evt) {
      if (this.appStatus === "draw") return;

      let sketch = evt.feature;
      sketch.getGeometry().on("change", evt => {
        let geom = evt.target;
        if (geom instanceof Polygon) {
          this.measureOutput = this.formatArea(geom);
        } else {
          this.measureOutput = this.formatLength(geom);
        }
      });
    },
    cancel() {
      this.drawnFeatures = [];
    }
  }
};
</script>
<style lang="css">
.ol-overviewmap
 {
  bottom: auto;
  left: auto;
  right: 0.5em;
  top: 0.5em;
}
</style>
