import Layout from "../components/PrivateLayout";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import AddIcon from "@material-ui/icons/Add";
import { Box, TextField, Button, MenuItem } from "@material-ui/core";
import CustomizedSnackbar from "../components/CustomSnackbar";
import { connect } from "react-redux";
import { handleDelete } from "../actions/actions";
import PageHeading from "../components/PageHeading";
import CommonTable from "../components/table/commonTable";
import { commonStyles } from "../components/commonStyles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withRouter } from "react-router-dom";
import ExportToExcelBtn from "../components/ExportToExcelBtn";

const STATUS_LIST = ["Open", "Closed"];

const maintenanceRequestsTableHeadCells = [
	{ id: "date_created", numeric: false, disablePadding: true, label: "Date Created" },
	{ id: "tenant_name", numeric: false, disablePadding: true, label: "Tenant" },
	{ id: "unit_ref", numeric: false, disablePadding: true, label: "Unit Number/Ref" },
	{ id: "maintenance_details", numeric: false, disablePadding: true, label: "Request Details" },
	{ id: "status", numeric: false, disablePadding: true, label: "Status" },
	{ id: "edit", numeric: false, disablePadding: true, label: "Edit" },
	{ id: "delete", numeric: false, disablePadding: true, label: "Delete" },

];

let MaintenanceRequestsPage = ({
	maintenanceRequests,
	users,
	contacts,
	propertyUnits,
	match,
	error, handleItemDelete
}) => {
	let [maintenanceRequestItems, setMaintenanceRequestItems] = useState([]);
	let [filteredMaintenanceRequestItems, setFilteredMaintenanceRequestItems] = useState([]);
	let [fromDateFilter, setFromDateFilter] = useState("");
	let [toDateFilter, setToDateFilter] = useState("");
	let [contactFilter, setContactFilter] = useState(null);
	let [statusFilter, setStatusFilter] = useState("");
	const [selected, setSelected] = useState([]);

	const classes = commonStyles();

	useEffect(() => {
		const mappedMaintenanceRequests = maintenanceRequests.map(
			(maintenanceRequest) => {
				const contactWithRequest = contacts.find(
					(contact) => contact.id === maintenanceRequest.contact
				) || {};
				const maintenanceRequestDetails = {}
					maintenanceRequestDetails.tenant_id_number = contactWithRequest.id_number
					maintenanceRequestDetails.tenant_name = contactWithRequest.first_name + " " + contactWithRequest.last_name
				return Object.assign(
					{},
					maintenanceRequest, maintenanceRequestDetails
				);
			}
		);
		setMaintenanceRequestItems(mappedMaintenanceRequests);
		setFilteredMaintenanceRequestItems(mappedMaintenanceRequests);
	}, [maintenanceRequests, contacts, users, propertyUnits]);

	const handleSearchFormSubmit = (event) => {
		event.preventDefault();
		//filter the maintenanceRequests here according to search criteria
		let filteredMaintenanceRequests = maintenanceRequestItems
			.filter(({ date_created }) =>
				!fromDateFilter ? true : date_created >= fromDateFilter
			)
			.filter(({ date_created }) =>
				!toDateFilter ? true : date_created === toDateFilter
			)
			.filter(({ tenant_id }) =>
                !contactFilter ? true : tenant_id === contactFilter.id
            )
			.filter(({ status }) =>
				!statusFilter ? true : status === statusFilter
			);

		setFilteredMaintenanceRequestItems(filteredMaintenanceRequests);
	};

	const resetSearchForm = (event) => {
		event.preventDefault();
		setFilteredMaintenanceRequestItems(maintenanceRequestItems);
		setContactFilter("");
		setStatusFilter("");
		setFromDateFilter("");
		setToDateFilter("");
	};

	return (
		<Layout pageTitle="Maintenance Requests">
			<Grid
				container
				spacing={3}
				justify="space-evenly"
				alignItems="center"
			>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<PageHeading text="Maintenance Requests" />
				</Grid>
				<Grid
					container
					spacing={2}
					item
					alignItems="center"
					direction="row"
					key={1}
				>
					<Grid item>
						<Button
							type="button"
							color="primary"
							variant="contained"
							size="medium"
							startIcon={<AddIcon />}
							component={Link}
							to={`${match.url}/new`}
						>

							NEW
						</Button>
					</Grid>
					<Grid item>
						<Button
							type="button"
							color="primary"
							variant="contained"
							size="medium"
							startIcon={<EditIcon />}
							disabled={selected.length <= 0}
							component={Link}
							to={`${match.url}/${selected[0]}/edit`}
						>

							Edit
						</Button>
					</Grid>
					<Grid item>
						<ExportToExcelBtn
							disabled={selected.length <= 0}
							reportName={'Maintenance Requests Records'}
							reportTitle={'Maintenance Requests Data'}
							headCells={maintenanceRequestsTableHeadCells}
							dataToPrint={maintenanceRequestItems.filter(({ id }) => selected.includes(id))}
						/>
					</Grid>
					<Grid item>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<Box
						border={1}
						borderRadius="borderRadius"
						borderColor="grey.400"
					>
						<form
							className={classes.form}
							id="maintenanceRequestSearchForm"
							onSubmit={handleSearchFormSubmit}
						>
							<Grid
								container
								spacing={2}
								justify="center"
								direction="row"
							>
								<Grid item lg={6} md={12} xs={12}>
									<TextField
										fullWidth
										variant="outlined"
										type="date"
										id="from_date_filter"
										name="from_date_filter"
										label="From Date"
										value={fromDateFilter}
										onChange={(event) => {
											setFromDateFilter(
												event.target.value
											);
										}}
										InputLabelProps={{ shrink: true }}
									/>
								</Grid>
								<Grid item lg={6} md={12} xs={12}>
									<TextField
										fullWidth
										variant="outlined"
										type="date"
										name="to_date_filter"
										label="To Date"
										id="to_date_filter"
										onChange={(event) => {
											setToDateFilter(event.target.value);
										}}
										value={toDateFilter}
										InputLabelProps={{ shrink: true }}
									/>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}
								justify="center"
								direction="row"
							>
								<Grid item xs={12} md={6}>
									<Autocomplete
										id="contact_filter"
										options={contacts}
										getOptionSelected={(option, value) => option.id === value.id}
										name="contact_filter"
										onChange={(event, newValue) => {
											setContactFilter(newValue);
										}}
										value={contactFilter}
										getOptionLabel={(tenant) => tenant ? `${tenant.first_name} ${tenant.last_name}` : ''}
										style={{ width: "100%" }}
										renderInput={(params) => <TextField {...params} label="Tenant" variant="outlined" />}
									/>
								</Grid>
								<Grid item lg={6} md={12} xs={12}>
									<TextField
										fullWidth
										select
										variant="outlined"
										name="status"
										label="Status"
										id="status"
										onChange={(event) => {
											setStatusFilter(event.target.value);
										}}
										value={statusFilter}
									>
										{STATUS_LIST.map((status, index) => (
											<MenuItem
												key={index}
												value={status}
											>
												{status}
											</MenuItem>
										))}
									</TextField>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}
								item
								justify="flex-end"
								alignItems="center"
								direction="row"
								key={1}
							>
								<Grid item>
									<Button
										type="submit"
										form="maintenanceRequestSearchForm"
										color="primary"
										variant="contained"
										size="medium"
										startIcon={<SearchIcon />}
									>
										SEARCH
									</Button>
								</Grid>
								<Grid item>
									<Button
										onClick={(event) => {
											resetSearchForm(event);
										}}
										type="reset"
										form="propertySearchForm"
										color="primary"
										variant="contained"
										size="medium"
										startIcon={<UndoIcon />}
									>
										RESET
									</Button>
								</Grid>
							</Grid>
						</form>
					</Box>
				</Grid>
				<Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
					{error && (
						<div>
							<CustomizedSnackbar
								variant="error"
								message={error.message}
							/>
						</div>
					)}
					<CommonTable
						selected={selected}
						setSelected={setSelected}
						rows={filteredMaintenanceRequestItems}
						headCells={maintenanceRequestsTableHeadCells}

						handleDelete={handleItemDelete}
						deleteUrl={"maintenance-requests"}
					/>
				</Grid>

			</Grid>
		</Layout>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		currentUser: state.currentUser,
		maintenanceRequests: state.maintenanceRequests,
		propertyUnits: state.propertyUnits,
		users: state.users,
		contacts: state.contacts,
		isLoading: state.isLoading,
		error: state.error,
		match: ownProps.match,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleItemDelete: (itemId, url) => dispatch(handleDelete(itemId, url)),
	};
};

MaintenanceRequestsPage = connect(
	mapStateToProps, mapDispatchToProps
)(MaintenanceRequestsPage);

export default withRouter(MaintenanceRequestsPage);
