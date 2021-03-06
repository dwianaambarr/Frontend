import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Cookies from 'js-cookie'
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

const PeminjamanDetail = props => {
	const history = useHistory();
	const { className, ...rest } = props;

	const [values, setValues] = useState({});
	const [openModal, setOpenModal] = useState(false)
	const [modalStyle] = useState(getModalStyle);
	const [isOverdue, setisOverdue] = useState(false)

	const [peminjaman, setPeminjaman] = useState({});

	const { id } = useParams();

	useEffect(() => {
		refreshPeminjaman(id)
		cannotCreate()
	}, [id])

	const refreshPeminjaman = id => {
		ComponentService.detailPeminjaman(id).then(response => setPeminjaman(response.data))
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

		const peminjaman = values

		ComponentService.insertSurat(peminjaman).then(response => setOpenModal(true))

	}

	const handleClose = () => {
		setOpenModal(false)
	}

	const statusOption = () => {
		if (peminjaman.status === 0) {
			return "Menunggu Persetujuan"
		} else if (peminjaman.status === 1) {
			return "Ditolak"
		} else if (peminjaman.status === 2) {
			return "Disetujui"
		} else if (peminjaman.status === 3) {
			return "Sudah Diambil"
		} else if (peminjaman.status === 4) {
			return "Sudah Dikembalikan"
		} else {
			return "Overdue"
		}
	}

	const cannotCreate = () => {
		if (peminjaman.status === 5) {
			setisOverdue(true)
		} else {
			setisOverdue(false)
		}
	}
	
	const btnCreate = () => {
		if (JSON.parse(Cookies.get('user')).role === 5 && peminjaman.status === 5) {
		return (
			<CardActions>
				<Button
					className={classes.btn}
					variant="contained"
					onClick={handleSubmit}
					disabled={isOverdue === true}
				>
					BUAT SURAT
				</Button>
			</CardActions>
			)
		}
	}
	
	const body = (
		<div style={modalStyle} className={classes.paper}>
			<CheckCircleOutlineIcon style={{ color: '#6C987B' }} id="modal-logo" className={classes.success} />
			<p id="modal-description">
				Data surat berhasil diajukan
			</p>
			<RouterLink to='/peminjaman'>
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
					title="Data Detail Peminjaman"
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
								label="Nama Peminjam"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="nama_peminjam"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={peminjaman.nama_peminjam}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Judul Buku"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="nama_buku"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={peminjaman.nama_buku}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Tanggal Peminjaman"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="tanggal_peminjaman"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={peminjaman.tanggal_peminjaman}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Tanggal Pengembalian"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="tanggal_pengembalian"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={peminjaman.tanggal_pengembalian}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Denda"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="denda"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={peminjaman.denda}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								label="Status"
								InputLabelProps={{ shrink: true }}
								margin="dense"
								name="status"
								onChange={handleChange}
								variant="outlined"
								disabled="true"
								value={statusOption()}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				{btnCreate()}
			</form>
		</Card>
	);
};

PeminjamanDetail.propTypes = {
	className: PropTypes.string
};

export default PeminjamanDetail;
