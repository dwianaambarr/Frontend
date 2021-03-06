import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PengadaanToolbar, PengadaanTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	},
	content: {
		marginTop: theme.spacing(2)
	}
}));

const PengadaanList = () => {
	const classes = useStyles();

	const [users] = useState(mockData);

	return (
		<div className={classes.root}>
			<PengadaanToolbar />
			<div className={classes.content}>
				<PengadaanTable users={users} />
			</div>
		</div>
	);
};

export default PengadaanList;
