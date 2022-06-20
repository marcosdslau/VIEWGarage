<template>
      <v-navigation-drawer
        absolute
        permanent
        expand-on-hover
        class="indigo darken-4"
        dark
      >
        <v-list>
          <v-list-item class="px-2" style="margin-left: -15px">
            <v-list-item-avatar >
              <v-img :src="user.UserPhoto"></v-img>
            </v-list-item-avatar>
            <v-btn
              class="px-2"
              width="150px"
              @click="Logout()"
              plain
            >
              Sair
              <v-icon>mdi-logout</v-icon>
            </v-btn>
            
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <!-- Sandra Adams -->
                {{user.Username}}
              </v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <!-- <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Files</v-list-item-title>
          </v-list-item> -->
          <v-list-item v-for="(value, i) in menu" :key="i" :to="value.route">
            <v-list-item-icon>
              <v-icon>{{value.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{value.option}}</v-list-item-title>
          </v-list-item>




          <!-- <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shared with me</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-navigation-drawer>
</template>

<script>

import { mapGetters } from "vuex";
export default {
  date() {
    return {
      menu: [],
      user: {}
    }
  },

  computed:{
    ...mapGetters(['getUser']),
  },
  methods:{
    setMenu(){
      this.menu = this.getUser.info.permissions.menu;
      this.user = {
        UserPhoto: this.getUser.info.UserPhoto,
        Username: this.getUser.info.Username,
        email: this.getUser.info.email,
      }
      // console.log(this.menu);
    },
    Logout(){
      console.log('sair');
      localStorage.removeItem('token');
      this.$router.push({ path: '/' });
    }
  },
  created() {
    this.setMenu();
  }
}
</script>

<style>

</style>