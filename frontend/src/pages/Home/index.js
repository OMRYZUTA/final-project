import React from 'react';
import Grid from '@material-ui/core/Grid';
import EnhancedTable from './EnhancedTable'
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
	container: {
		width: '95%',
		spacing: '0',
		// direction: 'column',
		// alignItems: 'center',
		// justify: 'center',
		// alignContent: 'center',
		// 	margin- left: auto,
		// // margin- right: auto,
	},
}))

const Index = () => {
	const classes = useStyles();

	return (
		<Grid container spacing={0} justify="center" alignItems="center" style={{ minHeight: "100vh" }} >
			<Grid item style={{ width: "95%" }} >
				<EnhancedTable>
				</EnhancedTable>
			</Grid>
		</Grid >
	)
}

export default Index;
