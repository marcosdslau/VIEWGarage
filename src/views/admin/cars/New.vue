<template>
  <v-container >
      <h1 class="text-center display-2">Cadastrar Novo Carro</h1>
      <br>
      <hr>
      <br>
      <v-btn
        class="float-left"
        plain
        color="error"
        to="/cars"
      >
        <v-icon>mdi-chevron-left</v-icon>
        Voltar
        </v-btn>
      <br>
      <br>
      <!-- <Form/> -->
      <Form :data="data" :loading="loading" @actionForm="setInstitution" />
  </v-container>
</template>

<script>
import Form from '@/components/admin/car/Form.vue'
import { mapActions } from "vuex"
import translateError from '@/erros';
import header from '@/plugins/axios/header';
export default {
  components:{
    Form
  },
  data(){
    return {
      data:{
        name: '',
        model: '',
        brand: '',
        motor: '',
        board: '',
      },
      loading: false
    }
  },
  methods:{
    ...mapActions(['addAlert']),
    async setInstitution(){
      let success = false;
      try {
        let board = this.data.board.split('').filter(s=> s !=='-').join('');
        let obj = {...this.data}
        delete obj.board;
        this.loading = true;
        console.log({...obj, board})
        let resp = await this.$http.post('/cars', {...obj, board}, header);
        console.log(resp);
        success = true;
      } catch (e) {
        translateError(e);
      } finally{
        if(success){
          this.addAlert({
            type:"success", icon:"mdi-car", message:"Cadastrado com Sucesso!"
          });
        }
        this.loading = false;
        this.$router.push({path: '/cars'})
      }
    }
  }

}
</script>

<style>

</style>