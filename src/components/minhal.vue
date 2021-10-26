<template>
  <div class="top" style="background-color: #1D1D1D; margin-top: -60px">
    <div class="q-pa-md" >
      <br> <br> <br> <br>
      <p  class="tableTitle">  פרופילים  </p>
      <q-table
          title="Treats"
          :data="rows"
          :columns="columns"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
<!--            <q-td key="desc" :props="props">-->
<!--              {{ props.row.name }}-->
<!--              <q-popup-edit v-model="props.row.name">-->
<!--                <q-input v-model="props.row.name" dense autofocus counter />-->
<!--              </q-popup-edit>-->
<!--            </q-td>-->
<!--            <q-td key="calories" :props="props">-->
<!--              {{ props.row.calories }}-->
<!--              <q-popup-edit v-model="props.row.calories" title="Update calories" buttons>-->
<!--                <q-input type="number" v-model="props.row.calories" dense autofocus />-->
<!--              </q-popup-edit>-->
<!--            </q-td>-->
<!--            <q-td key="fat" :props="props">-->
<!--              <div class="text-pre-wrap">{{ props.row.name }}</div>-->
<!--              <q-popup-edit v-model="props.row.fat">-->
<!--                <q-input type="textarea" v-model="props.row.fat" dense autofocus />-->
<!--              </q-popup-edit>-->
<!--            </q-td>-->
<!--            <q-td key="carbs" :props="props">-->
<!--              {{ props.row.carbs }}-->
<!--              <q-popup-edit v-model="props.row.carbs" title="Update carbs" buttons persistent>-->
<!--                <q-input type="number" v-model="props.row.carbs" dense autofocus hint="Use buttons to close" />-->
<!--              </q-popup-edit>-->
<!--            </q-td>-->
            <q-td key="date" :props="props">{{ props.row.date }}</q-td>
            <q-td key="color" :props="props">{{ props.row.color }}</q-td>
            <q-td key="body" :props="props">{{ props.row.body }}</q-td>
            <q-td key="height" :props="props">{{ props.row.height }}</q-td>
            <q-td key="religion" :props="props">{{ props.row.religion }}</q-td>
            <q-td key="pic" :props="props">{{ props.row.pic }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>

import localstorageDriver from '../Driver/Local-Storage';
export default {
  name: "Minhal",
  props:['reload','profile' , 'tableName'],
  data() {
    return {
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
        {name: 'bodyt', label: 'סגנון שריר', field: 'bodyt'},
        {name: 'height', label: 'גובה', field: 'height'},
        {name: 'religion', label: 'דת', field: 'religion'},
        {name: 'pic', label: 'תמונה', field: 'pic'},
        {name: 'onme', label: 'על עצמי', field: 'onme'},


      ],
      rows: [ ]
    }
  },
  methods : {
    read(){
        this.rows = localstorageDriver.select('tableProfile')
      // this.goToDateKey();
    },
    // goToDateKey(rows){
    //   this.rows = localstorageDriver.select(this.tableName)
    //   for (var obj of this.rows)   {
    //     for (var key in obj){
    //       result[key]= localstorageDriver.select(this.tableName)
    //       if (key == 'date'){
    //         result[key] =this.ageCalculator(result[key])
    //         if (result[key]== false){
    //           return false;
    //         }
    //       }
    //
    //     }
    //   }
    // },
    remove(id){
      localstorageDriver.remove(this.tableName , id);
      this.read();
    },
    goToPrifile(id){
      this.$router.push(`/profile/${id}`)
    }
  },
  created() {
    this.read();
  },
  watch:{
    reload(){
      this.read()
    }
  }
}
</script>

<style scoped>
.del222{
  color: #1D1D1D;
  background-color: darkred;
  margin-right: 50%;
}
.tableTitle{

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
</style>