<template>
    <v-card
        class="mx-auto"
        max-width="350"
    >
        <br>
        <v-img
        contain
        src="@/assets/GarageLogo.png"
        height="200px"
        ></v-img>

        <FormLogin />

    </v-card>
</template>

<script>
import FormLogin from './formLogin.vue'
export default {
    components:{
        FormLogin
    },
}
</script>

<style>

</style>