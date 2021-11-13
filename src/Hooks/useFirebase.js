import { useEffect, useState } from "react";
import initializeFirebase from "../pages/authentication/firebase/Firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";


//initialize Firebase app
initializeFirebase();

////////// useFirebase hook

const useFirebase = () => {

    /// all state
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const [admin, setAdmin] = useState(false);


    ///// provider and uthentication function calling from firebase
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    //////////////////// Register user and Posting user data to the database
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                setErrorCode('');
                const newUser = { email, displayName: name };
                setUser(newUser);

                // save user to the database
                saveUser(email, name, 'POST');
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

    //Login user function
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

    //Google pop up login and UPSERT operation of server to save the information of the user to the database
    const signWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT')
                setAuthError('');
                setErrorCode('');
                const destination = location?.state?.from || '/';
                history.replace(destination);
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

    // check Admin or not for making new admin
    useEffect(() => {
        // fetch(`http://localhost:5000/users/${user.email}`)
        fetch(`https://aqueous-mountain-11815.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    ///// log out function 
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

    // save user while registraton to the database
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        // fetch('http://localhost:5000/users', {
        fetch('https://aqueous-mountain-11815.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    //////// returning all function to the context
    return {
        user,
        admin,
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