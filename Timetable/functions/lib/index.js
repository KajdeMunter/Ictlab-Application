"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.newNotification = functions.firestore
    .document('notifications/{notificationId}')
    .onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    const data = event.data();
    const userId = data.userId;
    const body = data.body;
    const title = data.title;
    // Notification content
    const payload = {
        notification: {
            title: `${title}`,
            body: `${body}`
        }
    };
    // ref to the device collection for the user
    const db = admin.firestore();
    const devicesRef = db.collection('devices').where('userId', '==', userId);
    // get users tokens and send notifications
    const devices = yield devicesRef.get();
    // empty array for each of the tokens that we want to send a message to
    const tokens = [];
    // loop over documents
    devices.forEach(result => {
        const token = result.data().token;
        tokens.push(token);
    });
    // send notifications
    return admin.messaging().sendToDevice(tokens, payload);
}));
//# sourceMappingURL=index.js.map