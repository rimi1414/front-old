<template>
  <q-page class="flex q-pa-md">
<h5>page 1user</h5>
    <q-list class="full-width" separator bordered>
      <q-item v-for="user in users" :key="user.id"
              to="/chat"
              class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>

        </q-item-section>

        <q-item-section side>
          <q-badge
              :color="user.online ? 'light-green-6' : 'grey-8'">
            {{ user.online ? 'online' :'offline' }}
          </q-badge>
        </q-item-section>
      </q-item>


    </q-list>
  </q-page>




</template>

<script>
import localStorageDriver from '../Driver/Local-Storage'
import api from "@/Driver/api";
import firebaseDatabase from '../Driver/firebase/database';
import firebaseInstance from '../Driver/firebase';



export default {
  data () {
    return {
      users : [ {
        id: 1,
        name: 'rimon',
        online: true
      }, {
        id: 2,
        name: 'avihai',
        online: false
      }, {
        id: 3,
        name: 'dekel',
        online: true
      } ]

    }
  }
}
</script>

<style scoped>

</style>