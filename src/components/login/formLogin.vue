<template>
  <div class="pa-6">
        <v-form>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                label="Senha"
                name="password"
                v-model="password"
                @keyup.enter="login(email, password)"
                :type="showPassword ? 'text' : 'password'"
                append-icon="mdi-eye-off"
                @click:append="showPassword = !showPassword"
            ></v-text-field>
    
            <v-btn
            color="error"
            @click="login(email, password)"
            block
            :loading="loading"
            >
            Acessar
                <v-icon>mdi-lock</v-icon>
            </v-btn>

        </v-form>
        <br>
        <span style="font-size: 11px"> <a href="#">Esqueceu a senha?</a></span>
        <div style="position: absolute; bottom: 13px; left: -0px; width: 350px;">
            <v-alert
                prominent
                type="error"
                icon="mdi-cloud-alert"
                dismissible
                :value="alertLogin"
            >
                Login inválido! Tente novamente.
            </v-alert>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            alertLogin: false,
            showPassword: false,
            email: 'master@lau.com',
            password: '14253636',
            loading: false,
            emailRules: [
        v => !!v || 'é necessário informar o E-mail',
        v => /.+@.+\..+/.test(v) || 'email inválido',
      ],
        }
    },
    methods:{
        desativeTimer(){
            this.alertLogin = true;
            setTimeout(() => {
                this.alertLogin = false;
            }, 5000);
        },
        async login(email, password){
            this.loading = true;
            let op = false;
            try{
                let resp = await this.$http.post('/login', {email, password});
                localStorage.setItem('token', resp.data.token)
                this.$router.push({ path: '/admin' });
            } catch(err){
                op = true;
                console.log(err.message);
            } finally{
                this.loading = false;
                if(op){
                    this.desativeTimer();
                }
            }
        }
    }

}
</script>

<style>

</style>