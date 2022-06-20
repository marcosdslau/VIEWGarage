<template>
  <v-form
    ref="form"
  >
    <v-text-field
      v-model="data.name"
      label="Carro"
      required
    ></v-text-field>
    <v-text-field
      v-model="data.model"
      label="Modelo"
    ></v-text-field>
    <v-text-field
      v-model="data.brand"
      label="Marca (Montadora)"
    ></v-text-field>
    <v-autocomplete
      label="Motorização"
      v-model="data.motor"
      :items="motor"
    >
    </v-autocomplete>

    <v-text-field
      v-model="data.board"
      type="text"
      v-mask="'XXX-XXXX'"
      label="Placa"
      required
    ></v-text-field>
    <v-btn
        class="float-right"
        color="success"
        :loading="loading"
        @click="save()"
    >
        Salvar
    </v-btn>
  </v-form>
</template>

<script>
    export default {
        name:"FormCar",
        props:{
            loading:{
              type: Boolean,
              default: false
            },
            data:{
              idCar: {
                type: String,
              },
              name: {
                type: String,
              },
              model:{
                  type: String,
              },
              brand:{
                  type: String,
              },
              motor:{
                  type: Number,
              },
              board:{
                  type: String,
              }
            }
        },
        data() {
            return {
                motor: [
                  '1.0',
                  "1.2",
                  "1.3",
                  "1.4",
                  "1.5",
                  "1.6",
                  "1.8",
                  "2.0",
                  "2.2",
                  "2.5",
                  "2.8",
                  "3.0",
                  "3.2",
                  "3.5",
                  "3.8",
                  "4.0",
                  "4.8",
                  "5.0"
                ]
            }
        },
        watch:{
          'data.board'() {
            this.data.board = this.data.board.toUpperCase();
          }
        },
        methods: {
          save(){
            this.$emit('actionForm',this.data);
          }
        },
    }
</script>

<style>

</style>