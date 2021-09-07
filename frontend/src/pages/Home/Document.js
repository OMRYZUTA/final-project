import Grid from '@material-ui/core/Grid'
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    a: {
        color: '#5FE2FF',//darkBlue
    }
}));

const Document = ({ document, a }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const openInNewTab = () => {
        const newWindow = window.open(document.file_url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }
    return (
        <Grid item>
            <IconButton onClick={openInNewTab} className={classes.a}  >
                <DescriptionIcon />
            </IconButton>
            <Typography>{document.file_name}</Typography>
        </Grid>
    )
}
export default Document;