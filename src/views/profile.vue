<template>
  <div>
    <br><br><br>


    <ProfilesTable :profile="profile" :tableName="tableName" :isReload="isReload"></ProfilesTable>
    <div class="images">
        <carusel  :profiles="[profile]" :forSerch="forSerch" :rowsSerch="rowsSerch" />
    </div>
    <AddProfile v-if="(profileid == x)" :profile="profile" :tableName="tableName" @addProfile="changeData"></AddProfile>

  </div>

</template>

<script>

import AddProfile from "@/components/AddProfile";
import ProfilesTable from "@/components/ProfilesTable";
import carusel from "@/components/carusel";
import firebaseDatabase from "@/Driver/firebase/database";


export default {
  name: "profile",
  components: {
    AddProfile, ProfilesTable, carusel
  },
  data() {
    return {
      x: null,
      profileid: 2,
      profile: null,
      id: 0,
      tableName: 'profiles',
      isReload: false
    }
  },
  methods: {
    getProfileById(id) {
      firebaseDatabase.getmyprofile({entity: this.tableName, id,})
          .then(result => {
            this.profile = result;

          })
// this.profile = localStorageDriver.getProfileById(this.tableName , this.$route.params.id )

    },
    changeData() {
      this.isReload = !this.isReload
    }
  },
  created() {
    // this.id = this.$route.params.id
    this.getProfileById(this.$route.params.id);
    // this.getProfileById(`${window.user.uid}`);
    this.x = `${window.user.uid}`;
    this.profileid = this.$route.params.id
  },

}
</script>

<style scoped>
.images{
  margin-right: 45%;
  margin-top: -25%;
}
</style>