import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
	root: {},
	row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: theme.spacing(1)
	},
	spacer: {
		flexGrow: 1
	},
	importButton: {
		marginRight: theme.spacing(1)
	},
	exportButton: {
		marginRight: theme.spacing(1)
	},
	btn: {
		background: "#6C987B",
		color: "#FFFFFF"
	}
}));

const PeminjamanToolbar = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}
		>
			
		</div>
	);
};

PeminjamanToolbar.propTypes = {
	className: PropTypes.string
};

export default PeminjamanToolbar;
