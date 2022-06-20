<template>
  <v-form
    ref="form"
  >
    <v-text-field
      v-model="data.name"
      label="Nome"
      required
    ></v-text-field>
    <v-text-field
      v-model="data.socialName"
      label="Nome Social"
    ></v-text-field>
    <v-text-field
      v-model="data.cpf"
      v-mask="'###.###.###-##'"
      label="CPF"
      required
    ></v-text-field>
    <!-- <v-text-field
      v-model="data.country"
      label="Pais - CheckList"
      required
    ></v-text-field> -->
    <v-autocomplete
      label="Pais"
      v-model="data.country"
      :items="states"
    >

    </v-autocomplete>
    <v-checkbox
      v-model="data.atived"
      label="Ativo?"
      required
    ></v-checkbox>


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
        name:"FormPerson",
        props:{
            loading:{
              type: Boolean,
              default: false
            },
            data:{
              idPerson: {
                type: String,
              },
              name: {
                type: String,
              },
              cpf:{
                  type: String,
              },
              socialName:{
                  type: String,
              },
              country:{
                  type: String,
              },
              atived:{
                  type: Boolean,
              }
            }
        },
        data() {
            return {
                cpf: '###.###.###-##',
                states:[
                  'Argentina',
                  'Bolívia',
                  'Brasil',
                  'Chile',
                  'Colômbia',
                  'Equador',
                  'Guiana',
                  'Guiana Francesa',
                  'Paraguai',
                  'Peru',
                  'Suriname',
                  'Uruguai ',
                  'Venezuela',
                ]
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