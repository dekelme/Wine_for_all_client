import WineCard from './WineCard';
import Grid from '@material-ui/core/Grid';
export default function WineList(props) {
    const wineWanted = (item) => {
        return (
            <WineCard key={item._id} id={item._id} item={item} />
        )
    }
    const eachItem = (item) => {
        return (
                <WineCard key={item._id} id={item._id} item={item} />
        )
    }
    
    return (
        <div className={'list'}>
            <Grid container direction="row" justify="center" alignItems="center" style={{ marginBottom: "2%" }}>
                {props.WineList.map(eachItem)}
            </Grid>
        </div>

    )
}