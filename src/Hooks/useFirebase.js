import { useEffect, useState } from "react";
import initializeFirebase from "../pages/authentication/firebase/Firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


//initialize Firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [errorCode, setErrorCode] = useState('');


    const auth = getAuth();

    // Register user
    const registerUser = (email, password) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setAuthError('');
        })
        .catch((error) => {
            setErrorCode(error.code);
            setAuthError(error.message);
        })
        .finally(()=> setIsLoading(false));
    }

    //Login user
    const loginUser = (email, password) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setAuthError('');
        })
        .catch((error) => {
            setErrorCode(error.code);
            setAuthError(error.message);
        })
        .finally(()=> setIsLoading(false));
    }

    //Observer of user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [])

    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
        .then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
        .finally(()=> setIsLoading(false));

    }

    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        authError,
        errorCode,
        logOut
    }
}

export default useFirebase;