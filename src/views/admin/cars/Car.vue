<template>
  <v-container >
      <h1 class="text-center display-2">Carros</h1>
      <br>
      <hr>
      <br>
      <v-btn
        class="float-right"
        plain
        color="primary"
        to="/cars/new"
      >
        <v-icon>mdi-tag-plus</v-icon>
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
                <v-list-item v-for="(car, i) in data" :key="i" :to="'/cars/'+car.idCar">
                    <v-list-item-icon>
                        <v-icon>mdi-arrow-right-bold-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <b>Nome: </b>{{car.name}}
                        </v-list-item-title>
                        <v-list-item-subtitle >
                            <b>Placa: </b>{{car.board | board}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                        <v-list-item-title>
                            <b>Motor:</b> {{car.motor}}
                        </v-list-item-title>
                        <v-list-item-subtitle >
                            <b>Model:</b> {{car.model}}
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
        async getCars(){
            try {
                this.loading = true;
                let resp = await this.$http.get('/cars', header);
                this.data = resp.data.data;
                //console.log(this.data);
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
        this.getCars();
    }
}
</script>

<style>

</style>