<template>
  <v-container >
      <h1 class="text-center display-2">Gestão de Usuários</h1>
      <br>
      <hr>
      <br>
      <Table/>
  </v-container>
</template>

<script>
import Table from '@/components/admin/user/Table.vue'
export default {
    components:{
        Table
    }

}
</script>

<style>

</style>