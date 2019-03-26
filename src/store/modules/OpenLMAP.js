const findNested = (obj, key, value) => {
  // console.log(obj);
  // Base case
  if (obj[key] === value) {
    return obj;
  } else if (obj.children) {
    for (let i = 0, len = Object.keys(obj.children).length; i < len; i++) {
      //TODO better logic
      if (typeof obj.children[i] == "object") {
        // console.log(this);
        let found = findNested(obj.children[i], key, value);
        if (found) {
          // If the object was found in the recursive call, bubble it up.
          return found;
        }
      }
    }
  }
};

const state = {
  appStatus: "display",
  mapCenter: [21.78896, 40.30069],
  layers: [
    {
      id: 1,
      name: "Map Layers",
      visible: false,
      children: [
        {
          id: 2,
          name: "Vector Layers",
          visible: false,
          children: [
            {
              id: 201,
              name: "Administrative Boundaries",
              visible: false,
              selected: false
            }
          ]
        },
        {
          id: 3,
          visible: true,
          name: "Base Layers",
          children: [
            {
              id: 301,
              name: "OpenStreetMap",
              source: "osm",
              type: "BaseLayer",
              visible: false
            },
            {
              id: 302,
              name: "Bingmaps",
              source: "bingmaps",
              type: "BaseLayer",
              "api-key":
                "Ap3sskZ5BccP6TvBr0FoLc9orA4_R1uh-8UjpOKYciXL1hNMtAJr_BdxMjTJNkpv",
              "imagery-set": "AerialWithLabels",
              visible: true
            }
          ]
        }
      ]
    }
  ],
  drawType: undefined,
  measureOutput: ""
};

const getters = {
  mapCenter: state => state.mapCenter,
  layers: state => state.layers,
  appStatus: state => state.appStatus,
  drawType: state => state.drawType,
  measureOutput: state => state.measureOutput
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
    const item = findNested(state.layers[0], "id", id);
    commit("UPDATE_LAYER_VISIBILITY", { item, value });
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
