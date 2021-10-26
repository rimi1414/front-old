<template>
  <div class="top bg-grey-9" style=" margin-top: -60px">
    <br>
    <br>
    <p v-if="profile" class="tableTitle"> פרופיל אישי: </p>
    <br>
    <br>
    <p v-if="!profile" class="tableTitle"> פרופילי טונדה: </p>

    <div class="q-pa-md" v-if="profile">

      <q-table
          title="" style="background-color:black"
          :data="rows"
          :columns="columns"
          row-key="name"
          selection="multiple"
          :selected.sync="selected"
          :filter="filter"
          grid
          hide-header
      >

<!--        <template v-slot:top-right v-if="profile">-->
<!--          <q-input borderless dense debounce="300" style="background-color:gray" v-model="searchByName" placeholder="חיפוש">-->
<!--            <template v-slot:append>-->
<!--              <q-icon name="search"/>-->
<!--            </template>-->
<!--          </q-input>-->
<!--        </template>-->

        <template v-slot:item="props" >
<!--          xxxx-->
          <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card class="bbb text-white">
              <q-card-section>

                <img  @click="gomyprofile(props.row.id)" :src="props.row.pic"
                      style=" height: 80px ; width: 80px; border-radius: 25px;">
                <q-checkbox dense v-model="props.selected" :label="props.row.name"/>
                <q-btn v-if="(profileid == x)" :profile="profile" class="del222" @click="remove(props.row.id)">מחק</q-btn>
              </q-card-section>
              <q-separator/>
              <q-list dense>
                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>

        </template>

      </q-table>
    </div>




<!--    <carusel :profiles="rows"/>-->
<!--    <div  style="  background-color:black; width: 90%; margin-right: 20px;  ">-->
<!--    <carusel v-if="rows.length !== 0" :profiles="rows" />-->
<!--    </div>-->
<!--    <br>  <br>    <br>    <br>    <br>-->
    <div v-if="!profile" class="q-pa-md row items-start q-gutter-md" style="margin-right: 50px; max-width: 1200px;">

      <q-card dark bordered class="bg-grey-10 my-card">
        <q-card-section>
          <div class="text-h6">הפרופילים שלנו</div>
          <q-input borderless dense debounce="300" style="background-color:gray; margin-right: 65%" v-model="searchByName" placeholder="חיפוש על פי שם או גיל">
            <template v-slot:append>
              <q-btn  class="serch" @click="search()"><q-icon name="search"/></q-btn>
            </template>
          </q-input>
          <div class="text-subtitle2">לחץ להכנס לפרופיל</div>
        </q-card-section>

        <q-separator dark inset style="color: #C10015; background-color: black"/>

        <q-card-section>
          <carusel :forSerch="forSerch" :rowsSerch="this.rowsSerch"  :profiles="this.rows"  />
        </q-card-section>
      </q-card>


    </div>
  </div>

</template>

<script>

// import localstorageDriver from '../Driver/Local-Storage';
// import api from '../Driver/api';
import carusel from "@/components/carusel";

import firebaseDatabase from '../Driver/firebase/database';
import profiles from "@/views/profiles";

export default {
  name: "ProfilesTable",
  components:{carusel},
  props: ['isReload', 'profile', 'tableName', 'profiles'],
  data() {
    return {
      yyyyy :0,
      forSerch : false,
       searchByName:'',
      slide: 1,
      x : null,
      profileid : 2,
      filter: '',
      selected: [],
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'profile Name',
          align: 'center',
          field: row => row.name,

          sortable: true
        },
        {name: 'date', align: 'date', label: 'תאריך', field: 'date', sortable: true},
        {name: 'color', label: 'צבע עיניים', field: 'color', sortable: true},
        {name: 'body', label: 'סגנון גוף', field: 'body'},
        // {name: 'bodyt', label: 'סגנון שריר', field: 'bodyt'},
        {name: 'height', label: 'גובה', field: 'height'},
        {name: 'religion', label: 'דת', field: 'religion'},
        {name: 'onme', label: 'על עצמי', field: 'onme'},




      ],
      rows: [],
      rowsSerch:[]
    }
  },
  methods: {
    read(searchByName) {

      firebaseDatabase.get({entity : this.tableName})
          .then(result =>{
            this.rows = result;
            for(var i=0; i<result.length; i++){
              if (searchByName == result[i].name){
this.rowsSerch = result[i]
                this.realsech();
break;
              }
              if (searchByName && result[i].date == searchByName){
                this.rowsSerch = result[i]
                this.realsech();
              }
              if (searchByName !=undefined && result[i].name  != searchByName && result[i].date !== searchByName){
this.yyyyy ++
                if (this.yyyyy == result.length){
                  alert('אין חיפוש כזה')
                  this.yyyyy = 0
                }
              }
              else {
                this.rows = result;
              }
            }


          })
    },
    // read2(id) {
    //   firebaseDatabase.getmyprofile({entity : this.tableName, id:id})
    //       .then(result =>{
    //         this.rows = result;
    //       })
    // },
    // goToDateKey() {
    //   this.rows = localstorageDriver.select(this.tableName)
    //   for (var obj of this.rows) {
    //     for (var key in obj) {
    //
    //       if (key == 'date') {
    //         obj[key] = this.ageCalculator(obj[key])
    //       }
    //     }
    //   }
    //   return this.rows
    // },
    search(){
      this.read(this.searchByName);

    },
    remove() {
      firebaseDatabase.deleteprofile({entity: this.tableName, entityId: this.$route.params.id})
          // localstorageDriver.remove(this.tableName, id);
          .then( () => {
            this.read()
          })
    },
    realsech(){
      this.forSerch =!this.forSerch
    },
    gomyprofile(id){
      // this.$router.push({name: 'profile', params:`${props.row.id}`});
      this.$router.push(`/profile/${id}`);

    },
    // goToPrifile() {
    //   firebaseDatabase.get2({entity : this.tableName})
    //       .then(result =>{
    //         this.rows = result;
    //       })
    // }
  },

  created() {
    if (this.$route.params.id) {

      //this.read2(this.$route.params.id)
    }else {
      this.read();
    }
    this.x = `${window.user.uid}`;
    this.profileid = this.$route.params.id
  },
  watch: {
    isReload() {
      this.read()
    },
    profile() {
      if (this.rows[0] != this.profile){
        this.rows.push(this.profile)
      }

      if (this.profile.image) {
        this.profile.images = [this.profile.image, this.profile.pic]
      }
    },

  }
}
</script>

<style scoped>
.del222 {
  color: #1D1D1D;
  background-color: darkred;
  margin-right: 50%;
}.serch{
   color: #1D1D1D;
   background-color: darkred;
   margin-right:10%;
 }

.tableTitle {

  margin-right: 2%;
  padding: 0px 120px 0px 120px;
  opacity: 0.85;
  font-size: 40px;
  text-align: center;
  border-radius: 20px;

  background-color: black;
  color: white;
  margin-top: 20px;

  display: inline-block;

  border-style: solid;
  border-color: darkred;


}
.images {
  width: 300px;
  height: 300px;
  margin-top: -35%;
  margin-right: 40%;
  border-radius: 40%;
}
.card {
  width: 100%;
  max-width: 250px;
  border-radius: 50%;


}
.card1 {
  width: 100%;
  max-width: 250px;
  border-radius: 50%;

}
.bbb{
  background-color: grey;
}
</style>