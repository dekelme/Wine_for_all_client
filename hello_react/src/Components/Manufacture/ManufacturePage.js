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
      fetch(`https://wine-for-all.herokuapp.com/api/users/3`, { withCredentials: true, credentials: 'include' })
        .then(response => response.json())
        .then(result =>  {
            setUser(result)
        })    
    }, [])
    useEffect(() => {
      fetch(`https://wine-for-all.herokuapp.com/api/wines/?manufactureID=3`, { withCredentials: true, credentials: 'include' })
        .then(response => response.json())
        .then(result =>  {
            console.log(result)
            setWines(result)
        })     
    }, [])
    useEffect(() => {
      fetch(`https://wine-for-all.herokuapp.com/api/shippings/?manufactureID=3`, { withCredentials: true, credentials: 'include' })
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