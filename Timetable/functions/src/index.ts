import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.newNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async event => {

    const data = event.data();
 
    const userId = data.userId;
    const body = data.body;
    const title = data.title

    // Notification content
    const payload = {
      notification: {
        title: `${title}`,
        body: `${body}`
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)

    // get users tokens and send notifications
    const devices = await devicesRef.get()

    // empty array for each of the tokens that we want to send a message to
    const tokens = []

    // loop over documents
    devices.forEach(result => {
      const token = result.data().token;
      tokens.push(token)
    })

    // send notifications
    return admin.messaging().sendToDevice(tokens, payload);

  });

