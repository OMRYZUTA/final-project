import React from 'react';
import Grid from '@material-ui/core/Grid';
import EnhancedTable from './EnhancedTable'
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
	root: {

		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
		backgroundColor: '#FBF7EC',
		spacing: 0,
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: "100vh",
	},

}))

const Index = () => {
	const classes = useStyles();

	return (
		<Grid className={classes.root} container   >
			<Grid item style={{ width: "95%" }} >
				<EnhancedTable>
				</EnhancedTable>
			</Grid>
		</Grid>
	)
}

export default Index;
