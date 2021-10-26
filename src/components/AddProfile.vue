<template>
  <div>
    <br><br>
    <span v-if="!profile" class="title">       בחירת העדפות </span>
    <span v-if="profile" class="title">       עדכון העדפות </span>
    <div style="margin-top: 10px">
      <p class="ttitlemax"> פרטים שיופיעו לכולם: </p>
    </div>


    <p class="inputtitle">שם מלא: </p>
    <q-input class="input" ref="name" filled v-model="editedProfile.name" color="red" label="full name *" lazy-rules
             :rules="[ val => val && val.length > 0 || 'Please type something']"/>
    <p class="inputtitle">תאריך לידה: </p>
    <q-input class="input" v-model="editedProfile.date" filled type="date" color="red" label="date" hint=" date"
             lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"/>
    <p class="inputtitle">צבע עיניים: </p>
    <q-input class="input" v-model="editedProfile.color" color="red" type="color" label="color *"/>

    <br>
    <br>
    <br>
    <input type="color" v-model="editedProfile.color" id="primary-color-input"/>

    <br>

    <p class="inputtitle">סגנון גוף: </p>
    <q-badge v-model="editedBody" id="onbody" class="111" color="black">
            {{editedBody}}

    </q-badge>
    <div @click="numberBody()">
      <q-slider  class="input" reverse v-model="editedProfile.body" :min="0"
                :max="50" color="black"
                label-always/>
    </div>
    <p class="inputtitle1">חטוב/ה </p>
    <p class="inputtitle2">מלא/ה </p>
    <br>
    <!--    <p class="inputtitle">סגנון גוף: </p>-->
    <!--    <q-slider class="input" reverse v-model="editedProfile.tbody" label="boby *" :min="0" :max="50" color="black"-->
    <!--              label-always />-->
    <!--    <p class="inputtitle1">רזה </p>-->
    <!--    <p class="inputtitle2">שמן </p>-->
    <p class="inputtitle">גובה: </p>
    <q-input class="input" v-model="editedProfile.height" color="red" type="number" :min="150" :max="230"
             label="height *" hint="150-230"/>
    <p class="inputtitle">דת: </p>
    <q-select class="input" clearable filled color="red" v-model="editedProfile.religion" :options="options"
              label="religion"/>
    <p class="inputtitle">תמונת פרופיל: </p>

    <q-input class="input" v-model="editedProfile.pic" @click="click1"  @change="previewImage" ref="input1" filled type="file" label="profile pic"   />
    <p class="inputtitle">עוד תמונות: </p>

    <q-input class="input" v-model="editedProfile.image" @click="click1"  @change="previewImage1" ref="input1" filled type="file" label="profile pic"   />

    <p class="inputtitle">קצת על עצמי: </p>
    <q-input class="input" v-model="editedProfile.onme" filled clearable type="textarea" label="קצת על עצמי *"/>
    <q-btn v-if="!profile" size="15px" style="background: darkred; margin-top: 20px; margin-right: 50%; color: white"
           label="המשך לפרופיל" @click="insert()"/>

    <q-btn v-if="profile" size="15px" style="background: darkred; margin-top: 20px; margin-right: 40%; color: white"
           label="עדכן פרופיל" @click="updated()"/>
    <br>
    <br>
    <br>

  </div>

</template>

<script>
const inputs = ['primary', 'secondary'];
import localStorageDriver from '../Driver/Local-Storage'
import api from "@/Driver/api";
import firebaseDatabase from '../Driver/firebase/database';
import firebaseInstance from '../Driver/firebase';

export default {
  name: "AddProfile",
  props: ['tableName', 'profile'],
  data() {
    return {
      editedBody: '(0- רזה | 50- שמן)',
      temp: null,
        // x : {},
      editedProfile: {
        body: null,
        // bodyt:'',
        height: 150,
      pic: null,
        image : null
      },
      model: null,
      options: [
        'דתי', 'אטאיסט', 'מסורתי', 'חילוני',
      ]
    }

  },
  methods: {
    click1() {
      this.$refs.input1.click()
    },
    previewImage(event) {
      this.uploadValue=0;
      this.img1=null;
      this.imageData = event.target.files[0];
      this.onUpload()

    },
    previewImage1(event) {
      this.uploadValue=0;
      this.img2=null;
      this.imageData = event.target.files[0];
      this.onUpload1()

    },


    onUpload(){

    this.img1=null;
    const storageRef=firebaseInstance.firebase.storage()
        .ref(`${window.user.uid}`);
    var mountainImagesRef = storageRef.child('profile/mountains.jpg');
    return  mountainImagesRef.put(this.imageData)
        .then((snapshot) => {
            console.log('Uploaded a blob or file!') ;
            return   snapshot.ref.getDownloadURL().then((result)=> {
                console.log(result)
              this.img1 =result;
                this.editedProfile.pic = this.img1
            });
        });


},


    onUpload1(){

      this.img2=null;
      const storageRef=firebaseInstance.firebase.storage()
          .ref(`${window.user.uid}`);
      var mountainImagesRef = storageRef.child('images/mountains.jpg');
      return  mountainImagesRef.put(this.imageData)
          .then((snapshot) => {
            console.log('Uploaded a blob or file!') ;
            return   snapshot.ref.getDownloadURL().then((result)=> {
              console.log(result)
              this.img2 =result;
              this.editedProfile.image = this.img2
            });
          });


    },
    insert() {
      this.editedProfile.body = localStorageDriver.bodyCalculator(this.editedProfile.body)
      this.editedProfile.date = localStorageDriver.ageCalculator(this.editedProfile.date)
      if (this.editedProfile.date == false) return false;
       // this.x = {profiles: this.editedProfile}
      //   firebaseDatabase.image({ pic: this.editedProfile.pic})
      // .then((res) =>{
        this.editedProfile.pic = this.img1
        this.editedProfile.image = this.img2
        firebaseDatabase.post({entity: this.tableName, profile: this.editedProfile})
        this.$emit('addProfile')
        this.goToPrifiles()
      // })





    },

    numberBody() {
      if (this.editedProfile.body <= 20) this.editedBody = 'חטוב/ה'
      else this.editedBody = 'מלא/ה'
    },

    updated() {
   if (this.editedProfile.pic == null){
     this.editedProfile.pic = this.profile.pic
   }
      if (this.editedProfile.image == null){
        this.editedProfile.image = this.profile.image
      }
      this.editedProfile.date = localStorageDriver.ageCalculator(this.editedProfile.date);
      // this.x = {profile: this.editedProfile}
      if(this.editedProfile.pic == null){

      }
       firebaseDatabase.updateprofile({entity: this.tableName, entityId:`${window.user.uid}`, newProfile: this.editedProfile})
      .then (()=>{
        this.$emit('addProfile')
        this.goToPrifiles();
      })

    },
    goToPrifiles() {
      this.$router.push(`/profiles`)
    },
    goToPrifile() {
      this.$router.push(`/profile`)
    }
  },
  created() {
    // const post = {
    //   photo: this.img1,
    //   caption: this.caption
    // };
    //
    // firebaseInstance.firebase.database().ref('PhotoGallery').push(post)
    //     .then((response) => {
    //       console.log(response)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    if (!window.user) {
      this.$router.push('/first')
    }
    if (this.profile) {

      this.editedProfile = this.profile;

    }
  },


}

</script>

<style scoped>


.btm1 {
  font-size: 100px;

  margin-right: 30px;
  margin-top: 30px;
}

.body {

  position: static;
  margin-left: 3000px;

}

.ttitlemax {
  margin-right: 15%;
  padding: 5px 30px 5px 30px;
  opacity: 0.8;
  font-size: 12px;
  text-align: center;
  border-radius: 20px;
  border: none;
  background-color: #A52A2A;
  color: white;
  margin-top: 10px;
  display: inline-block;
  cursor: copy;
}

.inputtitle {
  margin-right: 35%;
  padding: 0px 30px 0px 30px;
  opacity: 0.8;
  font-size: 12px;
  text-align: center;
  border-radius: 20px;
  border: none;
  background-color: black;
  color: red;
  margin-top: 10px;
  display: inline-block;
  cursor: copy;
}

.inputtitle1 {

  margin-right: 35%;
  padding: 0px 20px 0px 20px;
  opacity: 0.6;
  font-size: 12px;
  text-align: center;
  border-radius: 20px;
  border: none;
  background-color: red;
  color: black;
  margin-top: -2.3%;
  display: inline-block;
  cursor: copy;
  position: absolute;
}

.inputtitle2 {

  margin-right: 64%;
  padding: 0px 20px 0px 20px;
  opacity: 0.6;
  font-size: 12px;
  text-align: center;
  border-radius: 20px;
  border: none;
  background-color: red;
  color: black;
  margin-top: -2.3%;
  display: inline-block;
  cursor: copy;
  position: absolute;
}

.input {
  margin-left: 40%;
  max-width: 300px;


}

.title {
  margin-right: 25%;
  padding: 0px 150px 0px 150px;
  opacity: 0.85;
  font-size: 50px;
  text-align: center;
  border-radius: 20px;
  border: none;
  background-color: #A52A2A;
  color: white;
  margin-top: 10px;

  display: inline-block;


}
</style>