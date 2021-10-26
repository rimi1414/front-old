export default {
    insert :function (table , profile){

        profile.id = new Date().getTime();

        var arr = this.select(table);

        arr.push(profile);
        localStorage.setItem(table , JSON.stringify(arr));

    },
    update : function  (table, id, profile){

            //select the relevant item from arr//
            var arr = this.select(table);
            var foundIndex = this._searchIndexById(table, id)
            if (foundIndex == undefined) {
                return
            }

            for (var key in profile){
                if (profile [key]){
                    arr [foundIndex] [key] = profile[key];
                }
            }
            localStorage.setItem(table , JSON.stringify(arr));

        },
    remove: function (table, id){

        var arr= this.select(table);
        var foundIndex = this._searchIndexById(table, id);
        if (foundIndex== undefined) {
            return;
        }


        arr.splice(foundIndex, 1);

        localStorage.setItem(table , JSON.stringify(arr));
    },

    select : function (table){

            var result =  localStorage.getItem(table);
            if (result == null) {
                result = '[]';

            }
            return JSON.parse(result);
        },
    getProfileById: function (table , id) {
        var arr = this.select(table)
      return arr.find(function (profile){
            return profile.id == id;
        })

    },
    _searchIndexById:  function  (table, id){
            var arr = this.select(table)
            var foundIndex = undefined
            for (var i = 0; i < arr.length; i++){
                var profile = arr[i];
                if (profile.id == id) {
                    foundIndex = i;
                    break;
                }
            }
            return foundIndex;
        },
    ageCalculator:  function (userInput) {

        var dob = new Date(userInput);
        if (userInput == null || userInput == '' ) {
            alert("אין אפשרות להמשיך ללא תאריך")
            return false;
        } else {

            var month_diff = Date.now() - dob.getTime();

            var age_dt = new Date(month_diff);

            var year = age_dt.getUTCFullYear();

            var age = Math.abs(year - 1970);
            if (age < 18  ) {
                alert("יצירת פרופיל מגיל 18 ומעלה בלבד!")
                return false;
            }
        }
        return age
    },
    bodyCalculator(userInput){
        if (userInput < 20 ){

            return  'חטוב/ה'
        }
        if (userInput > 20 ){
            return  'שמן/ה'
        }
    }
}







