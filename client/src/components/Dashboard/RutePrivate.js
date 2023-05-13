import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function RutePrivate() {

  
    // const [ user, setUser]= useState(null)


    // const getUser=async()=>{
    //   try {
    //     const data= await axios.get('http://localhost:3001/user')
    //     setUser(data.data)
    
    
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    //   useEffect(()=>{
    //    getUser()
    //  },[])


     const datos = window.localStorage.getItem("user-log");
  const Value = JSON.parse(datos)?.data_user;
    console.log('bbbbbbbbbbbb',Value.admin)


  if (Value.rol!=='admin') {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}