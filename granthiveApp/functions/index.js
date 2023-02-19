const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');
//import { doc, getDoc } from "firebase/firestore";



const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');




var serviceAccount = require("./grant-2570b-firebase-adminsdk-n7mpc-e36fc98cf7.json");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://grant-2570b-default-rtdb.firebaseio.com"
});

async function getFirestore() {
    const firestore_con = await admin.firestore();
    const grantCollectionRef = firestore_con.collection('grantCollection');
    const snapshot = await grantCollectionRef.where('citizen', '==', 'Yes').get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
    }
    const result = [];
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        result.push(doc.data());
    });  
    return result;
}

app.get('/', async (request, response) => {
    const db_result = await getFirestore();
    response.render('index', { db_result });
});

exports.app = functions.https.onRequest(app);


async function getFirestore(){
    const firestore_con  = await admin.firestore();
    const writeResult = firestore_con.collection('grantCollection').doc('grant1').get().then(doc => {
    if (!doc.exists) { console.log('No such document!'); }
    else {return doc.data();}})
    .catch(err => { console.log('Error getting document', err);});
    return writeResult
}

app.get('/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('index',{db_result});
    });
exports.app = functions.https.onRequest(app);

async function insertFormData(request){
    const writeResult = await admin.firestore().collection('form_data').add({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    age: request.body.age,
    uscitizen: request.body.uscitizen,
    numPeople: request.body.numPeople,
    veteran: request.body.veteran,
    yearlyIncome: request.body.yearlyIncome
    })
    .then(function() {console.log("Document successfully written!");})
    .catch(function(error) {console.error("Error writing document: ", error);});
}
app.post('/insert_data',async (request,response) =>{
    var insert = await insertFormData(request);
    // response.sendStatus(200);
    response.status(200).send('Data has been collected. Return to the previous page for your results');
});


//grant-2570b-firebase-adminsdk-n7mpc-e36fc98cf7


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
