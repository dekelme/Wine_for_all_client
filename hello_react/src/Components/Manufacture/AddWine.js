import React, { useState } from 'react';
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
    const [winePic, setWinePic] = useState("");
    const [add, setOpenAdd] = useState(false);

    const wineValidation = () => {
        let errors = [];
        if (wineName === "")
            errors.push("wine Name is requierd, please make sure the field is full. \n")
        if (year === "")
            errors.push("year is requierd, please make sure the field is full. \n")
        if (kind === "")
            errors.push("kind is requierd, please make sure the field is full. \n")
        if (isNaN(winePrice))
            errors.push("Price must to be numbers. \n")
        if (color === "")
            errors.push("color is requierd, please make sure the field is full. \n")
        if (foodPairing === "")
            errors.push("foodPairing is requierd, please make sure the field is full. \n")
        if (manufacture === "")
            errors.push("kind is requierd, please make sure the field is full. \n")
        if (winePic === "")
            errors.push("wine url Picture is requierd, please make sure the field is full. \n")
        if (errors.length > 0)
            alert(errors)
        else
            return true
    }
    const addWine = () => {
        if (wineValidation()) {
            const body = { wineName: wineName, year: year, kind: kind, color: color, winePrice: winePrice, foodPairing: foodPairing, description: description, manufacture: manufacture, winePic: winePic};
            fetch(`https://localhost:3000/api/wines`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(result => {
                    setOpenAdd(false);
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
        <div >
            <Button variant="contained" color="primary" className={"addButWine"} onClick={() => setOpenAdd(true)}>Add new Wine</Button>
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
                        <InputLabel htmlFor="age-native-simple">Color</InputLabel>
                        <Select native value={color} onChange={e => setColor(e.target.value)}>
                            <option aria-label="None" value="color" />
                            <option>Red</option>
                            <option>White</option>
                            <option>Rose</option>
                        </Select>
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
    );
}