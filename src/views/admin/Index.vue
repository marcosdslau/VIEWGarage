<template>
  <v-container class="pa-4 my-4">
    <v-row>
      <v-col align="center">
          <span class="display-2">Resumo Carros</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <BarChart v-if="chartData" :chart-data="chartData" />
        </v-col>
        <v-col>
          <PieChart v-if="chartData2" :chart-data="chartData2"/>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import PieChart from '@/components/admin/dashboard/Pie.vue'
import BarChart from '@/components/admin/dashboard/Bar.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
  components:{
    PieChart,
    BarChart,
  },
  data(){
    return {

    }
  },
  async mounted () {
    await this.getAllRentCars();
    await this.getAllNowRents();
  },
  computed:{
    ...mapGetters(['getRentsCars', 'getNowRents']),
    chartData() {
      return {
        ...this.getRentsCars
      }
    },
    chartData2() {
      return {
        ...this.getNowRents
      }
    }
  },
  methods:{
    ...mapActions(['getAllRentCars', 'getAllNowRents']),
},

}
</script>

<style>

</style>