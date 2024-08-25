const admin = require('firebase-admin');
const serviceAccount = require('./adminpanel-b75bd-firebase-adminsdk-zlc2f-9ce2c78ed6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://adminpanel-b75bd.firebaseio.com'
});

const db = admin.firestore();

module.exports = db;
