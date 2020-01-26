import React,{useContext, useEffect} from 'react'
import AuthContext from "../../../context/authContext/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {userAuth, getUser} = useContext(AuthContext)
    useEffect(() => {
        getUser()
        //eslint-disable-next-line
    },[])
    return (
        <Route 
            {...rest}

            render={props => 
                !userAuth ? (
                    <Redirect to='/login' />) 
                : (
                    <Component {...props} />)
                }
        />
    )
}

export default PrivateRoute
