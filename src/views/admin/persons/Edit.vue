<template>
  <v-container >
      <h1 class="text-center display-2">Atualizar Cadastro Pessoa</h1>
      <br>
      <hr>
      <br>
      <v-btn
        class="float-left"
        plain
        color="error"
        to="/persons"
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
import Form from '@/components/admin/person/Form.vue'
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
    this.getPerson(this.$route.params.idPerson);
  },
  methods:{
    ...mapActions(['addAlert']),
    async setUpdate(payload){
      let success = false
      try {
        this.loading = true;
        let cpf = payload.cpf.split('').filter(s=> s !=='.' && s !=='-' && s !=='/').join('');
        const obj = {...payload}
        delete obj.cpf;
        let resp = await this.$http.put(`/persons/${payload.idPerson}`, {...obj, cpf}, header);
        console.log(resp)
        success = true;
      } catch (e) {
        translateError(e);
      } finally{
        if(success){
          this.addAlert({
            type:"success", icon:"mdi-account-plus", message:"Dados Atualizados com Sucesso!"
          });

        }
        this.loading = false;
        this.$router.push({path: '/persons'});

      }

    },
    async getPerson(code){
      try {
        let resp = await this.$http.get(`/persons/${code}`, header);
        if(resp.data.data === null) this.$router.push({path: '/persons'})
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