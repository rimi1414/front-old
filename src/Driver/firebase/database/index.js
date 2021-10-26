import firebaseInstance from '../';
import profiles from "@/views/profiles";
import "firebase/storage";


function getRef(options){
   return  firebaseInstance.firebase.database().ref(`users`)
}

function get(options){
    return firebaseInstance.firebase.database().ref(`users`).once('value')
        .then(res =>{
            const arr =[];
           const map = res.val();
for(const i in map) {
        const item = map[i].data.profiles;
        item.id = i
        arr.push(item)

}
            return arr;
        })
}

function post(options){
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).set(options.profile)

}
function updateprofile(options){
    // return firebase.database().ref().update(updates);
    return firebaseInstance.firebase.database()
        .ref(`users/${window.user.uid}/data/${options.entity}`)
        .update(options.newProfile);
}

function deleteprofile(options){

    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).remove();

}

// ללא שימוש כרגע:
function getById(options){
    return firebaseInstance.firebase.database()
        .ref(`users/${window.user.uid}/data/${options.id}`).once('value')
        .then(res => {
            return res.val();
        })
}

function getmyprofile(options){
    return firebaseInstance.firebase.database().ref(`users/${options.id}/data/${options.entity}`).once('value')
        .then(res =>{
            return res.val();
        })
}
// function image(options){
//     var storageRef = firebaseInstance.firebase.storage().ref();
//     var mountainImagesRef = storageRef.child('images/mountains.jpg');
//    return  mountainImagesRef.put(`${options.pic}`)
//         .then((snapshot) => {
//         console.log('Uploaded a blob or file!') ;
//        return   snapshot.ref.getDownloadURL().then((result)=> {
//             console.log(result)
//              return result
//         });
//     });
//
// }
// function onUpload(options){
//
//
//     const storageRef=firebaseInstance.firebase.storage()
//         .ref(`${options.pic.name}`).put(`${options.pic}`);
//     storageRef.on(`state_changed`,snapshot=>{
//             this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
//         }, error=>{console.log(error.message)},
//         ()=>{this.uploadValue=100;
//             storageRef.snapshot.ref.getDownloadURL().then((url)=>{
//                 this.img1 =url;
//                 console.log(this.img1)
//             });
//         }
//     );
// }


function imge(options) {
    let reference = firebaseInstance.firebase.storage().ref();         // 2
    let task = reference.put(`${options.pic}`);               // 3
    task.then(() => {                                 // 4
        console.log('Image uploaded to the bucket!');
    }).catch((e) => console.log('uploading image error => ', e));
}


// יוזר כאשר יש לו איידי
// function getmyprofile(options){
//     return firebaseInstance.firebase.database().ref(`users/${options.id}/data/${options.entity}`).once('value')
//         .then(res =>{
//             const arr =[];
//             const map = res.val();
//             for (const key in map){
//                 const item = map[key];
//                 item.id = key
//                 arr.push(item)
//             }
//             return arr;
//         })
// }
//
// של יוזרס:
// function get(options){
//     return firebaseInstance.firebase.database().ref(`users`).once('value')
//         .then(res =>{
//             const arr =[];
//             const map = res.val();
//             for(const i in map) {
//                 for (const key in map[i].data.profiles) {
//                     const item = map[i].data.profiles;
//                     item.id = i
//                     arr.push(item)
//                 }
//             }
//             return arr;
//         })
// }

// function getmyprofile(options){
//     return firebaseInstance.firebase.database().ref(`users`).once('value')
//         .then(res =>{
//             const arr =[];
//             const map = res.val();
//             for(const i in map) {
//                 for (const key in map[i].data.profiles) {
//                     const item = map[i].data.profiles[key];
//                     item.id = i
//                     arr.push(item)
//                 }
//             }
//             return arr;
//         })
// }


export default {
    get,
    post,
    getmyprofile,
    updateprofile,
    deleteprofile,
    getRef,
    getById
    // image,
    // onUpload
}

// onUpload(){
//
//     this.img1=null;
//     const storageRef=firebaseInstance.firebase.storage()
//         .ref(`${window.user.uid}`);
//     var mountainImagesRef = storageRef.child('images/mountains.jpg');
//     return  mountainImagesRef.put(this.imageData)
//         .then((snapshot) => {
//             console.log('Uploaded a blob or file!') ;
//             return   snapshot.ref.getDownloadURL().then((result)=> {
//                 console.log(result)
//                 this.editedProfile.pic = result
//             });
//         });
//
//
// },