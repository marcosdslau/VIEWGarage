<template>
  <div>
    <v-card
      class="d-flex align-content-center justify-center flex-wrap"
      flat
      tile
      min-height="90vh"
    >
      <LayoutLogin class="elevation-6"/>
    </v-card>
  </div>
</template>

<script>
import LayoutLogin from '../../components/login/layout.vue'
export default {
  components:{
    LayoutLogin
  }
}
</script>

<style>

</style>