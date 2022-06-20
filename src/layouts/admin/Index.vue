<template>
    <v-app class="indigo lighten-5">
        <Menu/>
        <v-main>
            <div class="ml-11">
                <div class="mt-2" style="position: fixed; top:10px; right:10px; width: 400px; right: 10px;">
                    <Alert v-for="(alert, i) in getAlerts" :key="i" :type="alert.type" :icon="alert.icon" :message="alert.message"/>
                </div>
                <router-view/>
            </div>
        </v-main>
        <v-footer class="indigo lighten-5">
            <v-row>
                <v-col cols="12" xl="12" lg="12" sm="12" md="12" xs="12" >
                        <v-img
                            contain
                            src="@/assets/GarageLogo.png"
                            height="40px"
                      ></v-img>
                      <p class="text-center" style="font-size: 0.6rem">
                          Estudos Lau | &copy; {{(new Date()).getFullYear()}}
                      </p>
                </v-col>
            </v-row>
        </v-footer>

    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from '@/components/admin/Menu.vue'
import Alert from '@/components/Alert.vue'
export default {
    components:{
        Menu,
        Alert
    },
    computed:{
        ...mapGetters(['getAlerts']),
    },
    watch:{
        getAlerts(){
            console.log(this.getAlerts)
        }
    },
    methods:{
        
        renderAlert() {
            console.log(this.getAlerts)
        }
    }
}
</script>

<style>

</style>