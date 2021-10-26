
export default {
    stateProfiles: ((state, profiles)=> state.profiles = profiles),

    stateEditedProfileId: ((state , id)=> state.edtedProfileId = id),

    setEditedProfile: ((state, profile) => state.editedProfile = profile),

    resetEditedProfileId: ((state) => state.edtedProfileId = ''),

    resetEditedProfile: ((state) => {
        for (const key of state.editedProfile){
            state.editedProfile[key] = '';
        }
       delete state.editedProfile.id;
    }),

    editProfile: ((state , profile) => {
        const index = state.profiles.findIndex(p => p.id === profileId)
        state.profiles.splice(index , 1 , profile)
    }),
    deleteProfile: ((state , profileId) => {
        const  index = state.profile.findIndex(p => p.id === profile.id)
        state.profiles.splice(index, 1);
    }),
    insertProfile: ((state , profile) => {
        state.profiles.push(profile);
    })
}