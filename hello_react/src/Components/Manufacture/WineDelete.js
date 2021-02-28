import React, {useEffect, useState} from 'react';
import './AddWine.css';
import { Button } from '@material-ui/core';

export default function WineDelete(props) {
    const [wine, setWine] = useState("");

	useEffect(() => {
		fetch(`https://localhost:3000/api/wines/${props.idWine}`)
		.then(response => response.json())
		.then(result =>  {
			setWine(result)
		})  
	},[props.idWine])
    const deleteWine = () => {
		fetch(`https://localhost:3000/api/wine/${wine.id}`, {
		method: 'DELETE',
		})
		.then(response => response.json())
		.then(result => {})
	}
	return (
		<div className={"deleteWineContainer"}>
			<Button variant="contained" color="primary" className={"but"} onClick={deleteWine}>Delete</Button>
	</div>
  );
}