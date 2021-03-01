import React, { useEffect, useState } from 'react';
import './ClientPage.css';
import PrivatePage from '../All/PrivatePage';
import { useCookies } from "react-cookie";

export default function RenterPage(props) {
  const [clientShiiping, setClientShiiping] = useState("");
  const [user, setUser] = useState("");
  const [wantedWine, setWantedWine] = useState([]);
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    fetch(`https://wine-for-all.herokuapp.com/api/users/${cookies.user.id}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'user': cookies.user.id
      }
    })
      .then(response => response.json())
      .then(result => {
        setUser(result)
        console.log(result)
        result.favorite.forEach((wine) => {
          fetch(`https://wine-for-all.herokuapp.com/api/wines/${wine}`, { withCredentials: true, credentials: 'include' })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              setWantedWine(prevArray => [...prevArray, result])
            })
        })

      })
  }, [])
  // useEffect(() => {
  //   fetch(`https://wine-for-all.herokuapp.com/api/wines?clientID=3`, { withCredentials: true, credentials: 'include' })
  //     .then(response => response.json())
  //     .then(result => {
  //       setWantedWine(result)
  //     })
  // }, [])
  // useEffect(() => {
  //   fetch(`https://wine-for-all.herokuapp.com/api/shippings?clientID=3`, { withCredentials: true, credentials: 'include' })
  //     .then(response => response.json())
  //     .then(result => {
  //       setClientShiiping(result)
  //     })
  // }, [])

  return (
    <div className={"clientMainPage"}>
      <PrivatePage label1={"In progress"}
        user={user} firstHead={"Prsonal deatails"} isClient={true} shipping={clientShiiping} wines={wantedWine} />
    </div>
  );
}