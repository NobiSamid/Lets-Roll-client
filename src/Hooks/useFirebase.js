import { useEffect, useState } from "react";
import initializeFirebase from "../pages/authentication/firebase/Firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";


//initialize Firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [errorCode, setErrorCode] = useState('');


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Register user
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                setErrorCode('');
                const newUser = { email, displayName: name};
                setUser(newUser);

                // send name to fire base after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                  }).then(() => {
                      
                  }).catch((error) => {
                  
                });

                history.replace('/');
            })
            .catch((error) => {
                setErrorCode(error.code);
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //Login user
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
                setErrorCode('');
            })
            .catch((error) => {
                setErrorCode(error.code);
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //Google pop up login
    const signWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setAuthError('');
                setErrorCode('');
            }).catch((error) => {
                setErrorCode(error.code);
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
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
            .finally(() => setIsLoading(false));

    }

    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        signWithGoogle,
        authError,
        errorCode,
        logOut
    }
}

export default useFirebase;