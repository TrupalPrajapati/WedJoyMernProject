import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


//custom hook
const useAuth = () => {
    const [auth, setauth] = useState({ isLoggedIn: false, role: "" });
    const [isLoading, setisLoading] = useState(true);


    useEffect(() => {
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");
        if (id) {
            setauth({ isLoggedIn: true, role })
        }

        setisLoading(false);

       
    }, [])

    return { ...auth, isLoading };
}

const PrivateRoutes = () => {

    const auth = useAuth();
    if(auth.isLoading){
        return <h1>Loading...</h1>
    }

    return auth.isLoggedIn ? <Outlet /> : <Navigate to="/login/eventorganizer" />
}

export default PrivateRoutes;