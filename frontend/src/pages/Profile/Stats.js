import Grid from '@material-ui/core/Grid'

const Stats = () => {


    return (
        <Grid container spacing={5}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>12</Grid>
                    <Grid>Open applications</Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>3</Grid>
                    <Grid>applications with scheduled events</Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Stats;