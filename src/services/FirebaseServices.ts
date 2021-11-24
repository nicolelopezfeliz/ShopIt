import {FirebaseApp, initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set, Unsubscribe as UnsubscribeRTD} from 'firebase/database'
import {doc, getFirestore, onSnapshot, setDoc, Unsubscribe as UnsubscribeFS} from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateCurrentUser,
    User,
    UserCredential
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCUTM9M7qzYszUwggFWmq_-l1F1IBRJ9pE",
    authDomain: "shop-it-3aafb.firebaseapp.com",
    databaseURL: "https://shop-it-3aafb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shop-it-3aafb",
    storageBucket: "shop-it-3aafb.appspot.com",
    messagingSenderId: "1072258454150",
    appId: "1:1072258454150:web:c6037dde3edf444ea73707",
    measurementId: "G-MD6C315R7B"
};

//initializes app with firebase
let app: FirebaseApp;
export const fbInit = () => {
    app = initializeApp(firebaseConfig);
    // console.log(app)
}

export const setAmountOfClicks = (userId: string, amountOfClicks: number) => {
    const db = getDatabase();
    const referance = ref(db, "user/" + userId);
    set(referance, {
        userId: userId,
        amountOfClicks: amountOfClicks
    });
}

export const getData = (
    userId: string,
    callback: (amountOfClicks: number) => void
): UnsubscribeRTD => {
    const db = getDatabase();
    const referance = ref(db, "user/" + userId);
    return onValue(referance, (snapshot) => {
        try {
            callback(snapshot.val().amountOfClicks)
            //console.log(snapshot.val().amountOfClicks)
        } catch (error) {
            setAmountOfClicks(userId, 0)
        }
    })
}

export const setAmountOfClicksFireStore = (userId: string, amountOfClicks: number) => {
    const db = getFirestore();
    setDoc(doc(db, "users", userId), {amountOfClicks: amountOfClicks});
}

export const subscribeUserFS = (
    userId: string,
    callback: (amountOfClicks: number) => void
): UnsubscribeFS => {
    const db = getFirestore();
    return onSnapshot(doc(db, "users", userId), (snapshot) => {
        const data = snapshot.data() as { amountOfClicks: number }
        callback(data.amountOfClicks)
    });
}

export const registerUserFirebase = async (displayName: string, email: string, password: string): Promise<UserCredential> => {
    const auth = getAuth();
    const createUserResponse = await createUserWithEmailAndPassword(auth, email, password);
    const newUser: User = {
        ...createUserResponse.user,
        displayName: displayName,
    };

    newUser.email;

    await updateCurrentUser(auth, newUser);
    return createUserResponse;
};

export const logInToFirebase = async (email: string, password: string): Promise<UserCredential | undefined> => {
    const auth = getAuth();

    try {

        const credentialUser = await signInWithEmailAndPassword(auth, email, password);
        return credentialUser;

    } catch (error) {

        return undefined;

    }
};

export const signOutUser = async () => {
    const auth = getAuth();
    return await auth.signOut();
};
