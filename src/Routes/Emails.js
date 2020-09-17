import Layout from "../components/myLayout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import AddIcon from "@material-ui/icons/Add";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { handleDelete } from "../actions/actions";
import CommonTable from "../components/table/commonTable";
import { commonStyles } from "../components/commonStyles";
import LoadingBackdrop from "../components/loadingBackdrop";
import { withRouter } from "react-router-dom";
import ExportToExcelBtn from "../components/ExportToExcelBtn";
import PageHeading from "../components/PageHeading";

const emailsTableHeadCells = [
    {
        id: "from_user",
        numeric: false,
        disablePadding: true,
        label: "From",
    },
    {
        id: "date_sent",
        numeric: false,
        disablePadding: true,
        label: "Date Sent",
    },
    {
        id: "email_subject",
        numeric: false,
        disablePadding: true,
        label: "Email Subject",
    },
    {
        id: "email_message",
        numeric: false,
        disablePadding: true,
        label: "Email Message",
    },
    { id: "edit", numeric: false, disablePadding: true, label: "Edit" },
	{ id: "delete", numeric: false, disablePadding: true, label: "Delete" },
];

let EmailsPage = ({
    isLoading,
    communicationEmails,
    users,
    currentUser,
    match,
}) => {
    let [emailItems, setEmailItems] = useState([]);
    let [selected, setSelected] = useState([]);
    let [fromDateFilter, setFromDateFilter] = useState("");
    let [toDateFilter, setToDateFilter] = useState("");

    const classes = commonStyles();

    useEffect(() => {
        setEmailItems(communicationEmails);
    }, [communicationEmails]);

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();
        //filter the communicationEmails here according to search criteria
        let filteredEmailCommunications = communicationEmails
            .filter(({ date_sent }) =>
                !fromDateFilter ? true : date_sent >= fromDateFilter
            )
            .filter(({ date_sent }) =>
                !toDateFilter ? true : date_sent <= toDateFilter
            );

        setEmailItems(filteredEmailCommunications);
    };

    const resetSearchForm = (event) => {
        event.preventDefault();
        setEmailItems(communicationEmails);
        setFromDateFilter("");
        setToDateFilter("");
    };

    return (
        <Layout pageTitle="Emails">
            <Grid
                container
                spacing={3}
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <PageHeading text="Emails" />
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
                    <ExportToExcelBtn
                            disabled={selected.length <= 0}
                            reportName={'Emails Records'}
                            reportTitle={'Emails Records'}
                            headCells={emailsTableHeadCells}
                            dataToPrint={emailItems.filter(({ id }) => selected.includes(id))}
                        />
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
                            id="contactSearchForm"
                            onSubmit={handleSearchFormSubmit}
                        >
                            <Grid
                                container
                                spacing={2}
                                justify="center"
                                direction="row"
                            >
                                <Grid item lg={6} md={6} xs={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        id="from_date"
                                        name="from_date"
                                        label="From Date"
                                        value={fromDateFilter}
                                        onChange={(event) => {
                                            setFromDateFilter(
                                                event.target.value
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        name="to_date"
                                        label="To Date"
                                        id="to_date"
                                        onChange={(event) => {
                                            setToDateFilter(event.target.value);
                                        }}
                                        value={toDateFilter}
                                    />
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
                                        onClick={(event) =>
                                            handleSearchFormSubmit(event)
                                        }
                                        type="submit"
                                        form="contactSearchForm"
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
                    <CommonTable
                        selected={selected}
                        setSelected={setSelected}
                        rows={emailItems}
                        headCells={emailsTableHeadCells}
                        handleDelete={handleDelete}
                        deleteUrl={"communicationEmails"}
                        noDetailsCol
                        noEditCol
                        noDeleteCol
                    />
                </Grid>
                {isLoading && <LoadingBackdrop open={isLoading} />}
            </Grid>
        </Layout>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users,
        currentUser: state.currentUser,
        communicationEmails: state.communicationEmails,
        isLoading: state.isLoading,
        match: ownProps.match,
    };
};

EmailsPage = connect(mapStateToProps)(EmailsPage);

export default withRouter(EmailsPage);
