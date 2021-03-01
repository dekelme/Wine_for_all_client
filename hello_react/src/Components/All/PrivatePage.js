import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PopUp from '../All/PopUp';
import TextField from '@material-ui/core/TextField';
import Footer from '../All/Footer';
import NavBar from '../All/NavBar';
import ShippingList from '../Shipping/ShippingList';
import WineDeatails from '../Wine/WineDeatails';
import PrsonalDeatails from '../All/PersonalDeatails';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import MessageIcon from '@material-ui/icons/Message';
import HouseIcon from '@material-ui/icons/House';
import AddWine from '../Manufacture/AddWine';
import './PrivatePage.css';
import WineTable from '../Manufacture/WineTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other} >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function PrivatePage(props) {
  const theme = useTheme();
  const [orderPrice, setOrderPrice] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [manufctureID, setManufctureID] = useState("");
  const [clientID, setClientID] = useState("");
  const [openShipping, setOpenShipping] = useState(false);
  const [openWine, setOpenWine] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const addShipping = () => {
    const body = { orderPrice: orderPrice, orderDate: orderDate, shippingAddress: shippingAddress, shippingPrice: shippingPrice, manufctureID: manufctureID, clientID: clientID };
    fetch(`https://wine-for-all.herokuapp.com/api/shippings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        setOpenShipping(false)
        setOrderPrice("")
        setOrderDate("")
        setShippingAddress("")
        setShippingPrice("")
        setManufctureID("")
        setClientID("")
        setOpenWine(false)

      });
  }
  const giveUpOnWine = (id) => {
    console.log(id)
    const body = { wine: id }
    fetch(`https://wine-for-all.herokuapp.com/api/users/${props.user.id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        let path = '/Client'
        alert("Tha Wine is deleted from your favorite successfully!")
        window.location.reload();
      })
  };
  const tabs = () => {
    if (props.isClient) {
      return (
        <div className={"currentContainer"}>
          <div className={"curStatus"}>
            <h1>Date Of Birth</h1>
            <p> {props.user.dateOfBirth} </p>
          </div>
          <div className={"curBud"}>
            <h1>shipping Address</h1>
            <p>{props.user.city}, {props.user.street} </p>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <AddWine idManufacture={props.user.id} className={"addWineBig"} />
        </div>
      )
    }
  }
  const wantedWine = () => {
    if (!props.wines) {
      return (
        <Stepper active orientation="vertical">
          <Step >
            <StepLabel style={{ fontFamily: 'Lato' }}></StepLabel>
            <StepContent>
              <Typography style={{ fontFamily: 'Lato' }}>You don't have any Wine in favorite</Typography>
            </StepContent>
          </Step>
        </Stepper>
      )
    }
    else {
    return (
      <>
      <h2>My Favorite</h2>
      <WineTable WineList={props.wines} client={true} giveUpOnWine={giveUpOnWine} />
      
    </>
    )
  }
}

const label1 = () => {
  if (props.isClient) {
    return (
      wantedWine()
    )
  }
  else {
    return (
      <div className={"manufactureContainer"}>
        <div className={"currentContainerRow"}>
          <div className={"prsonalDetmanufacture"}>
            <MailOutlineIcon style={{ width: '20%', height: '20%', margin: '5%' }} />
            <h3>My email</h3>
            <p>{props.user.email}</p>
          </div>
          <div className={"prsonalDetmanufacture"}>
            <PhoneIcon style={{ width: '30%', height: '30%', margin: '5%' }} />
            <h3>My phone</h3>
            <p>{props.user.phone}</p>
          </div>
        </div>
        <div className={"currentContainerRow"}>
          <div className={"prsonalDetmanufacture"}>
            <h3>Founded</h3>
            <p>{props.user.founded}</p>
           
          </div>
        </div>
      </div>
    )
  }
}
const label2 = () => {
  if (props.isClient) {
    return (
      <>

        {/* <Map asset = {props.wantedAsset} />
        {props.wantedAsset ? <div><p>Here you can see map of your wanted country, enjoy!</p></div> : <div><p>There is not map yet, find your next asset to see one</p></div>} */}
      </>
    )
  }
  else {
    return (
      <>
        <h2>My Wines</h2>
        <WineTable WineList={props.wines} />
        {/* <WinesTable winesList={props.wines} idManufacture={props.user.id}/> */}
        {/* <AddWine idManufacture={props.user.id} /> */}
      </>
    )
  }
}

const labeel3 = () => {
  if (props.isClient) {
    return (
      <>
        {/* {props.wantedAsset ? <Button variant="contained" color="primary" size="large" style={{ width: "100%" }} onClick={() => setOpenMessage(true)}>send a message to the owner</Button> : <div></div>}
          <PopUp onSubmit={addMessage} title={"Send Message"} open={openMessage} closePopup={() => setOpenMessage(false)} sendBtn={true} showBt={true}>
            <TextField type="date" value={timestamp} onChange={e => setTimestamp(e.target.value)} variant="outlined" fullWidth required />
            <TextField label="Message" value={message} multiline rows={4} onChange={e => setMessage(e.target.value)} variant="outlined" style={{marginTop:"1%"}} fullWidth required />
          </PopUp>
          <MessageList messageList={props.messages} renter={true} /> */}
      </>
    )
  }
  else {
    return (
      <>
      </>
      // <MessageList messageList={props.messages} renter={false} />
    )
  }
}
return (
  <div className={"privatePage"}>
    <NavBar />
    <div className={"privatePageConatiner"}>
      <div className={"personalDeatailsContainer"}>
        <PrsonalDeatails user={props.user} FirstName={props.user.firstName} LastName={props.user.lastName} City={props.user.city} ImageUrl={props.user.imageURL} Gender={props.user.gender} idManufacture={props.user.id} idClient={props.user.id} isClient={props.isClient} isManufacture={props.isManufacture} />
      </div>
      <div className={"containerOptions"}>
        {tabs()}
        <div className={"progressManufacture"}>
          <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" aria-label="full width tabs example">
              <Tab label={props.label1} {...a11yProps(0)} />
              <Tab label={props.label2} {...a11yProps(1)} style={{ marginLeft: '8%' }} />
              <Tab label={props.label3} {...a11yProps(2)} style={{ marginLeft: '6%' }} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <h1>{props.firstHead}</h1>
            <div className={"progress"}>
              {label1()}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {label2()}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {labeel3()}
          </TabPanel>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
}
