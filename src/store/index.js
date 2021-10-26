import vue from  'vue'
import vuex from 'vuex'
import profiles from "./profiles";

vue.use(vuex)

export default new vuex.store( {
    strict: process.env.NODE_ENV !== 'production',
    modules :{
        profiles
    }
})