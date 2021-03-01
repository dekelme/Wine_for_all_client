import React from 'react';
import WineTab from './WineTab';
import './WineTable.css';

export default function WineTable(props) {
    const eachItem = (item) => {
        return (
            <WineTab id={item.id} item={item} idManufacture={props.idManufacture} idClient={props.idClient}> 
                {props.children}
            </WineTab>
        )
    }
    return (
        <div className={"wineTable"}>
            { props.WineList.map(eachItem) }
        </div>
    )
}