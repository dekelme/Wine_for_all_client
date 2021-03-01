import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import WineDeatails from '../Wine/WineDeatails';
import PopUp from '../All/PopUp';
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";

export default function WinePage(props) {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [wine, setWine] = useState("");
  const [cookies] = useCookies(['user']);

  // useEffect(() => {
  //   fetch(`https://wine-for-all.herokuapp.com/api/wine?id=${wine.id}`, {
  //     credentials: 'include',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'user': cookies.user.id
  //     }
  // })
  //     .then(response => response.json())
  //     .then(result =>  {
  //       setWine(result)
  //     })    
  // },[wine])
  const addToFav = () => {
    const body = {wineAdd: props.item.id}
    fetch(`https://wine-for-all.herokuapp.com/api/users/${cookies.user.id}`,{
      method: 'PUT',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'user': cookies.user.id
      },
      body: JSON.stringify(body),
  })
        .then(response => response.json())
        .then(result => { 
          alert("Wine added to Favorite")
        })
    };
    const haveWine = () => {
      if(wine.length < 0) {
        return (
          <Button variant="outlined"  style={{margin:'2%'}} onClick={() => addToFav()} disabled>Add to Favorite</Button>
        )
      }
      else {
        return (
          <Button variant="outlined"  style={{margin:'2%'}} onClick={() => addToFav()}>Add to Favorite</Button>
        )
      }
    }
  return (
    <div>
      <div className={"buttonsWines"}>
        <Button variant="outlined"  onClick={() => setOpen(true)} style={{margin:'2%'}}>See More</Button>
        {haveWine()}
      </div>
        <PopUp onSubmit={() => setOpen(false)} WantWine={true} title={props.item.name} open={open} closePopup={() => setOpen(false)} showBt={true}>
            <WineDeatails item={props.item} />
        </PopUp>
    </div>
  );
}