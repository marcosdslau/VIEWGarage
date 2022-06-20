<template>
  <v-container >
      <h1 class="text-center display-2">Cadastrar Nova Pessoa</h1>
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
      <!-- <Form/> -->
      <Form :data="data" :loading="loading" @actionForm="setInstitution" />
  </v-container>
</template>

<script>
import Form from '@/components/admin/person/Form.vue'
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
        cpf: '',
        socialName: '',
        country: '',
        atived: true,
      },
      loading: false
    }
  },
  methods:{
    ...mapActions(['addAlert']),
    async setInstitution(){
      let success = false;
      try {
        let cpf = this.data.cpf.split('').filter(s=> s !=='.' && s !=='-').join('');
        let obj = {...this.data}
        delete obj.cpf;
        this.loading = true;
        // console.log({...obj, cpf})
        // console.log(cpf)
        let resp = await this.$http.post('/persons', {...obj, cpf}, header);
        console.log(resp);
        success = true;
      } catch (e) {
        translateError(e);
      } finally{
        if(success){
          this.addAlert({
            type:"success", icon:"mdi-account-plus", message:"Cadastrado com Sucesso!"
          });
        }
        this.loading = false;
        this.$router.push({path: '/persons'})
      }
    }
  }

}
</script>

<style>

</style>