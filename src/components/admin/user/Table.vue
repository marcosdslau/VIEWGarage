<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :sort-by="['name']"
    :search="search"
    class="elevation-1"
    :loading="loadingTable"
    loading-text="Carregando... Por favor, aguarde!"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><b>Todos os Usuários</b></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="mr-8"
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar usuário"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="indigo darken-4"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Novo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-text-field
                        v-model="editedItem.name"
                        label="Nome Usuário"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        v-if="formTitle === 'Novo Usuário'"
                    >
                        <v-text-field
                        v-model="editedItem.password"
                        label="Senha"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-checkbox
                          v-model="editedItem.type"
                          label="Master?"
                        ></v-checkbox>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-checkbox
                          v-model="editedItem.status"
                          label="Ativo?"
                      ></v-checkbox>
                    </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogInativeUser" max-width="500px">
          <div class="text-center">
            <v-sheet
              class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
              color="indigo darken-4"
              dark
              style="width: 500px"
            >
              <div class="grey--text text--lighten-1 text-body-2 mb-4">
                <p class="white--text text-h4">Tem Certeza?</p>
                Deseja realmente inativar o usuário? Após essa ação o mesmo não terá mais acesso a nenhum recurso do integrador.
              </div>

              <v-btn
                @click="closeSetStatusUser"
                class="ma-1"
                color="grey"
                plain
              >
                Cancelar
              </v-btn>

              <v-btn
                class="ma-1"
                color="error"
                plain
                @click="setStatusUser"
              >
                Inativar
              </v-btn>
            </v-sheet>
          </div>
        </v-dialog>

        <v-dialog v-model="dialogPassword" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-text-field
                            label="Nova Senha"
                            name="senha"
                            v-model="alterPassword.new"
                            :type="showPasswordNew ? 'text' : 'password'"
                            append-icon="mdi-eye-off"
                            @click:append="showPasswordNew = !showPasswordNew"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >  
                        <v-text-field
                            label="Nova Senha"
                            name="senha"
                            v-model="alterPassword.compare"
                            :type="showPasswordCompare ? 'text' : 'password'"
                            append-icon="mdi-eye-off"
                            @click:append="showPasswordCompare = !showPasswordCompare"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="messageCompare">
                  <v-col>
                    <span class="error--text">*As senhas estão diferentes</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn
                @click="closeAlterPassword"
                class="ma-1"
                color="error"
                plain
              >
                Cancelar
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn
                class="ma-1"
                color="success"
                plain
                @click="setPasswordUser"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
          
        </v-dialog>

      </v-toolbar>
    </template>
    <!-- eslint-disable -->
    <template v-slot:item.type="{ item }">
        <span>{{ item.type ? 'Sim' : 'Não' }}</span>
    </template>
    <template v-slot:item.status="{ item }">
        <span>{{ item.status ? 'Sim' : 'Não' }}</span>
    </template>
    <template v-slot:item.createdAt="{ item }">
        <span>{{ new Date(item.createdAt).toLocaleString() }}</span>
    </template>
    <template v-slot:item.updatedAt="{ item }">
        <span>{{ new Date(item.updatedAt).toLocaleString() }}</span>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="mr-2"
        color="success"
        @click="editItem(item)"
        :disabled="item.idUser === 1"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        class="mr-2"
        color="warning"
        @click="editPassword(item)"
      >
        mdi-lock
      </v-icon>
      <v-icon
        color="error"
        @click="inativeUser(item)"
        :disabled="item.idUser === 1"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from "vuex"
import header from '@/plugins/axios/header';
import translateError from '../../../erros';
  export default {
    data: () => ({
        showPasswordNew: false,
        showPasswordCompare: false,
        alterPassword: {
          new: '',
          compare: ''
        },
        messageCompare: false,
        loadingTable: false,
        dialog: false,
        dialogInativeUser: false,
        dialogPassword: false,
        search: '',
        headers: [
            {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'idUser',
            },
            { text: 'Nome', value: 'name' },
            { text: 'E-mail', value: 'email' },
            { text: 'Master', value: 'type' },
            { text: 'Ativo', value: 'status' },
            { text: 'Data Criação', value: 'createdAt' },
            { text: 'Última Atualização', value: 'updatedAt' },
            { text: 'Ações', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            email: '',
            type: false,
            status: false,
            password: ''
        },
        defaultItem: {
            name: '',
            email: '',
            type: false,
            status: false,
            password: ''
        },
        data: []
    }),

    computed: {
      // ...mapGetters(['getUser']),
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogInativeUser (val) {
        val || this.closeSetStatusUser()
      },
      dialogPassword (val) {
        val || this.closeAlterPassword()
      },
      alterPassword:{
        handler(){
          this.validationPassword();
        },
        deep: true
      }
    },

    methods: {
        ...mapActions(['addAlert']),
        validationPassword(){
          if(this.alterPassword.new === this.alterPassword.compare){
            this.messageCompare = false
          } else{
            this.messageCompare = true
          }
        },
      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      editPassword (item) {
        // this.alterPassword
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogPassword = true
      },

      inativeUser (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogInativeUser = true
      },

      /*********************************** */
      async setPasswordUser(){
        let alertStatus = false;
        try{
          if( this.alterPassword.new && this.alterPassword.compare ){
            if(this.alterPassword.new === this.alterPassword.compare) {
              let password = this.alterPassword.new;
              await this.$http.patch(`/user/${this.editedItem.idUser}/password`, {
                password
              }, header);
              alertStatus = true;
            } else {
              this.addAlert({
                type:"warning", icon:"mdi-alert", message:"As senhas estão divergentes!"
              });
            }
          } else{
            this.closeAlterPassword();
            this.addAlert({
              type:"warning", icon:"mdi-alert", message:"Insira uma senha válida!"
            });
          }
        } catch(err){
          translateError(err);
        } finally{
          this.getUsers();
          if(alertStatus){
            this.addAlert({
              type:"success", icon:"mdi-account-plus", message:"Senha Atualizado com Sucesso!"
            });
          }
          this.closeAlterPassword();
        }
      },
      /************************************* */
      async setStatusUser(){
        let alertStatus = false;
        try{
          await this.$http.patch(`/user/${this.editedItem.idUser}/status`, {
            status: false
          }, header);
          alertStatus = true;
        } catch(err){
          translateError(err);
        } finally{
          this.getUsers();
          if(alertStatus){
            this.addAlert({
              type:"success", icon:"mdi-account-plus", message:"Status Atualizado com Sucesso!"
            });
          }
          this.closeSetStatusUser();
        }
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeSetStatusUser () {
        this.dialogInativeUser = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeAlterPassword () {
        this.alterPassword.new = '';
        this.alterPassword.compare = '';
        this.dialogPassword = false
      },

      async save () {
        if (this.editedIndex > -1) {
          //Atualizar
          this.updateUsers();
        } else {
          ///Novo
          this.setUsers();
        }
        this.close()
      },
      async updateUsers(){
        let alertUpdate = false;
        try{
          let {name, email, type, status} = this.editedItem;
          await this.$http.put(`/user/${this.editedItem.idUser}`, {
            name, email, type, status
          }, header);
          alertUpdate = true;
        } catch(err){
          translateError(err);
        } finally{
          this.getUsers();
          if(alertUpdate){
            this.addAlert({
              type:"success", icon:"mdi-account-check", message:"Dados Atualizados com Sucesso!"
            });
          }
        }
      },
      async setUsers(){
        let alertUpdate = false;
        try{
            await this.$http.post('/user',{
              name: this.editedItem.name,
              email: this.editedItem.email,
              password: this.editedItem.password,
              type: this.editedItem.type,
              status: this.editedItem.status
              
            }, header);
            alertUpdate = true;
          } catch(err){
            translateError(err);
          } finally{
            this.getUsers();
            if(alertUpdate){
              this.addAlert({
                type:"info", icon:"mdi-account-plus", message:"Usuário cadastrado com Sucesso!"
              });
            }
          }
      },
      formateDate(value){
            var dataValue = new Date(value),
            dia  = dataValue.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (dataValue.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = dataValue.getFullYear();

        return diaF+"/"+mesF+"/"+anoF;
      },
      async getUsers(){
          this.loadingTable = true;
          try{
            let response = await this.$http.get('/user', header);
            this.data = response.data.data;
            if(this.data.length === 0){
                this.addAlert({
                    type:"error", icon:"mdi-alert", message:"Lista Vazia!"
                });
            }

        } catch (err){
            translateError(err);
        } finally{
            this.loadingTable = false;
        }
      }
    },
    created() {
        this.getUsers();
    }
  }
</script>