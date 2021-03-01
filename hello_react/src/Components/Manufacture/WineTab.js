import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WineEdit from './WineEdit';
import WineDelete from './WineDelete';
import PopUp from '../All/PopUp';
import './WineTab.css';
import UserDeatails from '../All/UserDeatails';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      fontFamily: 'Lato',
      fontWeight:'bold',
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      fontFamily: 'Lato',

    },
  }));

export default function WineTab (props) {
    const [expanded, setExpanded] = useState(false);
    // const [openRenter,setOpenRenter] = useState("")

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    // const classes = useStyles();
    // const isRenterExist = () => {
    //   if(props.item.RenterId !== -1) {
    //     return  (
    //       <>
    //         <Button variant="contained" color="primary" size="small" onClick={() => setOpenRenter(true)} className={"but"} >See renter</Button>
    //         <Contract isRenter={false}/>
    //         <PopUp onSubmit={() => setOpenRenter(false)} title={"Renter deatils"} open={openRenter} closePopup={() => setOpenRenter(false)} sendBtn={false} showBt={true}>
    //             <UserDeatils asset={props.item}/> 
    //         </PopUp>
    //       </>
    //       );
    //     }
    //   }
    // const isRenterExistTop = () => {
    //   if(props.item.RenterId !== -1) {
    //     return (
    //       <>
    //         <Typography className={classes.secondaryHeading}>In proccess</Typography>
    //       </>
    //     )
    //   }
    //   else {
    //     return (
    //       <>
    //         <Typography className={classes.secondaryHeading}>Nobody showed an interest yet</Typography>
    //       </>
    //     );
    //   }
    // }
    
  return (
      <div className={"WineContainer"}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Typography className={classes.heading}>{props.item.name},{props.item.kind}</Typography>
              {/* {isRenterExistTop()} */}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <div className={"deatails"}>
              {props.item.description}
            </div>
            <div className={"deatailsHead"}>
                {props.item.foodParing}
            </div>
            <div className={"detailsHead"}>
                {props.item.winePrice} $
            </div>
            <div>
              <div className={"butRow"}>
                {isClientExist()}
                <WineEdit idWine={props.item.id} idManufacture={props.idManufacture}/>
                <WineDelete idWine={props.item.id} idManufacture={props.idManufacture}/>
              </div>
            </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
}

