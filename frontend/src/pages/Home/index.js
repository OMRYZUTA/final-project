import React from 'react';
import Grid from '@material-ui/core/Grid';
import EnhancedTable from './EnhancedTable'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '50px 70px',
		backgroundColor: '#f7f7f9',
		spacing: 0,
		justifyContent: 'center',
		alignItems: 'top-center',
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
