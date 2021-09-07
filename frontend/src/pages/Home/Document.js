import Grid from '@material-ui/core/Grid'
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    a: {
        textDecoration: 'none',
        padddingLeft: 13
    }
}));

const Document = ({ document, a }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Grid item>
            <a href={document.file_url} className={classes.a}  >
                <DescriptionIcon />
            </a>
            <Typography>{document.file_name}</Typography>
        </Grid>
    )
}
export default Document;