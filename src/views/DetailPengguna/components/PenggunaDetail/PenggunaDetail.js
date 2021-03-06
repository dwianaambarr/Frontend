import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField,
	Modal
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ComponentService from '../ComponentService'


function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {},
	btn: {
		background: '#5E9A78',
		color: '#FFFFFF',
		marginTop: '10px'
	},
	paper: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: 'none',
		padding: theme.spacing(2, 4, 3),
	},
	success: {
		fontSize: '80px',
		margin: '0 0 20px'
	}
}));

const PenggunaForm = props => {
	const history = useHistory();
	const { className, ...rest } = props;

	const [values, setValues] = useState({});
	const [openModal, setOpenModal] = useState(false)
	const [modalStyle] = useState(getModalStyle);

	const [pengguna, setPengguna] = useState({});

	const { id } = useParams();

	useEffect(() => {
		refreshPengguna(id)
	}, [id])

	const refreshPengguna = id => {
		ComponentService.detailPengguna(id).then(response => setPengguna(response.data))
	}

	const classes = useStyles();

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();

		const pengguna = values

		ComponentService.insertPengguna(pengguna).then(response => setOpenModal(true))

	}

	const handleClose = () => {
		setOpenModal(false)
	}

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<CheckCircleOutlineIcon style={{ color: '#6C987B' }} id="modal-logo" className={classes.success} />
			<p id="modal-description">
				Data pengguna berhasil ditambahkan
			</p>
			<RouterLink to='/pengguna'>
				<Button
					className={classes.btn}
					variant="contained"
				>
					Oke
					</Button>
			</RouterLink>
		</div>
	)

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="modal-logo"
				aria-describedby="modal-description"
			>
				{body}
			</Modal>
			<form
				autoComplete="off"
				noValidate
			>
				<CardHeader
					title="Data Detail Pengguna"
				/>
				<Divider />
				<CardContent>
					<Grid
						container
						spacing={3}
					>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Nama"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="nama"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={pengguna.nama}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="NIP"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="nip"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={pengguna.nip}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Tempat Lahir"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="tempat_lahir"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={pengguna.tempat_lahir}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Tanggal Lahir"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="tanggal_lahir"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={pengguna.tanggal_lahir}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Alamat"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="alamat"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={pengguna.alamat}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Telepon"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="telepon"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={pengguna.telepon}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Username"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="username"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={pengguna.username}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
			</form>
		</Card>
	);
};

PenggunaForm.propTypes = {
	className: PropTypes.string
};

export default PenggunaForm;
