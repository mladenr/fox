<template>

    <v-container grid-list-md text-xs-center fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card dark color="primary">
                    <v-card-text>Homes</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <v-btn
                        fab
                        bottom
                        right
                        color="pink"
                        dark
                        fixed
                        @click="showCreateHomeModal"
                ><v-icon>add</v-icon></v-btn>
            </v-flex>
            <v-flex xs12>

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
        <td>
            <v-btn color="info" v-on:click="deleteHome(props.item)">Delete</v-btn>
        </td>
    </template>

    <template slot="no-data">
      <div>There is no defined homes.</div>
    </template>

  </v-data-table>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Create New Home
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-form>
                            <v-text-field
                                    v-model="home.alias"
                                    :rules="home.aliasRules"
                                    label="Alias"
                                    required
                            />
                            <v-text-field
                                    v-model="home.streetName"
                                    :rules="home.streetNameRules"
                                    label="Street Name"
                                    required
                            />
                            <v-text-field
                                    v-model.number="home.streetNumber"
                                    :rules="home.streetNumberRules"
                                    :mask="home.streetNumberMask"
                                    label="Street Number"
                                    required
                            />
                            <v-text-field
                                    v-model="home.homeNumber"
                                    :rules="home.homeNumberRules"
                                    :mask="home.homeNumberMask"
                                    label="Home Number"
                                    required
                            />
                            <v-text-field
                                    v-model="home.city"
                                    :rules="home.cityRules"
                                    label="City"
                                    required
                            />
                            <v-text-field
                                    v-model="home.country"
                                    :rules="home.countryRules"
                                    label="Country"
                                    required
                            />
                        </v-form>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="closeCreateHomeModal">Cancel</v-btn>
                    <v-btn flat type="submit" :disabled="submitStatus === 'PENDING'" @click="addHome(home)">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
export default {
    computed: {
        homes() {
            return this.$store.state.homes;
        }
    },
    created() {
        this.$store.dispatch("getHomesAction");
    },
    data () {
      return {
          dialog: false,
          submitStatus: null,
          home: {
              alias: '',
              aliasRules: [
                  v => !!v || 'Alias is required',
                  v => v.length <= 10 || 'Alias must be less than 10 characters'
              ],
              streetName: '',
              streetNameRules: [
                  v => !!v || 'Street name is required',
                  v => v.length <= 20 || 'Street name must be less than 20 characters'
              ],
              streetNumber: '',
              streetNumberRules: [
                  v => !!v || 'Street number is required'
              ],
              streetNumberMask: '####',
              homeNumber: '',
              homeNumberRules: [
                  v => !!v || 'Home number is required'
              ],
              homeNumberMask: '####',
              city: '',
              cityRules: [
                  v => !!v || 'City is required',
                  v => v.length <= 20 || 'City must be less than 20 characters'
              ],
              country: '',
              countryRules: [
                  v => !!v || 'Country is required',
                  v => v.length <= 20 || 'Country must be less than 20 characters'
              ]
          },
          headers: [
            { text: 'ID', value: 'id' },
            { text: 'Alias', value: 'alias' },
            { text: 'Street Name', value: 'streetName' },
            { text: 'Street Number', value: 'streetNumber' },
            { text: 'Home Number', value: 'homeNumber' },
            { text: 'City', value: 'city' },
            { text: 'Country', value: 'country' },
            { text: '', value: ''}
        ]
      }
    },
    methods: {
        deleteHome(home) {
            this.$store.dispatch("removeHome", home);
        },
        showCreateHomeModal() {
            this.dialog = true;
        },
        closeCreateHomeModal() {
            this.dialog = false;
        },
        addHome(home) {
            console.log('submit!')
            //this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                // do your submit logic here
                this.submitStatus = 'PENDING';
                this.$store.dispatch("addHome", home);
                this.dialog = false;
            }
        }
    },

}
</script>
