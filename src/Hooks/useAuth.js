import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider";

//////////// Use auth hook to make useFirebase hook Global by contex

const useAuth = () =>{
    const auth = useContext(AuthContext);
    return auth;
}

export default useAuth;