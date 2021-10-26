<template>
  <div class="home">
    <AddProfile  :tableName="'profiles'"/>
    <messege  :tableName="'profiles'"/>


  </div>
</template>

<script>
// @ is an alias to /src
import AddProfile from "@/components/AddProfile";
import Messege from "@/components/messege";


export default {
  name: 'Home',

  components: {
    Messege,
    AddProfile,
  },
  data: () => ({
    isReload: false,
  }),

}
</script>
