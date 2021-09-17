import { USER, USER_DOCUMENTS, CANVAS_DATA } from "../constants/index";
import firebase from '../../firebase-config';
require("firebase/firestore");

export const fetchUser = () => {
    return ((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists) {
                dispatch({
                    type: USER,
                    currentUser: snapshot.data()
                })
            }
        })
    })
};
export const fetchUserDocuments = () => {
    return ((dispatch) => {
        firebase.firestore()
        .collection("documents")
        .doc(firebase.auth().currentUser.uid)
        .collection("userDocs")
        .orderBy("creation", "asc")
        .get()
        .then((doc) => {
            let docs = doc.docs.map((documents) => {
                var data = documents.data();
                var id = documents.id;
                return { id, ...data }
            });
            // for(let i = 0; i < docs.length; i++) {
            //     dispatch(fetchCanvasData(docs[i].id))
            // }
            dispatch({
                type: USER_DOCUMENTS,
                userDocs: docs
            })
        })
    })
}

// export const fetchCanvasData = (docId) => {
//     return ((dispatch) => {
//         firebase.firestore()
//         .collection("documents")
//         .doc(firebase.auth().currentUser.uid)
//         .collection("userDocs")
//         .doc(docId)
//         .collection("imports")
//         .onSnapshot((snapshot) => {
//             let cd = snapshot.docs.map((canvi) => {
//                 var dat = canvi.data();
//                 return dat;
//             })
//             // console.log(cd)
//             for(let i = 0; i < cd.length; i++) {
//                 if(cd.lenth === 0 || cd[i] === "" || cd[i] === []) {
//                     console.log("no??")
//                 } else {
//                     dispatch({
//                         type: CANVAS_DATA,
//                         canvasData: cd[i],
//                     })
//                 }
//             }
//             // dispatch({
//             //     type: CANVAS_DATA,
//             //     canvasData: cd
//             // })
//         })

//     })
// }