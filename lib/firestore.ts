import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIRESTORE_CONNECTION);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

export { firestore };