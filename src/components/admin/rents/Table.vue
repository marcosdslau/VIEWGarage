<template>
  <v-data-table
    :headers="headers"
    :items="itens"
    :loading="loadingTable"
    :search="search"
    loading-text="Carregando Emprestimos..."
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Lista de Emprestimos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar Nome"
          single-line
          hide-details
        ></v-text-field>

        <!-- RENOVATION -->

        <v-dialog v-model="dialog" max-width="500px">
            <div class="text-center">
                <v-sheet
                    class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
                    color="indigo lighten-5"
                    style="width: 500px"
                >
                    <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    <p class="black--text text-h4">Renovação de Empréstimo</p>
                        Conferiu o veículo, é importante verificar antes de efetivar a operação.
                    </div>
                    <v-row>
                      <v-col cols="12" xl="12" lg="12" md="12" sm="12">
                        <b>Nome:</b> {{renewCar.tb_person.name}} ({{renewCar.tb_person.cpf | cpf}})
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" xl="12" lg="12" md="12" sm="12">
                        <b>Veículo:</b> {{renewCar.tb_car.name}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" xl="12" lg="12" md="12" sm="12">
                        <b>Placa:</b> {{renewCar.tb_car.board}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" xl="12" lg="12" md="12" sm="12">
                          <v-menu
                              ref="menuEndDate"
                              v-model="menuEndDate"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="auto"
                          >
                          <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                              v-model="dateEndFormatted"
                              label="Nova Data de Devolução"
                              persistent-hint
                              prepend-icon="mdi-calendar"
                              v-bind="attrs"
                              @blur="renewCar.endDate = parseDate(dateEndFormatted)"
                              v-on="on"
                              ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="renewCar.endDate"
                              no-title
                              @input="menuEndDate = false"
                              locale="pt-BR"
                          ></v-date-picker>
                          </v-menu>
                      </v-col>
                    </v-row>


                    <v-btn
                    @click="close"
                    class="ma-1"
                    color="error"
                    plain
                    >
                    Cancelar
                    </v-btn>

                    <v-btn
                    class="ma-1"
                    color="primary"
                    plain
                    @click="setRenewCar"
                    >
                    Salvar
                    </v-btn>
                </v-sheet>
                </div>
        </v-dialog>

        <!-- FIM RENOVATION -->

        <v-dialog v-model="dialogDelete" max-width="500px">
            <div class="text-center">
                <v-sheet
                    class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
                    color="indigo darken-4"
                    dark
                    style="width: 500px"
                >
                    <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    <p class="white--text text-h4">Tem Certeza?</p>
                        Conferiu o veículo, é importante verificar antes de efetivar a operação.
                    </div>

                    <v-btn
                    @click="closeDelete"
                    class="ma-1"
                    color="grey"
                    plain
                    >
                    Não
                    </v-btn>

                    <v-btn
                    class="ma-1"
                    color="error"
                    plain
                    @click="devolutionCarConfirm"
                    >
                    Sim
                    </v-btn>
                </v-sheet>
                </div>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- eslint-disable -->
    <template v-slot:item.tb_cars="{ item }">
      {{item.tb_cars.board | board}}
    </template>
    <!-- eslint-disable -->
    <template v-slot:item.startDate="{ item }">
      {{formatDatePrint(item.startDate)}}
    </template>
    <!-- eslint-disable -->
    <template v-slot:item.endDate="{ item }">
      {{formatDatePrint(item.endDate)}}
    </template>
    <!-- eslint-disable -->
    <template v-slot:item.devolutionDate="{ item }">
      {{item.devolutionDate ? formatDatePrint(item.devolutionDate) : '-'}}
    </template>
    <!-- eslint-disable -->
    <template v-slot:item.actions="{ item }">
      <div>
        <div class="d-inline" style="padding: 1px">
          <v-btn
            color="success"
            @click="renovationRent(item)"
            block
            x-small
          >
            Renovar
            <v-icon
              small
            >
              mdi-autorenew
            </v-icon>
          </v-btn>
        </div>
        <div class="d-inline" style="padding: 1px">
          <v-btn
            color="error"
            @click="devolutionCar(item)"
            block
            x-small
          >
            Devolução
            <v-icon
              small
            >
              mdi-keyboard-return
            </v-icon>
          </v-btn>
        </div>
      </div>
    </template>

  </v-data-table>
</template>

<script>
  import { mapActions } from "vuex"
  import header from '@/plugins/axios/header'
  import translateError from '@/erros'
    export default {
        props:{
            headers:{
                type: Array
            },
            itens:{
                type: Array
            },
            loadingTable:{
                type: Boolean,
                default: true
            }
        },
        data: (vm) => ({
          dialog: false,
          dialogDelete: false,
          editedIndex: -1,
          search: '',
          renewCar:{
              tb_person:{
                name: '',
                cpf: ''
              },
              tb_car:{
                name: '',
                board: ''
              },
              endDate: '',
          },
          loading: false,
          endDate: (new Date(new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 1)) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          menuEndDate: false,
          dateEndFormatted: vm.formatDate((new Date(new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 1)) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        }),

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
            'renewCar.endDate' (val) {
            this.dateEndFormatted = this.formatDate(this.renewCar.endDate)
        },
        },

        methods: {
              ...mapActions(['addAlert']),
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [day, month, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            formatDatePrint(value){
              const [ano, mes, dia] = value.split('-');
              return (dia.substring(0,2)+'/'+mes+'/'+ano);
            },
            /************************/
            devolutionCar (item) {
                this.dialogDelete = true
                // console.log(item)
                this.$emit('setDevolution', item);
            },

            devolutionCarConfirm () {
                this.$emit('setDevolutionCar');
                this.closeDelete()
            },

            close () {
                this.dialog = false;
            },

            closeDelete () {
                this.dialogDelete = false
            },

            renovationRent(item){
              this.dialog = true;
              const {idRent, idPerson, idCar, tb_person, tb_car} = item
              this.renewCar = {
                idRent, idPerson, idCar, tb_person, tb_car
              }
              this.renewCar.endDate = this.endDate;
              console.log(this.renewCar)
            },
            async setRenewCar(){
                let success = false;
                try {
                    this.loading = true;
                    const {idCar, endDate} = this.renewCar;
                    await this.$http.patch(`/rents/${this.renewCar.idRent}/renew`, {idCar, endDate}, header);
                    success = true;
                } catch (e) {
                    translateError(e);
                } finally{
                    if(success){
                        this.addAlert({
                            type:"success", icon:"mdi-car", message:"Renovado com Sucesso!"
                        });
                    }
                    this.loading = false;
                    this.close();
                    this.$emit('getRents');
                }
            },
        },
    }
</script>