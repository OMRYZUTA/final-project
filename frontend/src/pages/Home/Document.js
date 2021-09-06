import Grid from '@material-ui/core/Grid'
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';

const Document = ({ document }) => {
    console.log(document.file_name)
    const handleFileClicked = (e) => {
        console.log(document.file_url);
    }
    return (
        <Grid>
            <IconButton onClick={handleFileClicked} >
                <DescriptionIcon />
            </IconButton>
            <Typography>{document.file_name}</Typography>
        </Grid>
    )
}
export default Document;