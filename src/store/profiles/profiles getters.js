export default  {
    isProfileGreaterThenX: state => x =>
        state.profiles.filter(profile => profile.date < x)
}