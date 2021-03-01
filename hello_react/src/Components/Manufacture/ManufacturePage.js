import React, { useEffect, useState } from 'react';
import './ManufacturePage.css';
import PrivatePage from '../All/PrivatePage';
import { useCookies } from "react-cookie";

export default function ManufacturePage(props) {

  // const [user, setUser] = useState("");
  const [wines, setWines] = useState("");
  const [shipping, setShipping] = useState("");
  const [cookie] = useCookies(['user']);



  // useEffect(() => {
  //   console.log(cookie.id)
  //   fetch(`https://wine-for-all.herokuapp.com/api/users/${cookie.user.id}`, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'user': cookie.user.id
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       setUser(result)
  //     })
  // }, [])

  useEffect(() => {
    fetch(`https://wine-for-all.herokuapp.com/api/wines?manufactureID=${cookie.user.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'user': cookie.user.id
      }
    })
      .then(response => response.json())
      .then(result => {
        setWines(result)
      })
  }, [])
  // useEffect(() => {
  //   fetch(`https://wine-for-all.herokuapp.com/api/shippings/?manufactureID=3`, { withCredentials: true, credentials: 'include' })
  //     .then(response => response.json())
  //     .then(result =>  {
  //         setShipping(result)
  //     }) 
  // }, [])
  return (
    <div className={"manufactureMainPage"}>
      <PrivatePage label1={"General"} label2={"My Wines"}
        firstHead={"Prsonal deatails"} user={cookie.user} wines={wines} shipping={shipping} ismanufacture={true} isClient={false}
      />
    </div>
  );
}