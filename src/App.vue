<template dir="rtl">

  <q-layout view="lHh Lpr lFf" dir="rtl">
    <q-header elevated class="glossy">
      <q-toolbar class="glossy">

        <q-btn
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
        />

        <template>
          <q-btn v-if="$route.fullPath.includes('/login')" icon="account_circle" label="login" />
          <div class="btm1"  v-if="!$route.fullPath.includes('/login')">
            <q-btn size="12px"  @click="logout()"
                   style="background: darkred; color: white" label="התנתק"/>
          </div>
          <div class="btm2" v-if="!$route.fullPath.includes('/login')">
            <q-btn  @click="goToback()" size="12px" style="background: darkred; color: white" label="חזרה"/>
          </div>

          <q-toolbar-title class="tonda-t">

          </q-toolbar-title>

          <div @click="goToFirst()" class="tondi">tonda</div>

          <div v-if="!$route.fullPath.includes('/login')" class="btm3" @click="goToPrifiles()">
            <q-btn  size="12px" style="background: darkred; color: white" label="פרופילים"/>
          </div>
          <div v-if="!$route.fullPath.includes('/login')" class="btm4" @click="goToPrifile()">
            <q-btn  size="12px" style="background: darkred; color: white" label="פרופיל אישי"/>
          </div>
          <div v-if="!$route.fullPath.includes('/login')" class="btm5" @click="goToPrifile()">
            <q-btn  v-go-back.single v-if="$route.fullPath.includes('/profiles')" color="darkred" flat dense label="back" icon="arrow_back" />          </div>
          <q-btn class="loginbtn" v-if="$route.fullPath.includes('/login')" icon="account_circle" label="login" />

        </template>



      </q-toolbar>
    </q-header>

<!--    <q-drawer-->
<!--        v-model="leftDrawerOpen"-->
<!--        show-if-above-->
<!--        bordered-->
<!--        content-class="bg-grey-2"-->
<!--    >-->
<!--      <q-list>-->
<!--        <q-item-label header>אפשרויות נוספות</q-item-label>-->
<!--        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="school"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Docs</q-item-label>-->
<!--            <q-item-label caption>quasar.dev</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="code"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Github</q-item-label>-->
<!--            <q-item-label caption>github.com/quasarframework</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="chat"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Discord Chat Channel</q-item-label>-->
<!--            <q-item-label caption>chat.quasar.dev</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="forum"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Forum</q-item-label>-->
<!--            <q-item-label caption>forum.quasar.dev</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="rss_feed"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Twitter</q-item-label>-->
<!--            <q-item-label caption>@quasarframework</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--      </q-list>-->
<!--    </q-drawer>-->

<div style="background-color:darkgray">




    <q-page-container style="margin-top: -30px">
      <router-view></router-view>
    </q-page-container>
</div>
  </q-layout>
</template>

<script>
import firebaseInstance from './Driver/firebase'
import Home from "@/views/Home";

export default {
  name: 'LayoutDefault',

  methods :{
    goToFirst(){
      this.$router.push(`/First`)
    },
    goToPrifiles(){
      this.$router.push(`/profiles`)
    },
    goToback(){
      this.$router.go(-1)
    },
    goToPrifile(){
      this.$router.push(`/profile/${window.user.uid}`);
    },
    logout(){
      firebaseInstance.firebase.auth()
          .signOut()
          .then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }

  },


  components: {
    Home
  },

  data() {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
.tondi {
  margin-left: 27%;
  cursor: pointer;

}

.glossy {
  height: 90px;
  text-align: center;
  font-size: 50px;
  font-weight: 800;
  color: hsl(0, 100%, 30%);
  background-color: black;
}

.btm1 {
  font-size: 100px;

  margin-right: 10px;
  margin-top: 30px;
}

.btm2 {
  font-size: 100px;

  margin-right: 10px;
  margin-top: 30px;
}
.btm3{
  font-size: 100px;

  margin-left: 1%;
  margin-top: 30px;

}
.btm4{
  font-size: 100px;

  margin-left: 2%;
  margin-top: 30px;

}
.btm5{
  font-size: 100px;
  /*margin-left: 10%;*/
  margin-top: 30px;


}
.loginbtn{
  margin-left: 3%;
}
.input {
  margin-right: 40%;
}
</style>
