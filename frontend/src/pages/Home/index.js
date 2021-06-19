import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import EnhancedTable from './EnhancedTable'

const Index = () => {


	return (
		<Grid container spacing={1}>
			<Container>
				<p>Home page</p>

			</Container>
			<Grid container>
				<EnhancedTable>
				</EnhancedTable>
			</Grid>
		</Grid>
	)
}

export default Index;
