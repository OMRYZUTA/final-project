import Grid from '@material-ui/core/Grid'
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';

const Document = ({ document }) => {
    return (
        <Grid>
            <a href={document.file_url}  >
                <DescriptionIcon />
            </a>
            <Typography>{document.file_name}</Typography>
        </Grid>
    )
}
export default Document;