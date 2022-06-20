<template>
  <v-container >
        <h1 class="text-center display-2">Empréstimos de Carros</h1>
        <br>
        <hr>
        <br>
        <v-autocomplete
            v-model="modelPerson"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="primary"
            hide-no-data
            hide-selected
            item-text="name"
            item-value="idPerson"
            label="Informe o nome da Pessoa"
            placeholder="Pesquise um nome..."
            prepend-icon="mdi-account-search"
            return-object
        >
        </v-autocomplete>
        <div v-if="person(modelPerson)">
            <v-autocomplete
                v-model="modelCar"
                :items="itemsCar"
                :loading="isLoadingCar"
                :search-input.sync="searchCar"
                color="primary"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="idCar"
                label="Qual o carro?"
                placeholder="Onix, hb20..."
                prepend-icon="mdi-car"
                return-object
            >
            </v-autocomplete>

            <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6">
                    <v-menu
                        ref="menuStartDate"
                        v-model="menuStartDate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="dateStartFormatted"
                        label="Data Início"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="rent.startDate = parseDate(dateStartFormatted)"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="rent.startDate"
                        no-title
                        @input="menuStartDate = false"
                        locale="pt-BR"
                    ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6">
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
                        label="Data Fim"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="rent.endDate = parseDate(dateEndFormatted)"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="rent.endDate"
                        no-title
                        @input="menuEndDate = false"
                        locale="pt-BR"
                    ></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row v-show="rent.rent">
                <v-col cols="12" xl="6" lg="6" md="6" sm="6">
                    <v-btn
                        color="error"
                        @click="reset()"
                    >
                        Cancelar
                    </v-btn>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6">
                    <div>
                        <v-btn
                            class="float-right"
                            color="success"
                            @click="setRents()"
                            :loading="loading"
                        >
                            Emprestar
                        </v-btn>

                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <Table
                        :headers="header"
                        :itens="listRents"
                        :loadingTable="loadingTable"
                        @setDevolution="setDevolution"
                        @setDevolutionCar="setDevolutionCar"
                        @getRents="getRents"
                    />
                </v-col>
            </v-row>
        </div>
        
    </v-container>
</template>

<script>
import { mapActions } from "vuex"
import header from '@/plugins/axios/header'
import translateError from '@/erros'
import Table from '@/components/admin/rents/Table.vue'
export default {
    components:{
        Table
    },
    data(vm){
        return{
            isLoading: false,
            modelPerson: {},
            search: null,
            nameLimit: 60,
            data: [],
            /******CARS*******/
            isLoadingCar: false,
            modelCar: {},
            searchCar: null,
            nameLimitCar: 60,
            dataCar: [],
            rent:{
                idPerson: '',
                idCar: '',
                startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                endDate: (new Date(new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 1)) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                rent: false,
            },
            /*****START DATE******/
            menuStartDate: false,
            menuEndDate: false,
            dateStartFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
            dateEndFormatted: vm.formatDate((new Date(new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 1)) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
            dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),

            loading: false,
            /*******TABLE PERSONS********/
            header: [
                { text: 'Id Rent', value: 'idRent', align: 'center' },
                { text: 'Nome', value: 'tb_person.name' },
                { text: 'Carro', value: 'tb_car.name' },
                { text: 'Placa', value: 'tb_car.board' },
                { text: 'Data Empréstimo', value: 'startDate' },
                { text: 'Data Vencimento', value: 'endDate' },
                { text: 'Data Devolução', value: 'devolutionDate' },
                { text: 'Opções', value: 'actions', align: 'center', sortable: false },
            ],
            listRents: [],
            loadingTable: false,
            devolutionCar: null,
            
        }
    },
    watch: {
        modelPerson(){
            if(this.person(this.modelPerson)){
                this.rent.idPerson = this.modelPerson.idPerson;
                this.getRents();
            } else{
                this.rent.idPerson = null
            }
        },
        modelCar(){
            if(typeof this.modelCar.idCar !== 'undefined'){
                this.rent.idCar = this.modelCar.idCar;
            } else{
                this.rent.idCar = null
            }
        },
        async search (val) {
            if (this.items.length > 0) return
            if (this.isLoading) return
            this.isLoading = true
            try {
                let resp = await this.$http.get('/persons', header);
                this.data = resp.data.data;
            } catch (e) {
                translateError(e)
            } finally{
                this.isLoading = false
            }
        },
        async searchCar (val) {
            if (this.itemsCar.length > 0) return
            if (this.isLoadingCar) return
            this.isLoadingCar = true
            try {
                let resp = await this.$http.get('/cars?rents=false', header);
                this.dataCar = resp.data.data;
            } catch (e) {
                translateError(e)
            } finally{
                this.isLoadingCar = false
            }
        },
        'rent.startDate' (val) {
            this.dateStartFormatted = this.formatDate(this.rent.startDate)
        },
        'rent.endDate' (val) {
            this.dateEndFormatted = this.formatDate(this.rent.endDate)
        },
        rent: {
            handler() {
                if(this.rent.idPerson && this.rent.idCar && this.rent.startDate && this.rent.endDate){
                    this.rent.rent = true;
                }
            },
            deep: true
        }
    },
    computed: {
        items () {
            return this.data.map(person => {
            const name = person.name.length > this.nameLimit
                ? person.name.slice(0, this.nameLimit) + '...'
                : person.name + ' - ' + person.cpf

            return Object.assign({}, person, { name })
            })
        },
        itemsCar () {
            return this.dataCar.map(car => {
            const name = car.name.length > this.nameLimit
                ? car.name.slice(0, this.nameLimit) + '...'
                : car.name + ' - ' + car.board

            return Object.assign({}, car, { name })
            })
        },
        computedDateFormatted () {
            return this.formatDate(this.rent.startDate)
        },
    },
    methods:{
        ...mapActions(['addAlert']),
        print(){
            console.log(this.rent);
        },
        reset(){
            this.rent.idPerson = null;
            this.rent.idCar = null;
            this.modelPerson = {};
            this.modelCar = {};
            this.rent.startDate = this.parseDate(this.dateStartFormatted);
            this.rent.endDate = this.parseDate(this.dateEndFormatted);
        },
        person(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) return true;
            }
            return false;
        },
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
        setDevolution(payload){
            this.devolutionCar = payload;
        },
        async setDevolutionCar(){
            let success = false;
            try {
                this.loadingTable = true;
                const {idCar} = this.devolutionCar;
                await this.$http.patch(`/rents/${this.devolutionCar.idRent}`, {idCar, devolutionDate: this.parseDate(this.dateFormatted)}, header);
                success = true;
            } catch (e) {
                translateError(e);
            } finally{
                if(success){
                    this.addAlert({
                        type:"success", icon:"mdi-car", message:"Devolvido com Sucesso!"
                    });
                }
                this.loadingTable = false;
                this.getRents();
            }
        },
        async setRents(){
            let success = false;
            try {
                this.loading = true;
                await this.$http.post('/rents', this.rent, header);
                success = true;
            } catch (e) {
                translateError(e);
            } finally{
                if(success){
                    this.addAlert({
                        type:"success", icon:"mdi-car", message:"Emprestado com Sucesso!"
                    });
                    this.reset();
                }
                this.loading = false;
                this.listRents = [];
            }
        },
        async getRents(){
            this.listRents = [];
            try {
                this.loadingTable = true;
                let resp = await this.$http.get(`/rents?idPerson=${this.rent.idPerson}`, header);
                this.listRents = resp.data.data;
                console.log(this.listRents)
            } catch (e) {
                translateError(e);
            } finally{
                this.loadingTable = false;
            }
        }
    }, 
    created(){
        // this.getCars();
    }
}
</script>

<style>

</style>