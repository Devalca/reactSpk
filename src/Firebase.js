import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCkh6SP6iiDv1Z7GJT5hIgNdSD-qyYfRbI",
    authDomain: "reactspk-37eea.firebaseapp.com",
    databaseURL: "https://reactspk-37eea.firebaseio.com",
    projectId: "reactspk-37eea",
    storageBucket: "reactspk-37eea.appspot.com",
    messagingSenderId: "782176793913",
    appId: "1:782176793913:web:cc35fdca196d091554a4e8"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;