<template>
  <v-container >
      <h1 class="text-center display-2">Pessoas</h1>
      <br>
      <hr>
      <br>
      <v-btn
        class="float-right"
        plain
        color="primary"
        to="/persons/new"
      >
        <v-icon>mdi-account-plus</v-icon>
        Novo
        </v-btn>
      <br>
      <br>
      <br>
      <div >
            <v-list-item-group
                v-model="selectedItem"
                color="primary"
            >
                <v-list-item v-for="(person, i) in data" :key="i" :to="'/persons/'+person.idPerson">
                    <v-list-item-icon>
                        <v-icon>mdi-arrow-right-bold-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <b>Nome: </b>{{person.name}}
                        </v-list-item-title>
                        <v-list-item-subtitle >
                            <b>CPF: </b>{{person.cpf | cpf}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                        <v-list-item-title>
                            <b>País:</b> {{person.country}}
                        </v-list-item-title>
                        <v-list-item-subtitle >
                            <b>Status:</b> {{person.atived ? 'Ativo' : 'Inativo'}}
                        </v-list-item-subtitle>
                    

                    </v-list-item-content>
                    
                </v-list-item>
            </v-list-item-group>
      </div>
  </v-container>
</template>

<script>
import header from '@/plugins/axios/header'
import translateError from '@/erros'
export default {
    components:{
        
    },
    data(){
        return{
            loading: false,
            selectedItem: 1,
            data: [],
        }
    },
    methods:{
        async getPersons(){
            try {
                this.loading = true;
                let resp = await this.$http.get('/persons', header);
                this.data = resp.data.data;
                // console.log(this.data);
            } catch (e) {
                translateError(e)
            } finally{
                setTimeout(()=>{
                    this.loading = false
                }, 3000);
            }
        }
    }, 
    created(){
        this.getPersons();
    }
}
</script>

<style>

</style>