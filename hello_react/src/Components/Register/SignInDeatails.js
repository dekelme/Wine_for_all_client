import React, { useEffect, useState } from 'react';
import './SignInDeatails.css';
import Footer from '../All/Footer';
import { useCookies } from "react-cookie";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
      marginLeft: '10%',
    },

  }
}));

export default function SignInDeatils(props) {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [cookies] = useCookies(['user']);
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [zip, setZip] = useState("")
  const [founded, setFounded] = useState("")

  useEffect(() => {
    fetch(`https://wine-for-all.herokuapp.com/api/users/${cookies.user.id}`, { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        setUser(result)
      })
  }, [cookies.user.id])
  const userValidation = () => {
    let errors = [];
    if (gender === "")
      errors.push("Gender is requierd, please make sure the field is full. \n")
    if (city === "")
      errors.push("Job title is requierd, please make sure the field is full. \n")
    if (street === "")
      errors.push("Favorite country is requierd, please make sure the field is full. \n")
    if (isNaN(founded))
      errors.push("Phone must to be numbers. \n")
    if (isNaN(phone))
      errors.push("Phone must to be numbers. \n")
    if (isNaN(zip))
      errors.push("Age must to be numbers. \n")
    if (errors.length > 0)
      alert(errors)
    else
      return true
  }
  const addAdditionalInformation = () => {
    if (userValidation()) {
      const body = { phone: phone, gender: gender, dateOfBirth: dateOfBirth, city: city, street: street, zip: zip, founded: founded };
      fetch(`https://wine-for-all.herokuapp.com/api/users/${user.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(result => {
          setGender("")
          setPhone("")
          setDateOfBirth("")
          setCity("")
          setStreet("")
          setZip("")
          setFounded("")
          window.location = '/';
        });
    }
  }
  return (
    <div className={'background'}>
      <h1 className={"headSignIn"}>Wine For All</h1>
      <div className={"SignInDeatailsContainer"}>
        <p>Additional Information</p>
        <form className={classes.root} autoComplete="off">
          <div className={"colForm"}>
            <div className={"rowForm"}>
              <TextField
                id="DateOfBirth"
                label="DateOfBirth"
                name="DateOfBirth"
                value={dateOfBirth}
                onChange={e => setDateOfBirth(e.target.value)}
                fullWidth
                required
              />
              <TextField
                id="Phone"
                label="Phone"
                name="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div className={"rowForm"}>
              <TextField
                id="City"
                label="City"
                name="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
              <TextField
                id="Street"
                label="Street"
                name="Street"
                value={street}
                onChange={e => setStreet(e.target.value)}
                required
              />

            </div>
            <div className={"rowForm"}>
              <TextField
                id="Zip"
                label="Zip"
                name="Zip"
                value={zip}
                onChange={e => setZip(e.target.value)}
                required
              />
              <TextField
                id="Founded"
                label="Founded"
                name="Founded"
                value={founded}
                onChange={e => setFounded(e.target.value)}
                required
              />
            </div>
            <div className={"rowForm"}>
              <FormControl style={{ marginLeft: "10%", width: "20%" }} required>
                <InputLabel id="Gender">Gender</InputLabel>
                <Select
                  labelId="Gender"
                  id="Gender"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  fullWidth
                  required
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </form>
        <Button variant="contained" style={{backgroundColor: '#B98E52', color:' #ffffff', fontFamily: "Roboto Condensed"}} onClick={addAdditionalInformation}><p>SEND</p></Button>
      </div>
      <Footer />
    </div>
  );
}

