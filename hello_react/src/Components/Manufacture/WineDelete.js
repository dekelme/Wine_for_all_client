import React, {useEffect, useState} from 'react';
import './AddWine.css';
import { Button } from '@material-ui/core';

export default function WineDelete(props) {
    const [wine, setWine] = useState("");

	useEffect(() => {
		fetch(`https://wine-for-all.herokuapp.com/api/wines/${props.idWine}`)
		.then(response => response.json())
		.then(result =>  {
			setWine(result)
		})  
	},[props.idWine])
    const deleteWine = () => {
		fetch(`https://wine-for-all.herokuapp.com/api/wines/${wine.id}`, {
		method: 'DELETE',
		})
		.then(response => response.json())
		.then(result => {
			window.location.reload();
		})

	}
	return (
		<div className={"deleteWineContainer"}>
			<Button variant="contained" style={{ backgroundColor: '#B98E52' }} className={"but"} onClick={deleteWine}>Delete</Button>
	</div>
  );
}