<template style="background-color: #1D1D1D">

  <q-page
      class="window-height window-width row justify-center items-center"
      style="background: #1D1D1D;"
  >
    <div>
      <br> <br>
      <p  class="title">     ברוך הבא לטונדה-
        אפליקציית הכרויות  </p></div>
    <div class="window-height window-width row justify-center items-center" >
    <div class="column q-pa-lg" style="background-color: #1D1D1D; margin-top: -70px">
      <div class="row" style="background-color: #1D1D1D">
        <q-card square class="shadow-24" style="width:300px;height:485px;" >
          <q-card-section class="glossy" style="background-color: darkred" >
            <h4 class="text-h5 text-white q-my-md" style="margin-right: 30%">התחברות</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="add" color="red-5" />
            </div>
          </q-card-section >
          <q-card-section >
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="inputdata.emaillog" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="inputdata.passwordlog" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pa-md q-gutter-md" >
              <q-btn class="glossy" @click="login()" label="G" round color="indigo-7">
                <q-icon name="fab fa-facebook-f" size="1.2rem" />
              </q-btn>
              <q-btn round color="red-8">
                <q-icon name="fab fa-google-plus-g" size="1.2rem" />
              </q-btn>
              <q-btn round color="light-blue-5">
                <q-icon name="fab fa-twitter" size="1.2rem" />
              </q-btn>
            </div>
          </q-card-section>
          <q-card-actions class="q-px-lg" >
            <q-btn @click="returnlogin" unelevated size="lg" color="red-5" class="full-width text-white" label="Sign In" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="column q-pa-lg" style="background-color: #1D1D1D; margin-top: -70px">
      <div class="row" >
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section class="glossy" style=" background-color:darkred">
            <h4 class="text-h5 text-white q-my-md" style="margin-right: 30%">הרשמה</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="close" color="red-5" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input square clearable v-model="inputdata.email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="inputdata.username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="inputdata.password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn @click="newlogin()" unelevated size="lg" color="red-5" class="full-width text-white" label="Get Started" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Return to login</p>
          </q-card-section>
        </q-card>
      </div>
<!--      <q-btn @click=" goToHome()" unelevated size="lg" color="red-5" class="full-width text-white" label="Get Started" />-->
    </div>
    </div>
  </q-page>

</template>

<script>
import firebaseInstance from '../Driver/firebase'
export default {
name: "first",
  data () {
    return {
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