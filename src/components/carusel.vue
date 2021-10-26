<template>
  <div class="q-pa-md row aaa" v- >
<!--    <q-carousel class="qqq"-->
<!--        v-for="profile of profiles"-->
<!--        animated-->
<!--        v-model="slide"-->
<!--        thumbnails-->
<!--        infinite-->
<!--    >-->
<!--      <q-carousel-slide @click="gomyprofile1(id)" :name="1" :img-src="profile.pic" class="asa" />-->
<!--      <q-carousel-slide :name="1" :img-src="profile.image" class="asb"/>-->

<!--    </q-carousel>-->
<!--    <q-input borderless dense debounce="300" style="background-color:gray; margin-right: 65%" v-model="serchByName" placeholder="חיפוש">-->
<!--      <template v-slot:append>-->

<!--        <q-btn class="del222" @click="remove(props.row.id)"><q-icon name="search"/></q-btn>-->

<!--      </template>-->
<!--    </q-input>-->
    <q-card class="my-card q-ma-sm"  v-for="profile of profiles">
      <q-carousel
          class="my-card"
          swipeable
                  animated
                  v-model="profile.slide"
                  thumbnails
                  infinite
      >

        <q-carousel-slide   class="my-card" @click="gomyprofile1(profile.id)" :name="2" :img-src="profile.pic">

          <div class="container">
            <div class="block"></div>
            <div class="text"> {{profile.name}}</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="1" :img-src="profile.image" >
          <div class="container">
            <div class="block"></div>
            <div class="text">גיל: {{profile.date}}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>


    </q-card>

  </div>
</template>

<script>
export default {

  props:['profiles', 'rowsSerch' , 'forSerch'],
  name: "carusel",
  data:() => ({
    slide: 1,
  }),

  methods: {
    gomyprofile1(id){
      // this.$router.push({name: 'profile', params:`${props.row.id}`});
      this.$router.push(`/profile/${id}`);

    },

  },
  watch:{
    forSerch(){
      this.profiles = [this.rowsSerch];

    }
  }
}
</script>

<style scoped>
.aaa {
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 80px;
}
.qqq{
  height: 90px;
  width: 10%;
  border-radius: 50%;
}
.my-card{
  height:200px;
  width:200px;
  border-radius: 90px;

}
.container {
  position: relative;
  width: 300px;
  height: 200px;
  margin-top: 60%;

}
.block {
  background: gray;
  filter: alpha(opacity=60);
  /* IE */
  -moz-opacity: 0.6;
  /* Mozilla */
  opacity: 0.6;
  /* CSS3 */
  position: absolute;
  top: 0;
  left: 0;
  height: 40%;
  width: 100%;
  margin-left: 10%;
  /*margin-top: 10%;*/
}
.text {
  font-weight: bold;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-right: 20%;
  margin-top: -10px;
  position: relative;
}


</style>