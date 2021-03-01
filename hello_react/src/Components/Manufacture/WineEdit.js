import React, { useEffect, useState } from 'react';
import './AddWine.css';
import PopUp from '../All/PopUp';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { Button } from '@material-ui/core';
import moment from 'moment';

export default function AddWine(props) {

    const [wineName, setWineName] = useState("");
    const [year, setYear] = useState("");
    const [kind, setKind] = useState("");
    const [color, setColor] = useState("");
    const [winePrice, setWinePrice] = useState("");
    const [foodPairing, setFoodPairing] = useState("");
    const [description, setDescription] = useState("");
    const [manufacture, setManufacture] = useState("");
    const [clientID, setClientID] = useState("");
    const [winePic, setWinePic] = useState("");
    const [wine, setWine] = useState("");
    const [add, setOpenAdd] = useState(false);


    useEffect(() => {
        fetch(`https://localhost:3000/api/wines/${props.idWine}`)
            .then(response => response.json())
            .then(result => {
                setWine(result)
            })
    }, [props.idWine, wine])

    const PriceValidation = () => {
        let errors = [];
        if (winePrice !== "") {
            if (isNaN(winePrice)) {
                errors.push("Price must to be numbers. \n")
            }
        }
        if (errors.length > 0)
            alert(errors)
        else
            return true
    }
    const editWine = () => {
        if (PriceValidation()) {
            const body = { wineName: wineName, year: year, kind: kind, color: color, winePrice: winePrice, foodPairing: foodPairing, description: description, manufacture: manufacture, winePic: winePic };
            fetch(`https://localhost:3000/api/wines/${wine.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(result => {
                    setOpenAdd(false);
                    setEditWine(result);
                    setWineName("");
                    setYear("");
                    setKind("");
                    setColor("");
                    setWinePrice("");
                    setFoodPairing("");
                    setDescription("");
                    setManufacture("");
                    setWinePic("");
                })
        }
    }
    return (
        <div className={"addWineContainer"}>
            <div >
                <Button variant="contained" color="primary" className={"addButWine"} onClick={() => setOpenAdd(true)}>Edit Wine</Button>
                <PopUp onSubmit={addWine} title={"Add Wine"} open={add} closePopup={() => setOpenAdd(false)} sendBtn={true} showBt={true}>
                    <div className={"addWineForm"}>
                        <TextField label="Wine Name" onChange={(event) => setWineName(event.target.value)} value={wineName} fullWidth required />
                        <TextField label="Year" onChange={(event) => setYear(event.target.value)} value={year} fullWidth required />
                        <FormControl fullWidth >
                            <InputLabel htmlFor="age-native-simple">Kind</InputLabel>
                            <Select native value={kind} onChange={e => setKind(e.target.value)}>
                                <option aria-label="None" value="kind" />
                                <option>Cabernet Sauvignon</option>
                                <option>Syrah</option>
                                <option>Pinot Noir</option>
                                <option>Chardonnay</option>
                                <option>Sauvignon Blanc</option>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="age-native-simple">Color</InputLabel>
                            <Select native value={color} onChange={e => setColor(e.target.value)}>
                                <option aria-label="None" value="color" />
                                <option>Red</option>
                                <option>White</option>
                                <option>Rose</option>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="age-native-simple">Suits for</InputLabel>
                            <Select native value={foodPairing} onChange={e => setFoodPairing(e.target.value)}>
                                <option aria-label="None" value="foodPairing" />
                                <option>Fish</option>
                                <option>Sushi</option>
                                <option>Steak</option>
                                <option>Italian</option>
                                <option>Desserts</option>
                            </Select>
                        </FormControl>
                        <TextField label="Wine Price" onChange={(event) => setWinePrice(event.target.value)} value={winePrice} fullWidth />
                        <TextField id="outlined-multiline-static" label="Description" multiline rows={4} onChange={(event) => setDescription(event.target.value)} value={description} variant="outlined" fullWidth />
                        <TextField label="Manufacture" onChange={(event) => setManufacture(event.target.value)} value={manufacture} fullWidth />
                        <TextField label="Wine Picture Url" onChange={(event) => setWinePic(event.target.value)} value={winePic} name="winePic" fullWidth />
                    </div>
                </PopUp>
            </div>
        </div>
    );
}