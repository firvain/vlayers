<template>
  <v-layout v-if="this.$route.name === 'map'" pa-3>
    <v-flex>
      <v-card class="mx-auto" max-width="500">
        <v-sheet class="pa-3 primary lighten-2">
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
            :items="layers"
            :search="search"
            :filter="filter"
            :open.sync="open"
            activatable
            active-class="grey lighten-4 indigo--text"
            selected-color="indigo"
            open-on-click
            :open-all="true"
          >
            <template v-slot:prepend="{ item, active }">
              <v-icon
                v-if="!item.children"
                :color="active ? 'indigo' : ''"
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
    caseSensitive: false,
    active: []
  }),
  computed: {
    ...mapGetters("OpenLMAP", ["layers"]),
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  methods: {
    ...mapActions("OpenLMAP", ["updateVisibility"]),
    changeVisibility({ id, visible }) {
      if (visible) {
        this.updateVisibility({
          id: id,
          prop: "visible",
          value: false
        });
      } else {
        this.updateVisibility({
          id: id,
          value: true
        });
      }
    }
  },
  mounted() {
    // console.log(this.$route);
  },
  watch: {
    active(val) {
      if (val.length) {
        console.log(val);
      }
    }
  }
};
</script>
