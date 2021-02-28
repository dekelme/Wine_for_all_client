import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import PopUp from '../All/PopUp';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useCookies } from "react-cookie";

export default function HomePage(props) {
    let history = useHistory()
    const [positionPopUp, setPositionPopUp] = useState(true)
    const [client, setClient] = useState(false)
    const [manufacture, setManufacture] = useState(false)
    // const [cookies, setCookie] = useCookies(['user']);
    const [user, setUser] = useState("")

    useEffect(() => {
        fetch(`https://localhost:3000/api/users/${1}`, { withCredentials: true, credentials: 'include' })
            .then(response => response.json())
            .then(result => {
                setUser(result)
            })
    }, [])

    const logout = () => {
        fetch(`https://localhost:3000/api/auth/logout`, { withCredentials: true, credentials: 'include' })
            .then(result => {
                // setCookie('user', '')
                history.push('/')
            })
            .catch(err => console.log(err))
    }

    const chooseHomePage = () => {
        if (client === true) {
            return (
                <div className={"buttons"}>
                    <Link to={{ pathname: "/ClientSearch", user: user, isRenter: true }}><Button><p>Search for Wine</p></Button></Link>
                    <Link to={{ pathname: "/Client", user: user, isRenter: true }}><Button type={"submit"}><p>My Favorite</p></Button></Link>
                </div>
            )
        }
        if (manufacture === true) {
            return (
                <div className={"buttons"}>
                    <Link to={{ pathname: "/ManufacturePage", user: user, isRenter: false }}><Button type={"submit"}><p>Manufacture page</p></Button></Link>
                </div>
            )
        }
    }
    const chooesPosition = () => {
        return (
            <PopUp open={positionPopUp} title={"Choose your position"} closePopup={() => alert("you have to choose an position")} showBt={false}>
                <div className={"buttonsChoose"} >
                    <Button variant="contained" color="primary" onClick={() => { setClient(true); setPositionPopUp(false); }}><p>I'm a Client</p></Button>
                    <Button variant="contained" color="primary" onClick={() => { setManufacture(true); setPositionPopUp(false); }}><p>I'm a Manufacture</p></Button>
                </div>
            </PopUp>

        )
    }
    return (
        <div>
            <div className={"background"}>
                <div className={'navBarHomePage'}>
                    {chooesPosition()}
                    <h1><a href="/HomePage">Wine For All</a></h1>
                    <div className={"options"}>
                        <h3><Link to={{ pathname: '/HomePage' }}>About</Link></h3>
                        <h3><Link to={{ pathname: '/RenterSearch', user: user, renter: true }}>Search</Link></h3>
                        <h3>Hello {user.firstName} {user.lastName} </h3>
                        <h3><Button onClick={logout}><h3>LOGOUT</h3></Button></h3>
                    </div>
                </div>
                <div className={"homePageContainer"}>
                    <div className={"pictures"}></div>
                    <div className={"explain"}>
                        <h1>Looking for a Wine?</h1>
                        <p>
                            Choose a wine by personal preference
                            Start by filtering initial preferences for a perfect choice
                            Learn about the wine and its notes
                            Purchase the perfect wine to complete the experience
                        </p>
                    </div>
                    {chooseHomePage()}
                </div>
            </div>
        </div>
    )
}

