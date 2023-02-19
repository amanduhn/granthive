const functions = require("firebase-functions");
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

var serviceAccount = require("./granthive-a5a93-firebase-adminsdk-rxmnr-c6cd03a729.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://granthive-a5a93.firebaseio.com"
});

// async function getFirestore(){
//     const firestore_con  = await admin.firestore();
//     const writeResult = firestore_con.collection('users').doc('user1').get().then(doc => {
//     if (!doc.exists) { console.log('No such document!'); }
//     else {return doc.data();}})
//     .catch(err => { console.log('Error getting document', err);});
//     return writeResult
// }

// app.get('/',async (request,response) =>{
//     var db_result = await getFirestore();
//     response.render('index',{db_result});
// });
// exports.app = functions.https.onRequest(app);

// async function insertFormData(request){
//     const writeResult = await admin.firestore().collection('users').add({
//     firstname: request.body.firstName,
//     lastname: request.body.lastName
//     })
//     .then(function() {console.log("Document successfully written!");})
//     .catch(function(error) {console.error("Error writing document: ", error);});
// }

// app.post('/insert_data',async (request,response) =>{
//     var insert = await insertFormData(request);
//     response.sendStatus(200);
// });
    
    