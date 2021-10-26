import database from '../../Driver/firebase/database/index'

export default {
    getProflies: async ({commit}) => {

        const profiles = await database.get({entity: 'profiles'});
        commit('setProfiles', profiles)
    },

    deleteProfile: async ({state, commit}) => {

        await database.deleteprofile({entity: 'profiles', id: state.editedProfileId});

        const profileId = state.editedProfileId;

        commit('restEditedProfileId')

        commit('deleteProfile', profileId)
    },

    updateProfile: async ({state, commit}) => {
        const profile = {}
        Object.assign(profile, state.editedProfile)
        profile.id = state.editedProfileId;

        // save in DB
        await database.updateprofile({entity: 'profiles' , id: profile.editedProfileId, profile})
   // save in store
        commit('resetEditedProfile')
        commit('resetEditedProfileId')

        commit('editProfile', profile)

    },
insertProfile: async ({state , commit}) =>{

        const profile ={};
        Object.assign(profile, state.editedProfile)

    // save in DB
    profile.id = await database.post({entity: 'profiles', profile})

    // save in storeg
    commit('restEditedProfile')
    commit('insertProfile', profile)

},
    setEditProfileById: async ({state , commit}) => {
        let profile ={};
        if (state.profiles.length && state.profiles.find(profile => profile.id === state.editedProfileId)){
            profile = state.profiles.find(profile => profile.id === state.editedProfileId);
        }else {
            profile = await database.getById({entity: 'profiles', id: state.editedProfileId})

        }
        commit('setEditedProfile' , profile);
}



}