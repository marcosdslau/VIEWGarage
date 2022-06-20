<template>
  <v-container >
      <h1 class="text-center display-2">Atualizar Cadastro Carro</h1>
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
      <Form v-if="form" :data="data" :loading="loading" @actionForm="setUpdate" />
  </v-container>
</template>

<script>
import Form from '@/components/admin/car/Form.vue'
import { mapActions } from "vuex"
import translateError from '../../../erros';
import header from '@/plugins/axios/header';
export default {
  components:{
    Form
  },
  data() {
    return {
      loading: false,
      data:{},
      form: false
    }
  },
  mounted(){
    this.getCar(this.$route.params.idCar);
  },
  methods:{
    ...mapActions(['addAlert']),
    async setUpdate(payload){
      let success = false
      try {
        this.loading = true;
        let board = payload.board.split('').filter(s=>  s !=='-').join('');
        const obj = {...payload}
        delete obj.board;
        let resp = await this.$http.put(`/cars/${payload.idCar}`, {...obj, board}, header);
        console.log(resp)
        success = true;
      } catch (e) {
        translateError(e);
      } finally{
        if(success){
          this.addAlert({
            type:"success", icon:"mdi-car", message:"Dados Atualizados com Sucesso!"
          });

        }
        this.loading = false;
        this.$router.push({path: '/cars'});

      }

    },
    async getCar(code){
      try {
        let resp = await this.$http.get(`/cars/${code}`, header);
        if(resp.data.data === null) this.$router.push({path: '/cars'})
        this.data = {...resp.data.data};
      } catch (e) {
        translateError(e);
      } finally{
        this.form = true;
      }
    }
  },
  
}
</script>

<style>

</style>