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
      fetch(`https://localhoost:3000/api/users/${cookies.user.id}`, { withCredentials: true, credentials: 'include' })
        .then(response => response.json())
        .then(result =>  {
            setUser(result)
        })    
    }, [cookies.user.id])
    useEffect(() => {
      fetch(`https://localhoost:3000/api/wines?manufactureId=${cookies.user.id}`, { withCredentials: true, credentials: 'include' })
        .then(response => response.json())
        .then(result =>  {
            setWines(result)
        })     
    }, [cookies.user.id])
    useEffect(() => {
      fetch(`https://localhoost:3000/api/messages?manufactureId=${cookies.user.id}`, { withCredentials: true, credentials: 'include' })
        .then(response => response.json())
        .then(result =>  {
            setShipping(result)
        }) 
    }, [cookies.user.id])
    return (
    <div className={"manufactureMainPage"}>
      <PrivatePage label1={"General"} label2={"My Wines"} label3={"Shipping"} 
      firstHead={"Prsonal deatails"} user={user} wines={wines} shipping={shipping} ismanufacture={true} 
      />
    </div>
  );
}