<template>
<q-page class="flex column">
  <q-banner  class="text-center bg-grey-8">
   user is offline

  </q-banner>
  <div class="q-pa-md column col justify-end justify-center">
    <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from == 'ממני' ? true : false"
    />

  </div>
  <q-footer elevated>
    <q-toolbar>
      <q-from class="full-width" @submit="sendMessage">
      <q-input bg-color="white" v-model="newMessage" outlined rounded label="message" dense>
        <template v-slot:after>
          <q-btn @click="sendMessage" type="submit" round dense flat icon="send" color="white"/>
        </template>
      </q-input>
      </q-from>
    </q-toolbar>
  </q-footer>
</q-page>




</template>

<script>
import localStorageDriver from '../Driver/Local-Storage'
import api from "@/Driver/api";
import firebaseDatabase from '../Driver/firebase/database';
import firebaseInstance from '../Driver/firebase';



export default {
  data () {
    return{
      newMessage:'',
      messages :[
        {
          text:'היי גים איך אתה?',
          from:'ממני'
        },
        {
          text:'טוב תודה רימון איך אתה?',
          from:'ממנו/ה'
        },
        {
          text:'די טוב',
          from:'ממני'
        }
      ]
    }
  },
  methods:{
    sendMessage(){
      this.messages.push({
        text: this.newMessage,
        from: 'ממני'
      })
    }
  }
}
</script>

<style scoped>

</style>