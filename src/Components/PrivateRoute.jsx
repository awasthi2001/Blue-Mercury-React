import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export const Privateroutes = ({children}) => {
  // console.log(children);
  
  const {isAuth} = useContext(AuthContext);
  // console.log(isAuth
  useEffect(()=>{
    if(!isAuth.loggedin){
      return  <Navigate to='/login'/>
     }
  },)

return children;
}
