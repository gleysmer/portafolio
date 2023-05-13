import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';


const Dashboard = () => {

    const [ user, setUser]= useState([])


    const getUser=async()=>{
      try {
        const data= await axios.get('http://localhost:3001/user')
        setUser(data.data)
    
    
      } catch (error) {
        console.log(error)
      }
    }
      useEffect(()=>{
       getUser()
     },[])


  return (
    <div>
        <div>
           <h2>Overview</h2> 
        </div>
        <div>
            <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>requests</th>
                </tr>
                </thead>
                <tbody>
                {user.map((el)=>(
                                <tr key={el.id}>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.requests.map((e)=>{
                                      return <ul key={e.id}>
                                        <li>{e.message}</li>
                                      </ul>
                                    })}</td>
                                   
                                </tr>
                            )
                            )}
                </tbody>
            </table>
        </div>



    </div>
    
  )
}

export default Dashboard