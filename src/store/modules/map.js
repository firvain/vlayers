import { loadingBBox } from "vuelayers/lib/ol-ext";
import { defaultStyle, drawStyle, NaturaStyleFunc } from "./styles";

const state = {
  baseLayersList: [100, 101, 102],
  baseLayers: {
    100: {
      name: "osm",
      title: "OpenStreetMap",
      visible: true
    },
    // 101: {
    //   name: "sputnik",
    //   title: "Sputnik Maps",
    //   visible: false
    // },
    102: {
      name: "bingmaps",
      title: "Bing Maps",
      apiKey:
        "Ap3sskZ5BccP6TvBr0FoLc9orA4_R1uh-8UjpOKYciXL1hNMtAJr_BdxMjTJNkpv",
      imagerySet: "AerialWithLabelsOnDemand",
      visible: false
    }
  },
  layersList: [200, 201, 202],
  layers: {
    // Tile layer with WMS source
    // 203: {
    //   title: "NATURA 2220",
    //   cmp: "vl-layer-tile",
    //   visible: true,
    //   source: {
    //     cmp: "vl-source-wms",
    //     url:
    //       "http://geodata.gov.gr/geoserver/ows?service=WMS&request=GetMap&version=1.3.0" +
    //       "&WIDTH=256&HEIGHT=256&format=image/png&srs=EPSG:4326&bbox=32.573282,16.944492,42.724649,30.83121",
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
            "&typeNames=geodata.gov.gr:262a95fb-2d88-4df8-980f-5ed4de44245b&count=100" +
            "&bbox=" +
            extent.join(",") +
            "," +
            projection
          );
        },
        strategyFactory() {
          return loadingBBox;
        }
      },
      style: [
        {
          cmp: "vl-style-func",
          factory: NaturaStyleFunc
        }
      ]
    },
    201: {
      title: "Όρια Δήμων (Καλλικράτης)",
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
            "&typeNames=geodata.gov.gr:c7b5978b-aca9-4d74-b8a5-d3a48d02f6d0" +
            "&bbox=" +
            extent.join(",") +
            "," +
            projection
          );
        },
        strategyFactory() {
          return loadingBBox;
        }
      },
      style: [
        {
          cmp: "vl-style-func",
          factory: defaultStyle
        }
      ]
    },
    202: {
      title: "Countries",
      cmp: "vl-layer-vector",
      visible: false,
      source: {
        cmp: "vl-source-vector",
        projection: "EPSG:4326",
        url:
          "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson"
      },
      style: [
        {
          cmp: "vl-style-func",
          factory: defaultStyle
        }
      ]
    }
  },
  utilityLayersList: [1000],
  utilityLayers: {
    1000: {
      id: "draw-target",
      title: "Draw",
      cmp: "vl-layer-vector",
      visible: true,
      source: {
        cmp: "vl-source-vector"
      },
      style: [
        {
          cmp: "vl-style-func",
          factory: drawStyle
        }
      ]
    }
  },
  mapCenter: [21.78896, 40.30069],
  drawType: undefined,
  measureOutput: "",
  selectedFeature: [],
  activeTreeItem: [],
  multiInfo: false
};

const getters = {
  mapCenter: state => state.mapCenter,
  baseLayersList: state => state.baseLayersList,
  baseLayers: state => state.baseLayers,
  layersList: state => state.layersList,
  layers: state => state.layers,
  utilityLayersList: state => state.utilityLayersList,
  utilityLayers: state => state.utilityLayers,
  drawType: state => state.drawType,
  measureOutput: state => state.measureOutput,
  selectedFeature: state => state.selectedFeature,
  multiInfo: state => state.multiInfo,
  activeTreeItem: state => state.activeTreeItem
};
const mutations = {
  setMapCenter(state, payload) {
    state.mapCenter = payload;
  },
  UPDATE_LAYER_VISIBILITY(state, { item, value }) {
    Object.assign(item, { visible: value });
  },
  UPDATE_MAP_CENTER(state, payload) {
    state.mapCenter = payload;
  },
  UPDATE_MULTI_INFO(state, payload) {
    state.multiInfo = payload;
  },
  UPDATE_DRAW_TYPE(state, payload) {
    state.drawType = payload;
  },
  UPDATE_MEASURE_OUTPUT(state, payload) {
    state.measureOutput = payload;
  },
  UPDATE_SELECTED_FEATURE(state, payload) {
    state.selectedFeature = payload;
  },
  UPDATE_ACTIVE_TREE_ITEM(state, payload) {
    state.activeTreeItem = payload;
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
      /* handle other layers */
    } else if (!state.baseLayersList.includes(parseInt(id))) {
      item = state.layers[id];
      commit("UPDATE_LAYER_VISIBILITY", { item, value });
    }
  },
  updateDrawType({ commit }, payload) {
    commit("UPDATE_DRAW_TYPE", payload);
  },
  updateMeasureOutput({ commit }, payload) {
    commit("UPDATE_MEASURE_OUTPUT", payload);
  },
  updateSelectedFeature({ commit }, payload) {
    commit("UPDATE_SELECTED_FEATURE", payload);
  },
  updateActiveTreeItem({ commit }, payload) {
    commit("UPDATE_ACTIVE_TREE_ITEM", payload);
  },
  updateMultinfo({ commit }, payload) {
    commit("UPDATE_MULTI_INFO", payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
