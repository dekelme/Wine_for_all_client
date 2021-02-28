import {Route} from 'react-router-dom';
import ClientSearch from "../Components/WineSearch/ClientSearch";
import SignIn from '../Components/Register/SignIn';
import SignInDeatails from '../Components/Register/SignInDeatails';
import ManufacturePage from '../Components/Manufacture/ManufacturePage';
import HomePage from '../Components/HomePage/HomePage';
import Client from '../Components/Client/ClientPage';
import PrivatePage from '../Components/All/PrivatePage';
import UserRouter from "./userRouter";

const ReactRouter = () => {
    return (
        <>
            <Route exact path="/" component={SignIn}/>
            <UserRouter exact path="/HomePage" component={HomePage}/>
            <UserRouter exact path="/ClientSearch" component={ClientSearch}/>
            <UserRouter path="/SignInDeatails" component={SignInDeatails} />
            <UserRouter path="/ManufacturePage" component={ManufacturePage} />
            <UserRouter exact path ="/Client" component={Client} />
            <UserRouter exact path = "PrivatePage" component={PrivatePage} />
        </>
    )
}

export default ReactRouter