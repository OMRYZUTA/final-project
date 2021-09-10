import Grid from '@material-ui/core/Grid'

const Stats = ({stats}) => {

    return (
        <Grid container spacing={5}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>{stats?.open_applications}</Grid>
                    <Grid>Open applications</Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>{stats?.future_stages}</Grid>
                    <Grid>applications with scheduled events</Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Stats;