import Grid from '@material-ui/core/Grid'
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography'

const Document = ({ text }) => {

    return (
        <Grid>
            <DescriptionIcon />
            <Typography>{text}</Typography>
        </Grid>
    )
}
export default Document;