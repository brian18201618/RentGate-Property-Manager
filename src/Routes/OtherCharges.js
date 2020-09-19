import React, { useEffect, useState } from "react";
import Layout from "../components/PrivateLayout";
import PageHeading from "../components/PageHeading";
import Grid from "@material-ui/core/Grid";
import { Box, TextField, Button, MenuItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import ExportToExcelBtn from "../components/ExportToExcelBtn";
import PrintArrayToPdf from "../assets/PrintArrayToPdf";
import CommonTable from "../components/table/commonTable";
import { handleDelete } from "../actions/actions";
import { getTransactionsFilterOptions } from "../assets/commonAssets";
import moment from "moment";
import { commonStyles } from '../components/commonStyles'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


const TRANSACTIONS_FILTER_OPTIONS = getTransactionsFilterOptions()

const headCells = [
    {
        id: "tenant_name",
        numeric: false,
        disablePadding: true,
        label: "Tenant",
    },
    {
        id: "unit_ref",
        numeric: false,
        disablePadding: true,
        label: "Unit Ref/Number",
    },
    { id: "charge_label", numeric: false, disablePadding: true, label: "Charge Name/Type" },
    {
        id: "charge_date",
        numeric: false,
        disablePadding: true,
        label: "Charge Date",
    },
    { id: "due_date", numeric: false, disablePadding: true, label: "Due Date", },
    { id: "charge_amount", numeric: false, disablePadding: true, label: "Charge Amount", },
    { id: "payed_status", numeric: false, disablePadding: true, label: "Payments Made" },
    { id: "payed_amount", numeric: false, disablePadding: true, label: "Total Amounts Paid" },
    { id: "balance", numeric: false, disablePadding: true, label: "Balance" },
    { id: "edit", numeric: false, disablePadding: true, label: "Edit" },
    { id: "delete", numeric: false, disablePadding: true, label: "Delete" },

];

let TenantChargesStatementPage = ({
    transactions,
    transactionsCharges,
    handleItemDelete,
}) => {
    const classes = commonStyles()
    let [tenantChargesItems, setTenantChargesItems] = useState([]);
    let [filteredChargeItems, setFilteredChargeItems] = useState([]);
    let [chargeType, setChargeTypeFilter] = useState("");
    let [periodFilter, setPeriodFilter] = useState("");
    const [selected, setSelected] = useState([]);
    const CHARGE_TYPES = Array.from(new Set(tenantChargesItems.map((chargeItem) => chargeItem.charge_type)))


    useEffect(() => {
        const mappedCharges = transactionsCharges.sort((charge1, charge2) => charge2.charge_date > charge1.charge_date)
            .map((charge) => {
                const chargeDetails = {}
                //get payments with this charge id
                const chargePayments = transactions.filter((payment) => payment.charge_id === charge.id)
                chargeDetails.payed_status = chargePayments.length ? true : false;
                chargeDetails.payed_amount = 0
                chargePayments.forEach(chargePayment => {
                    chargeDetails.payed_amount += chargePayment.amount
                });
                chargeDetails.balance = charge.charge_amount - chargeDetails.payed_amount
                return Object.assign({}, charge, chargeDetails);
            });
        setTenantChargesItems(mappedCharges);
        setFilteredChargeItems(mappedCharges);
    }, [transactionsCharges, transactions]);

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();
        //filter the transactionsCharges according to the search criteria here
        let filteredStatements = tenantChargesItems
        let startOfPeriod;
        let endOfPeriod;
        if (periodFilter) {
            switch (periodFilter) {
                case 'last-month':
                    startOfPeriod = moment().subtract(1, 'months').startOf('month')
                    endOfPeriod = moment().subtract(1, 'months').endOf('month')
                    break;
                case 'year-to-date':
                    startOfPeriod = moment().startOf('year')
                    endOfPeriod = moment()
                    break;
                case 'last-year':
                    startOfPeriod = moment().subtract(1, 'years').startOf('year')
                    endOfPeriod = moment().subtract(1, 'years').endOf('year')
                    break;
                default:
                    startOfPeriod = moment().subtract(periodFilter, 'months').startOf('month')
                    endOfPeriod = moment()
                    break;
            }
            filteredStatements = filteredStatements.filter((chargeItem) => {
                const chargeItemDate = moment(chargeItem.charge_date)
                return chargeItemDate.isSameOrAfter(startOfPeriod) && chargeItemDate.isSameOrBefore(endOfPeriod)
            })
        }
        filteredStatements = filteredStatements.filter(({ charge_type }) =>
            !chargeType ? true : charge_type === chargeType
        )
        setFilteredChargeItems(filteredStatements);
    };

    const resetSearchForm = (event) => {
        event.preventDefault();
        setFilteredChargeItems(tenantChargesItems);
        setChargeTypeFilter("");
        setPeriodFilter("");
    };

    return (
        <Layout pageTitle="Other Charges">
            <Grid
                container
                spacing={3}
                justify="center" direction="column"
            >
                <Grid item key={2}>
                    <PageHeading paddingLeft={2} text={"Other Charges"} />
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
                            disabled={selected.length <= 0}
                            reportName={`Tenants Charges Records`}
                            reportTitle={'Tenant Charges Data'}
                            headCells={headCells}
                            dataToPrint={tenantChargesItems.filter(({ id }) => selected.includes(id))}
                        />
                    </Grid>
                    <Grid item>
                        <PrintArrayToPdf
                            disabled={selected.length <= 0}
                            reportName={'Tenant Charges Data'}
                            reportTitle={`Tenant Charges Records`}
                            headCells={headCells}
                            dataToPrint={tenantChargesItems.filter(({ id }) => selected.includes(id))}
                        />
                    </Grid>
                </Grid>
                <Grid item>
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
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        select
                                        id="period_filter"
                                        name="period_filter"
                                        label="Period"
                                        value={periodFilter}
                                        onChange={(event) => {
                                            setPeriodFilter(
                                                event.target.value
                                            );
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {TRANSACTIONS_FILTER_OPTIONS.map((filterOption, index) => (
                                            <MenuItem
                                                key={index}
                                                value={filterOption.id}
                                            >
                                                {filterOption.text}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        variant="outlined"
                                        name="chargeType"
                                        label="Charge Type"
                                        id="chargeType"
                                        onChange={(event) => {
                                            setChargeTypeFilter(
                                                event.target.value
                                            );
                                        }}
                                        value={chargeType}
                                    >
                                        {CHARGE_TYPES.map(
                                            (charge_type, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={charge_type}
                                                >
                                                    {charge_type}
                                                </MenuItem>
                                            )
                                        )}
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
                <Grid item>
                    <Box border={1} borderRadius="borderRadius" borderColor="grey.400">
                        Show Totals and other important statistics here
                </Box>
                </Grid>
                <Grid item>
                    <CommonTable
                        selected={selected}
                        setSelected={setSelected}
                        rows={filteredChargeItems}
                        headCells={headCells}
                        deleteUrl={'unit-charges'}
                        handleDelete={handleItemDelete}
                    />
                </Grid>
            </Grid>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions.filter((payment) => payment.payment_type !== 'rent_income'),
        transactionsCharges: state.transactionsCharges.filter((charge) => charge.charge_type !== 'rent_income'),
        contacts: state.contacts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleItemDelete: (itemId, url) => dispatch(handleDelete( itemId, url)),
    };
};

TenantChargesStatementPage = connect(mapStateToProps, mapDispatchToProps)(TenantChargesStatementPage);

export default withRouter(TenantChargesStatementPage);