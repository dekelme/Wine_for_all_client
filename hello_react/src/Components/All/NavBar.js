import React from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import './NavBar.css';
import {useCookies} from "react-cookie";

export default function NavBar(props) {
    const [cookies, setCookie] = useCookies(['user']);
    let history = useHistory();

    const logout = () => {
        fetch(`https://localhost:3000/api/auth/logout`, { withCredentials: true, credentials: 'include' })
        .then(result => {
            setCookie('user', '')
            history.push('/')
        })
        .catch(err => console.log(err))
    }
    const navBarPosition = () => {
        return ( 
            <>
                <div className={"rowOptionsNavBar"}>
                    <h4><Link to={{ pathname: "/Search"}}>Search</Link></h4>
                    <h4><Link to={{ pathname: "/Client",user:props.userId}}>Hello {cookies.user.FirstName} {cookies.user.LastName}</Link></h4>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={logout} style={{color:'white', fontFamily: 'Lato',fontWeight: 'bold', fontSize: '100%'}}>
                        LOGOUT
                    </Button>
                </div> 
            </>
        )
    }
    return (
        <div className={"navBar"}>
            <h1><Link to={{ pathname: "/HomePage", userId: props.userId}} position={props.position}>Wine For All</Link></h1>
            {navBarPosition()}
        </div>
    );
}
