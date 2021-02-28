import React, {useEffect, useState} from 'react';
import './ClientPage.css';
import PrivatePage from '../All/PrivatePage';
import {useCookies} from "react-cookie";

export default function RenterPage(props) {
  const [clientShiiping, setClientShiiping] = useState("");
  const [user,setUser] = useState("");
  const [wantedWine,setWantedWine] = useState("");
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    fetch(`https://localhost:3000/api/users/${cookies.user.id}`, { withCredentials: true, credentials: 'include' })
      .then(response => response.json())
      .then(result =>  {
          setUser(result)
      })    
  }, [cookies.user.id])
  useEffect(() => {
    fetch(`https://localhost:3000/api/wines?clientID=${cookies.user.id}`, { withCredentials: true, credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        setWantedWine(result)
    })
  }, [cookies.user.id])
  useEffect(() => {
    fetch(`https://localhost:3000/api/shippings?clientID=${cookies.user.id}`, { withCredentials: true, credentials: 'include' })
      .then(response => response.json())
      .then(result =>  {
        setClientShiiping(result)
      })
  }, [cookies.user.id])
  
  return (
      <div className={"clientMainPage"}>
        <PrivatePage label1={"In progress"} label2={"Wine place deatils"} label3={"Shipping"} 
        user={user} firstHead={"Prsonal deatails"} isClient={true} shipping={clientShiiping} wantedWine={wantedWine[0]} />
    </div>
  );
}