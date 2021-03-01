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
    fetch(`https://localhost:3000/api/users/1`, { withCredentials: true, credentials: 'include' })
      .then(response => response.json())
      .then(result =>  {
          setUser(result)
      })    
  }, [])
  useEffect(() => {
    fetch(`https://localhost:3000/api/wines?clientID=1`, { withCredentials: true, credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        setWantedWine(result)
    })
  }, [])
  useEffect(() => {
    fetch(`https://localhost:3000/api/shippings?clientID=1`, { withCredentials: true, credentials: 'include' })
      .then(response => response.json())
      .then(result =>  {
        setClientShiiping(result)
      })
  }, [])
  
  return (
      <div className={"clientMainPage"}>
        <PrivatePage label1={"In progress"} label2={"Wine place deatils"} label3={"Shipping"} 
        user={user} firstHead={"Prsonal deatails"} isClient={true} shipping={clientShiiping} wantedWine={wantedWine[0]} />
    </div>
  );
}