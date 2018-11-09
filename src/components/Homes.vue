<template>

    <v-data-table
        :headers="headers"
        :items="homes"
        hide-actions
        class="elevation-1"
    >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.alias }}</td>
      <td>{{ props.item.streetName }}</td>
      <td>{{ props.item.streetNumber }}</td>
      <td>{{ props.item.homeNumber }}</td>
      <td>{{ props.item.city }}</td>
      <td>{{ props.item.country }}</td>
    </template>

    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>

  </v-data-table>
</template>

<script>

import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["homes"])
    },
    data () {
      return {
        headers: [
            { text: 'ID', value: 'id' },
            { text: 'Alias', value: 'alias' },
            { text: 'Street Name', value: 'streetName' },
            { text: 'Street Number', value: 'streetNumber' },
            { text: 'Home Number', value: 'homeNumber' },
            { text: 'City', value: 'city' },
            { text: 'Country', value: 'country' }
        ],
        computed: {
          homes() {
            return this.$store.homes;
          }
        }
      }
    }
}
</script>
