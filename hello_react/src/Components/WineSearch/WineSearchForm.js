import { Button } from '@material-ui/core';
import { useState } from 'react';
import WineList from '../Wine/WineList';
import TextField from '@material-ui/core/TextField';
import PopUp from '../All/PopUp';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './WineSearchForm.css';
import NavBar from '../All/NavBar';

export default function AssetSearchForm(props) {
    const [wineName, setWineName] = useState("");
    const [year, setYear] = useState("");
    const [kind, setKind] = useState("");
    const [color, setColor] = useState("");
    const [winePrice, setWinePrice] = useState("");  
    const [foodPairing, setFoodPairing] = useState("");
    const [manufacture, setManufacture] = useState("");
    const [wineList, setWineList] = useState([]);
    // const [openEdit, setOpenEdit] = useState(false);

    const onSubmit = () => {
        fetch(`https://wine-for-all.herokuapp.com/api/wines?wineName=${wineName}&year=${year}&kind=${kind}&color=${color}&winePrice=${winePrice}&foodPairing=${foodPairing}&manufacture=${manufacture}`)
            .then(response => response.json())
            .then(result => {
                setWineList(result)
                // setOpenEdit(false)
                setWineName("")
                setYear("")
                setKind("")
                setColor("")
                setWinePrice("")
                setFoodPairing("")
                setManufacture("")
            }
            )
    }
    return (
        <div>
            <div className={'wrapper'}>
                <div className={'background'}></div>
                <div className={'Search'}>
                    <form noValidate autoComplete="off">
                        <div><TextField className="input" label="Wine Name" onChange={(event) => setWineName(event.target.value)} value={wineName} /></div>
                        <div><TextField className="input" label="Manufacture" onChange={(event) => setManufacture(event.target.value)} value={manufacture} /></div>
                        <div className={"selectOption"}>
                            <FormControl style={{ minWidth: "100%" }} >
                                <InputLabel htmlFor="age-native-simple">Food Pairing</InputLabel>
                                <Select native value={foodPairing} onChange={e => setFoodPairing(e.target.value)}>
                                    <option aria-label="None" value="foodPairing" />
                                    <option>Fish</option>
                                    <option>Sushi</option>
                                    <option>Steak</option>
                                    <option>Italian</option>
                                    <option>Desserts</option>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={"selectOption"}>
                            <FormControl style={{ minWidth: "100%" }} >
                                <InputLabel htmlFor="age-native-simple">Wine Kind</InputLabel>
                                <Select native value={kind} onChange={e => setKind(e.target.value)}>
                                    <option aria-label="None" value="kind" />
                                    <option>Cabernet Sauvignon</option>
                                    <option>Syrah</option>
                                    <option>Pinot Noir</option>
                                    <option>Chardonnay</option>
                                    <option>Sauvignon Blanc</option>
                                </Select>
                            </FormControl>
                        </div>
                        <div><TextField className="input" label="year" onChange={(event) => setYear(event.target.value)} value={year} /></div>
                        <div className={"checkboxs"}>
                            <FormControlLabel control={<Checkbox onChange={e => setColor(e.target.value)} value={"Red"} />} label="Red" />
                            <FormControlLabel control={<Checkbox onChange={e => setColor(e.target.value)} value={"White"} />} label="White" />
                            <FormControlLabel control={<Checkbox onChange={e => setColor(e.target.value)} value={"Rose"} />} label="Rose" />
                        </div>
                        <div className={'searchbt'} ><Button variant="contained" onClick={onSubmit} value="search" >search</Button> </div>
                    </form>
                    <WineList WineList={wineList} />
                </div>
            </div>
        </div>
    )
}

