import React, {useState, useEffect} from 'react';
import WineSearchForm from './WineSearchForm'
import NavBar from '../All/NavBar';
import Footer from '../All/Footer';
import './ClientSearch.css';
import {useCookies} from "react-cookie";

export default function ClienSearch(props) {
    const [cookies] = useCookies(['user']);
	const [user,setUser] = useState("")
	
	useEffect(() => {
        fetch(`https://wine-for-all.herokuapp.com/api/users/${1}`, { withCredentials: true, credentials: 'include' })
          .then(response => response.json())
          .then(result =>  {
            setUser(result)
        })
      },)
	return (
		<div className={"clientMainPage"}>
			<NavBar/>
			<p className={"clientMainPgeHeadline"}>Find Wine</p>
			<WineSearchForm user={user}/>
			<Footer />
		</div>
	);
}