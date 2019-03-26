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
          style="height:600px;width:100%"
          @mounted="onMapMounted"
        >
          <vl-view
            :zoom.sync="zoom"
            :center.sync="centerInProjection"
            :rotation.sync="rotation"
          ></vl-view>

          <!-- Base layers -->
          <vl-layer-tile
            v-if="hasLayer(this.layers, 'OpenStreetMap')"
            :visible="
              findNested(this.layers[0], 'name', 'OpenStreetMap').visible
            "
          >
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>
          <vl-layer-tile
            v-if="hasLayer(this.layers, 'Bingmaps')"
            :visible="findNested(this.layers[0], 'name', 'Bingmaps').visible"
          >
            <vl-source-bingmaps
              :api-key="
                findNested(this.layers[0], 'name', 'Bingmaps')['api-key']
              "
              :imagery-set="
                findNested(this.layers[0], 'name', 'Bingmaps')['imagery-set']
              "
            ></vl-source-bingmaps>
          </vl-layer-tile>
          <!-- drawing layer -->
          <vl-layer-vector id="draw-pane" v-if="appStatus === 'draw'">
            <vl-source-vector
              ident="draw-target"
              :features.sync="drawnFeatures"
            >
              <vl-style-box>
                <vl-style-stroke color="red" :width="3"></vl-style-stroke>
                <vl-style-fill color="rgba(255,255,255,0.5)"></vl-style-fill>
                <vl-style-circle>
                  <vl-style-stroke color="red" :width="3"></vl-style-stroke>
                  <vl-style-fill color="rgba(255,255,255,0.5)"></vl-style-fill>
                </vl-style-circle>
              </vl-style-box>
            </vl-source-vector>
          </vl-layer-vector>
          <vl-layer-vector
            id="measure-draw-pane"
            v-if="appStatus === 'measure'"
          >
            <vl-source-vector
              ident="measure-draw-target"
              :features.sync="measureFeatures"
            >
              <vl-style-box>
                <vl-style-stroke color="#ffcc33" :width="2"></vl-style-stroke>
                <vl-style-fill color="rgba(255, 255, 255, 0.2)"></vl-style-fill>
                <vl-style-circle :radius="7">
                  <vl-style-fill color="#ffcc33"></vl-style-fill>
                </vl-style-circle>
              </vl-style-box>
            </vl-source-vector>
          </vl-layer-vector>
          <!-- Interactions -->
          <vl-interaction-draw
            v-if="appStatus === 'draw' && drawType"
            source="draw-target"
            :type="drawType"
          ></vl-interaction-draw>

          <vl-interaction-draw
            ref="measure"
            @drawstart="measureDrawStart"
            v-if="appStatus === 'measure'"
            source="measure-draw-target"
            :type="drawType"
            :stopClick="true"
          >
            <vl-style-box>
              <vl-style-stroke
                color="rgba(0, 0, 0)"
                :width="4"
                :lineDash="[10, 10]"
              ></vl-style-stroke>
              <vl-style-fill color="rgba(255, 255, 255, 0.2)"></vl-style-fill>
              <vl-style-circle :radius="5">
                <vl-style-stroke
                  color="rgba(0, 0, 0)"
                  :width="2"
                ></vl-style-stroke>
                <vl-style-fill color="rgba(0, 0, 0)"></vl-style-fill>
              </vl-style-circle>
            </vl-style-box>
          </vl-interaction-draw>
        </vl-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MapTools from "@/components/MapTools";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

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
      zoom: 16,
      rotation: 0,
      drawnFeatures: [],
      measureFeatures: [],
      measureOutput: ""
    };
  },
  computed: {
    ...mapGetters("OpenLMAP", ["mapCenter", "layers", "appStatus", "drawType"]),
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
    ...mapActions("OpenLMAP", ["updateDrawType"]),
    hasLayer(data, value) {
      return data.some(e => {
        if (e.name == value) return e;
        else if (e.children) {
          return this.hasLayer(e.children, value);
        }
      });
    },
    findNested(obj, key, value) {
      // console.log(Object.keys(obj));
      // Base case
      if (obj[key] === value) {
        return obj;
      } else if (obj.children) {
        for (let i = 0, len = Object.keys(obj.children).length; i < len; i++) {
          //TODO better logic
          if (typeof obj.children[i] == "object") {
            let found = this.findNested(obj.children[i], key, value);
            if (found) {
              // If the object was found in the recursive call, bubble it up.
              return found;
            }
          }
        }
      }
    },
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
    cancel(value) {
      if (value === "draw") {
        this.drawnFeatures = [];
      } else if (value === "measure") {
        this.measureFeatures = [];
      }

      return null;
    }
  },
  mounted() {},
  watch: {
    // appStatus: function() {
    //   if (this.appStatus === "measure") {
    //     this.$nextTick().then(() => {
    //       console.log(this.$refs.measure);
    //       console.log(this.$refs.measure.active);
    //     });
    //   }
    // },
    // immediate: true
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
