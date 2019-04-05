<template>
  <v-layout v-if="this.$route.name === 'map'" pa-3>
    <v-flex>
      <v-card class="mx-auto" max-width="500">
        <v-sheet class="pa-3 secondary">
          <v-text-field
            v-model="search"
            label="Search Layer List"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
          <v-checkbox
            v-model="caseSensitive"
            dark
            hide-details
            label="Case sensitive search"
          ></v-checkbox>
        </v-sheet>
        <v-card-text>
          <v-treeview
            :active.sync="active"
            :items="mapLayers"
            item-text="title"
            :search="search"
            :filter="filter"
            :open.sync="open"
            activatable
            active-class="accent lighten-4 accent--text"
            selected-color="accent"
            open-on-click
            :open-all="true"
          >
            <template v-slot:prepend="{ item, active }">
              <v-icon
                v-if="!item.children"
                :color="active ? 'accent' : ''"
                v-text="
                  `mdi-${
                    item.visible === true ? 'eye-outline' : 'eye-off-outline'
                  }`
                "
                @click="changeVisibility(item)"
              ></v-icon>
            </template>
          </v-treeview>
        </v-card-text>
      </v-card>
      <!-- {{ this.selected }} -->
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data: () => ({
    open: [],
    search: null,
    caseSensitive: false
  }),
  computed: {
    ...mapGetters("OpenLMAP", ["layers", "baseLayers", "activeTreeItem"]),
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
    active: {
      get: function() {
        return this.activeTreeItem;
      },
      set: function(v) {
        this.updateActiveTreeItem(v);
      }
    },
    mapLayers() {
      let treeLayers = [
        {
          id: 1,
          title: "Base Layers",
          children: Object.keys(this.baseLayers).map(k => {
            let original = this.baseLayers[k];
            let id = k;
            let target = { id, ...original };
            return target;
          })
        },
        {
          id: 2,
          title: "Vector Layers",
          children: Object.keys(this.layers).map(k => {
            let original = this.layers[k];
            let id = k;
            let target = { id, ...original };
            return target;
          })
        }
      ];
      return treeLayers;
    }
  },
  methods: {
    ...mapActions("OpenLMAP", ["updateVisibility", "updateActiveTreeItem"]),
    changeVisibility({ id, visible }) {
      if (this.baseLayers[id] != null) {
        this.updateVisibility({ id, value: !visible });
      }
      if (this.layers[id] != null) {
        this.updateVisibility({ id, value: !visible });
      }
    }
  },
  mounted() {},
  watch: {}
};
</script>
