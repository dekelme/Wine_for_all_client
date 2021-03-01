import {Route} from 'react-router-dom';
import ClientSearch from "../Components/WineSearch/ClientSearch";
import Signin from '../Components/Register/Signin';
import SignInDeatails from '../Components/Register/SignInDeatails';
import ManufacturePage from '../Components/Manufacture/ManufacturePage';
import HomePage from '../Components/HomePage/HomePage';
import Client from '../Components/Client/ClientPage';
import PrivatePage from '../Components/All/PrivatePage';
import UserRouter from "./userRouter";

const ReactRouter = () => {
    return (
        <>
            {/* <Route exact path="/" component={Signin}/> */}
            <Route exact path="/HomePage" component={HomePage}/>
            <Route exact path="/ClientSearch" component={ClientSearch}/>
            <Route path="/SignInDeatails" component={SignInDeatails} />
            <Route path="/ManufacturePage" component={ManufacturePage} />
            <Route exact path ="/Client" component={Client} />
            <Route exact path = "PrivatePage" component={PrivatePage} />
        </>
    )
}

export default ReactRouter