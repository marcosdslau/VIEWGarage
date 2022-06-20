<template>
    <v-alert
        dense
        border="left"
        :type="type"
        :icon="icon"
        dismissible
        :value="alert"
        absolute
    >
        {{message}}
    </v-alert>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props:{
        type: {
            type: String,
            default: 'error'
        },
        icon: {
            type: String,
            default: 'mdi-alert'
        },
        message: {
            type: String,
            default: 'Erro desconhecido, contate o suporte!'
        }
    },

    data(){
        return{
        alert: true,
        }
    },
    methods:{
        ...mapActions(['popAlert']),
    },
    created(){
        setTimeout(()=>{
        this.alert=false
        this.popAlert();
        },5000)
    }
}
</script>

<style>

</style>