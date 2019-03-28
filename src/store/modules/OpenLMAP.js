import { loadingBBox } from "vuelayers/lib/ol-ext";

// const findNested = (obj, key, value) => {
//   // console.log(obj);
//   // Base case
//   if (obj[key] === value) {
//     return obj;
//   } else if (obj.children) {
//     for (let i = 0, len = Object.keys(obj.children).length; i < len; i++) {
//       //TODO better logic
//       if (typeof obj.children[i] == "object") {
//         // console.log(this);
//         let found = findNested(obj.children[i], key, value);
//         if (found) {
//           // If the object was found in the recursive call, bubble it up.
//           return found;
//         }
//       }
//     }
//   }
// };

const state = {
  baseLayersList: [100, 101, 102],
  baseLayers: {
    100: {
      name: "osm",
      title: "OpenStreetMap",
      visible: true
    },
    101: {
      name: "sputnik",
      title: "Sputnik Maps",
      visible: false
    },
    102: {
      name: "bingmaps",
      title: "Bing Maps",
      apiKey:
        "Ap3sskZ5BccP6TvBr0FoLc9orA4_R1uh-8UjpOKYciXL1hNMtAJr_BdxMjTJNkpv",
      imagerySet: "AerialWithLabels",
      visible: false
    }
  },
  layersList: [200, 201],
  layers: {
    // Tile layer with WMS source
    // 4: {
    //   id: "wms",
    //   title: "NATURA",
    //   cmp: "vl-layer-tile",
    //   visible: false,
    //   source: {
    //     cmp: "vl-source-wms",
    //     url:
    //       "http://geodata.gov.gr/geoserver/ows?service=WMS&request=GetMap&version=1.3.0&WIDTH=256&HEIGHT=256&format=image/png&srs=EPSG:4326&bbox=32.573282,16.944492,42.724649,30.83121",
    //     layers: "geodata.gov.gr:262a95fb-2d88-4df8-980f-5ed4de44245b",
    //     extParams: { TILED: true },
    //     serverType: "geoserver"
    //   }
    // },
    200: {
      title: "Natura 2000",
      cmp: "vl-layer-vector",
      visible: true,
      renderMode: "image",
      source: {
        cmp: "vl-source-vector",
        features: [],
        url(extent, resolution, projection) {
          return (
            "http://geodata.gov.gr/geoserver/ows?service=WFS&" +
            "&request=GetFeature&version=2.0.0" +
            "&outputFormat=json&srsName=" +
            projection +
            "&typeNames=geodata.gov.gr:262a95fb-2d88-4df8-980f-5ed4de44245b&count=100"
          );
        },
        strategyFactory() {
          return loadingBBox;
        }
      },
      style: [
        {
          cmp: "vl-style-box",
          styles: {
            "vl-style-stroke": {
              width: 2,
              color: "#69a01b"
            },
            "vl-style-fill": {
              color: [105, 160, 27, 0.5]
            }
          }
        }
      ]
    },
    201: {
      title: "Countries",
      cmp: "vl-layer-vector",
      visible: true,
      source: {
        cmp: "vl-source-vector",
        projection: "EPSG:4326",
        url:
          "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson"
      },
      style: [
        {
          cmp: "vl-style-box",
          styles: {
            "vl-style-fill": {
              color: [255, 255, 255, 0.5]
            },
            "vl-style-stroke": {
              color: "#219e46",
              width: 2
            },
            "vl-style-text": {
              text: "\uf041",
              font: "24px FontAwesome",
              fill: {
                color: "#2355af"
              },
              stroke: {
                color: "white"
              }
            }
          }
        }
      ]
    }
  },
  utilityLayersList: [1000, 1001],
  utilityLayers: {
    100: {},
    101: {}
  },
  appStatus: "display",
  mapCenter: [21.78896, 40.30069],
  drawType: undefined,
  measureOutput: ""
};

const getters = {
  mapCenter: state => state.mapCenter,
  appStatus: state => state.appStatus,
  drawType: state => state.drawType,
  measureOutput: state => state.measureOutput,
  baseLayersList: state => state.baseLayersList,
  baseLayers: state => state.baseLayers,
  layersList: state => state.layersList,
  layers: state => state.layers
};
const mutations = {
  UPDATE_APP_STATUS(state, payload) {
    state.appStatus = payload;
  },
  setMapCenter(state, payload) {
    state.mapCenter = payload;
  },
  UPDATE_LAYER_VISIBILITY(state, { item, value }) {
    Object.assign(item, { visible: value });
  },
  UPDATE_MAP_CENTER(state, payload) {
    state.mapCenter = payload;
  },
  UPDATE_DRAW_TYPE(state, payload) {
    state.drawType = payload;
  },
  UPDATE_MEASURE_OUTPUT(state, payload) {
    state.measureOutput = payload;
  }
};
const actions = {
  updateMapCenter({ commit }, payload) {
    commit("UPDATE_MAP_CENTER", payload);
  },
  updateVisibility({ commit }, { id, value }) {
    let item;
    if (state.baseLayersList.includes(parseInt(id))) {
      /* first find and change Clicked Base Layer Visibility */
      item = state.baseLayers[id];
      commit("UPDATE_LAYER_VISIBILITY", { item, value });
      /* then find and change other Base Layers Visibility*/
      Object.keys(state.baseLayers).forEach(i => {
        if (i !== id) {
          item = state.baseLayers[i];
          let value = false; //! mutation is BAD!!!
          commit("UPDATE_LAYER_VISIBILITY", { item, value });
        }
      });
    } else if (!state.baseLayersList.includes(parseInt(id))) {
      item = state.layers[id];
      commit("UPDATE_LAYER_VISIBILITY", { item, value });
    }
  },
  updateAppStatus({ commit }, payload) {
    commit("UPDATE_APP_STATUS", payload);
  },
  updateDrawType({ commit }, payload) {
    commit("UPDATE_DRAW_TYPE", payload);
  },
  updateMeasureOutput({ commit }, payload) {
    commit("UPDATE_MEASURE_OUTPUT", payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
