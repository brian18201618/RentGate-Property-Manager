import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import exportDataToXSL from "../assets/printToExcel";
import { Box, TextField, Button, MenuItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import ExportToExcelBtn from "../components/ExportToExcelBtn";
import CommonTable from "../components/table/commonTable";
import { connect } from "react-redux";
import { commonStyles } from "../components/commonStyles";
import Layout from "../components/myLayout";
import PageHeading from "../components/PageHeading";

const headCells = [
    {
        id: "tenant_name",
        numeric: false,
        disablePadding: true,
        label: "Tenant",
    },
    {
        id: "transaction_date",
        numeric: false,
        disablePadding: true,
        label: "Transaction Date",
    },
    {
        id: "landlord_name",
        numeric: false,
        disablePadding: true,
        label: "Landlord",
    },
    {
        id: "property_ref",
        numeric: false,
        disablePadding: true,
        label: "Property Ref",
    },
    {
        id: "lease_start",
        numeric: false,
        disablePadding: true,
        label: "Lease Start Date",
    },
    {
        id: "lease_end",
        numeric: false,
        disablePadding: true,
        label: "Lease End Date",
    },
    {
        id: "property_price",
        numeric: false,
        disablePadding: true,
        label: "Property Rent",
    }, {
        id: "transaction_price",
        numeric: false,
        disablePadding: true,
        label: "Rent",
    },
    {
        id: "transaction_balance",
        numeric: false,
        disablePadding: true,
        label: "Rent Balance",
    }, {
        id: "security_deposit",
        numeric: false,
        disablePadding: true,
        label: "Security Deposit",
    }
];

let TenantStatementsPage = ({
    currentUser,
    transactions,
    properties,
    contacts,
    users
}) => {
    let [statementItems, setStatementItems] = useState([]);
    let [filteredStatementItems, setFilteredStatementItems] = useState([]);
    let [propertyFilter, setPropertyFilter] = useState("");
    let [contactFilter, setContactFilter] = useState("");
    let [assignedToFilter, setAssignedToFilter] = useState(currentUser.id);
    let [fromDateFilter, setFromDateFilter] = useState("");
    let [toDateFilter, setToDateFilter] = useState("");
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const mappedTransactions = transactions.map((transaction) => {
            const tenant = contacts.find(
                (contact) => contact.id === transaction.tenant
            );
            const landlord = users.find(
                (user) => user.id === transaction.landlord
            );
            const property = properties.find(
                (property) => property.id === transaction.property
            );
            const transactionDetails = {}
            transactionDetails.tenant_name = typeof tenant !== 'undefined' ? tenant.first_name + ' ' + tenant.last_name : ''
            transactionDetails.tenantId = typeof tenant !== 'undefined' ? tenant.id : ''
            transactionDetails.landlord_name = typeof landlord !== 'undefined' ? landlord.first_name + ' ' + landlord.last_name : ''
            transactionDetails.property_ref = typeof property !== 'undefined' ? property.ref : null
            transactionDetails.property = typeof property !== 'undefined' ? property.id : null
            transactionDetails.property_price = typeof property !== 'undefined' ? property.price : null
            transactionDetails.security_deposit = typeof transaction !== 'undefined' ? transaction.security_deposit : null
            transactionDetails.water_deposit = typeof transaction !== 'undefined' ? transaction.water_deposit : null
            transactionDetails.transaction_balance = typeof property !== 'undefined' ? property.price - transaction.transaction_price : null
            return Object.assign({}, transaction, transactionDetails);
        });
        setStatementItems(mappedTransactions);
        setFilteredStatementItems(mappedTransactions);
    }, [transactions, contacts, users, properties]);

    const classes = commonStyles();

    const exportTransactionsRecordsToExcel = () => {
        let items = statementItems.filter(({ id }) => selected.includes(id));
        exportDataToXSL(
            "Tenant Statements Records",
            "Tenant Statements Data",
            items,
            "TenantStatements"
        );
    };

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();
        //filter the transactions according to the search criteria here
        let filteredStatements = statementItems
            .filter(({ transaction_date }) =>
                !fromDateFilter ? true : transaction_date >= fromDateFilter
            )
            .filter(({ transaction_date }) =>
                !toDateFilter ? true : transaction_date <= toDateFilter
            )
            .filter(({ property }) =>
                !propertyFilter ? true : property === propertyFilter
            )
            .filter(({ tenantId }) =>
                !contactFilter ? true : tenantId === contactFilter
            )
            .filter(({ landlord }) =>
                !assignedToFilter ? true : landlord === assignedToFilter
            );
        setFilteredStatementItems(filteredStatements);
    };

    const resetSearchForm = (event) => {
        event.preventDefault();
        setFilteredStatementItems(statementItems);
        setPropertyFilter("");
        setContactFilter("");
        setAssignedToFilter("");
        setFromDateFilter("");
        setToDateFilter("");
    };

    return (
        <Layout pageTitle="Tenant Statements">
            <Grid
                container
                spacing={3}
                justify="center" direction="column"
            >
                <Grid item key={2}>
                    <PageHeading paddingLeft={2} text={"Tenant Statements"} />
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
                        <ExportToExcelBtn
                            aria-label="Export to Excel"
                            disabled={selected.length <= 0}
                            onClick={(event) => {
                                exportTransactionsRecordsToExcel();
                            }}
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
                                <Grid
                                    container
                                    item
                                    lg={6} md={12} xs={12}
                                    spacing={1}
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
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        variant="outlined"
                                        name="property_filter"
                                        label="Property"
                                        id="property_filter"
                                        onChange={(event) => {
                                            setPropertyFilter(
                                                event.target.value
                                            );
                                        }}
                                        value={propertyFilter}
                                    >
                                        {properties.map(
                                            (property, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={property.id}
                                                >
                                                    {property.ref}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={2}
                                justify="center"
                                direction="row"
                            >
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        variant="outlined"
                                        id="assigned_to"
                                        name="assigned_to"
                                        label="Assigned To"
                                        value={assignedToFilter}
                                        onChange={(event) => {
                                            setAssignedToFilter(
                                                event.target.value
                                            );
                                        }}
                                    >
                                        {users.map((user, index) => (
                                            <MenuItem key={index} value={user.id}>
                                                {user.first_name + " " + user.last_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        name="contact_filter"
                                        label="Contact"
                                        id="contact_filter"
                                        onChange={(event) => {
                                            setContactFilter(event.target.value);
                                        }}
                                        value={contactFilter}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {contacts.map((contact, contactIndex) => (
                                            <MenuItem key={contactIndex} value={contact.id}>
                                                {contact.first_name + ' ' + contact.last_name}
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
                                        onClick={(event) => handleSearchFormSubmit(event)}
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
                                        onClick={(event) => resetSearchForm(event)}
                                        type="reset"
                                        form="contactSearchForm"
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
                        rows={filteredStatementItems}
                        headCells={headCells}
                        noDetailsCol={true}
                        noEditCol={true}
                        noDeleteCol={true}
                    />
                </Grid>
            </Grid>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        properties: state.properties,
        transactions: state.transactions,
        contacts: state.contacts,
        users: state.users,
    };
};

export default connect(mapStateToProps)(TenantStatementsPage);
