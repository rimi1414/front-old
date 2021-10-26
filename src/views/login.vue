<template>
  <q-page class="q-pa-md" style="background: #1D1D1D">

    <div>
      <br> <br>
      <p  class="title">
        אפליקציית הכרויות  </p></div>
    <br>

    <q-card class="full-width" >
      <q-tabs
          v-model="tab"
          dense
          class="text-grey glossy"
          style="background-color: darkred"
          active-color="black"
          indicator-color="black"
          align="justify"
          narrow-indicator
      >
        <q-tab name="login" label="login" />
        <q-tab name="register" label="register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <loginregister :tab ="tab"/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <loginregister :tab= "tab" />
        </q-tab-panel>


      </q-tab-panels>
    </q-card>

  </q-page>

</template>

<script>
import firebaseInstance from '../Driver/firebase'
import loginregister from "@/components/loginregister";
export default {
name: "first",
  components: {
   loginregister
  },
  data () {
    return {
      tab: 'login',
      inputdata :{
        email: '',
        username: '',
        password: '',
        emaillog: '',
        passwordlog: ''
      }

    }
  },
  methods : {
    goToHome() {
      this.$router.push(`/`)
    },
    login(){
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            window.user = result.user;
            this.$router.push('/')
            // ...
          }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
    newlogin(){
      firebaseInstance.firebase.auth()
          .createUserWithEmailAndPassword(this.inputdata.email, this.inputdata.password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            window.user = userCredential.user;
            this.$router.push('/')
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
    },
    returnlogin(){
      firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.inputdata.emaillog, this.inputdata.passwordlog)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    }
  },
  created() {
  if (window.user){
    this.$router.push('/profiles')
  }
  }
}
</script>

<style scoped>
.glossy {
  text-align: center;
}
.title{
  margin-right: 5%;
  padding: 0px 150px 0px 150px;
  opacity: 0.85;
  font-size: 50px;
  text-align: center;
  border-radius: 20px;

  background-color: black;
  color: white;
  margin-top: 10px;

  display: inline-block;

  border-style: solid;
  border-color: darkred;



}
.first{
  background-color: #1D1D1D;
}
</style>