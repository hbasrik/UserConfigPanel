const admin = require('firebase-admin');
const serviceAccount = require('./adminpanel-b75bd-firebase-adminsdk-zlc2f-8e98b44bb5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://adminpanel-b75bd.firebaseio.com' // Make sure this URL matches your Firebase project
});

module.exports = admin; // Export the initialized admin instance
