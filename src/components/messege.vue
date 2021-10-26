<template>
<q-page class="flex">

  <q-list class="full-width" separator bordered>
    <q-item v-for="user in users" :key="user.id" class="q-my-sm" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">
          {{ user.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user.name }}</q-item-label>

      </q-item-section>

      <q-item-section side>
        <q-icon name="chat_bubble" color="green" />
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
        name: 'rimon'
      }, {
        id: 2,
        name: 'avihai'
      }, {
        id: 3,
        name: 'dekel'
      } ]

    }
  }
}
</script>

<style scoped>

</style>