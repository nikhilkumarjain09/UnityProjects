// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCtF2Bo7fbhX3bbKzWrrmw0NeWbe1PnTlM",
    authDomain: "dsiapp-103c4.firebaseapp.com",
    databaseURL: "https://signeystreamingdb.firebaseio.com/",
    projectId: "dsiapp-103c4",
    storageBucket: "dsiapp-103c4.appspot.com",
    messagingSenderId: "427232668165",
    appId: "1:427232668165:web:4b5bf4516389ae643c0a6c",
    measurementId: "G-E6JL0WFB1P"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;