import React, {useEffect, useState} from 'react';
import './ManufacturePage.css';
import PrivatePage from '../All/PrivatePage';
import {useCookies} from "react-cookie";

export default function ManufacturePage(props) {

    const [user,setUser] = useState("");
    const [wines,setWines] = useState("");
    const [shipping,setShipping] = useState("");
    const [cookies] = useCookies(['user']);

    useEffect(() => {
      fetch(`http://localhost:3000/api/users/2`, { withCredentials: true, credentials: 'include' })
        .then(response => response.json())
        .then(result =>  {
            setUser(result)
        })    
    }, [])
    useEffect(() => {
      fetch(`https://localhost:3000/api/wines?manufactureId=2`, { withCredentials: true, credentials: 'include' })
        .then(response => response.json())
        .then(result =>  {
            setWines(result)
        })     
    }, [])
    useEffect(() => {
      fetch(`https://localhost:3000/api/Shipping?manufactureId=2`, { withCredentials: true, credentials: 'include' })
        .then(response => response.json())
        .then(result =>  {
            setShipping(result)
        }) 
    }, [])
    return (
    <div className={"manufactureMainPage"}>
      <PrivatePage label1={"General"} label2={"My Wines"} label3={"Shipping"} 
      firstHead={"Prsonal deatails"} user={user} wines={wines} shipping={shipping} ismanufacture={true} 
      />
    </div>
  );
}