<template>
  <div>

<!--    <carusel  :profiles="rows" :forSerch="forSerch" :rowsSerch="rowsSerch" />-->
    <ProfilesTable @isis="realsech" :tableName="'profiles'"/>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
<!--    <page-user @isis="realsech" :tableName="'profiles'"/>-->
    <br>
    <br>
    <br>
<!--    <page-chat @isis="realsech" :tableName="'profiles'"/>-->
  </div>
</template>

<script>
import carusel from "@/components/carusel";
import ProfilesTable from "@/components/ProfilesTable";
import PageUser from "@/components/pageUser";
import PageChat from "@/components/pageChat";


// import AddProfile from "@/components/AddProfile";
export default {
  props: [ 'rows', ],

  name: "profiles",
  components: {
    PageChat,
    PageUser,

    ProfilesTable, carusel
  },



  created() {
    if (!window.user){
      this.$router.push('/first')
  }


},

}
</script>

<style scoped>

</style>