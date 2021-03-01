import React, { useState } from 'react';
import './PersonalDeatails.css';
import { Button } from '@material-ui/core';
import PopUp from '../All/PopUp';
import TextField from '@material-ui/core/TextField';

export default function ClientPage(props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    // const [favoriteCountry,setFavoriteCountry] = useState("");


    const editClient = () => {
        const body = { phone: phone, email: email };
        fetch(`https://localhost:3000/api/users/${props.user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenEdit(false);
                setPhone("")
                setEmail("")
            });
    }
    const isClient = () => {
        return (
            <>
                <div><Button style={{ marginBottom: '5%' }} variant="contained" color="primary" onClick={() => setOpenEdit(true)}>Edit</Button></div>
                <PopUp onSubmit={editClient} title={"Edit User"} open={openEdit} closePopup={() => setOpenEdit(false)} sendBtn={true} showBt={true}>
                    <TextField label="Phone" value={phone} onChange={e => setPhone(e.target.value)} fullWidth required />
                    <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required />
                </PopUp>
            </>
        )
    }
    const isManufacture = () => {
        return (
            <>
            </>
        )
    }
    return (
        <div className={"personalDeatails"}>
            <img src={props.imageURL} alt="profile" />
            <h1>{props.FirstName} {props.LastName}</h1>
            {/* <h3>{props.JobTitle}</h3> */}
            <div className={"line"}></div>
            <p>Phone</p>
            <span>{props.phone}</span>
            <p>Email</p>
            <span>{props.email}</span>
            {props.isRenter ? isClient() : isManufacture()}
        </div>
    );
}

