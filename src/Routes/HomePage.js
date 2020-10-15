import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ContactsIcon from "@material-ui/icons/Contacts";
import EmailIcon from "@material-ui/icons/Email";
import AssessmentIcon from '@material-ui/icons/Assessment';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Formik } from "formik";
import 'typeface-lato';
import * as Yup from "yup";

const messageSchema = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").required("Email is Required"),
    first_name: Yup.string().trim().min(2, "Too Short!").required("First Name is Required"),
    last_name: Yup.string().trim().min(2, "Too Short!").required("Last Name is Required"),
    subject: Yup.string().trim().min(6, "Too Short!").required("Subject is Required"),
    message: Yup.string().trim().min(6, "Too Short!").required("Message is Required"),
});

const messageValues = { first_name: '', last_name: '', email: '', subject: '', message: '' }
const drawerWidth = 240;

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Yarra Property Management
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createMuiTheme({
    typography: {
        fontFamily: "Lato"
    },
    palette: {
        primary: {
            main: "#121037",
        },
        secondary: {
            main: "#546e7a"
        },
        text: {
            primary: "#121037",
            secondary: "#546e7a",
        }
    },
});

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    boldFont: {
        fontWeight: "600"
    },
    textWhite: {
        color: '#ffffff',
    },
    drawer: {
    },
    appBar: {
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: {
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            justifyContent: "flex-start",
        },
        flexWrap: 'wrap',
        ...theme.mixins.toolbar
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    fullHeightWidthContainer: {
        width: "100%",
        height: "100%",
    },
    toolbarTitle: {
        flexGrow: 0.4,
    },
    largeAvatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    reviewBox: {
        padding: theme.spacing(4),
    },
    heroContent: {
        padding: theme.spacing(6, 2, 6, 2),
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(12),
            paddingBottom: theme.spacing(12)
        },
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const appFeatures = [
    {
        icon: <ApartmentIcon style={{ color: "#3f51b5" }} fontSize="large" />, title: "Unit Management",
        description: `Manage property unit details such as unit details, rent pricing 
        through rental agreements, current and previous tenants, availability status.`},
    {
        icon: <GroupIcon style={{ color: "#3f51b5" }} fontSize="large" />, title: "Tenant Management",
        description: `Manage tenant personal and contact information, unit occupancy, relevant documentation, 
        rent charges, other charges and payments statements,`},
    {
        icon: <AccountBalanceIcon style={{ color: "#3f51b5" }} fontSize="large" />, title: "Accounting",
        description: `We enable to keep your bookkeeping accurate and up-to-date. 
        Track rent and other charges, payments, expenses
        and reconcile property income statments.`},
    {
        icon: <WorkIcon style={{ color: "#3f51b5" }} fontSize="large" />, title: "Rental Agreements",
        description: `Track and manage rental agreements, payment schedules, record payment transactions on agreements, 
        outstanding rent balances, unit and tenants payments history, defaulters.`},
]

const appModules = [
    {
        image: "/propertyDetails.png", title: "Property Details & Summary", description: `Monthly fee covers everything you need hassle free. 
    Keep cool and focus on what matters to you.    `},
    {
        image: "/tenantDetails.png", title: "Tenant Details & Summary", description: `Stay as little as 3 months with rolling contracts. 
    Like it here? This is your space, so stay as long as you want.`},
    {
        image: "/rentRoll.png", title: "Rent Roll", description: `Connect in spaces designed
     to bring incredible people together. Learn with them and take your project to new heights.`},
    {
        image: "/rentalAgreements.png", title: "Property Performance", description: `24/7 support. No more hidden prices. 
    It is your workingplace, playground, relax room.`},
]

const appCustomers = [
    {
        image: "/propertyDetails.png", name: "Veronica Adams", title: "Growth Marketer, Dunhill", review: `Connect in spaces designed
     to bring incredible people together. Learn with them and take your project to new heights.`},
    {
        image: "/rentalUnits.png", name: "Akachi Luccini", title: "Lead Generation, Gallant PM", review: `Stay as little as 3 months with rolling contracts. 
    Like it here? This is your space, so stay as long as you want.`},
]

const appServices = [
    { icon: <ApartmentIcon />, title: "Unit Management" },
    { icon: <ContactsIcon />, title: "Tenant Management" },
    { icon: <ScheduleIcon />, title: "Rental Agreements Management" },
    { icon: <AccountBalanceIcon />, title: "Charges & Payments Performance" },
    { icon: <AssessmentIcon />, title: "Property Performance" },
    { icon: <MoneyOffIcon />, title: "Expenses Tracking" },
    { icon: <EmailIcon />, title: "In-App Email" },
]

const tiers = [
    {
        title: 'Starter',
        price: '3500',
        description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        buttonText: 'Sign up',
        buttonVariant: 'outlined',
    },
    {
        title: 'Growing',
        subheader: 'Most popular',
        price: '5000',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Sign up',
        buttonVariant: 'outlined',
    },
    {
        title: 'Enterprise',
        price: '10000',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact Us',
        buttonVariant: 'outlined',
    },
];
const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

export default function HomePage() {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['About', 'Features', 'Reviews', 'Pricing', 'Contact', 'Login'].map((text, index) => (
                    <ListItem button key={text} onClick={() => {
                        handleDrawerToggle();
                        var element = document.getElementById(text.toLowerCase())
                        if (element) {
                            element.scrollIntoView(true)
                        }
                    }} href={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.toolbarTitle} noWrap>
                        Yarra PM
                    </Typography>
                    <Hidden smDown implementation="js">
                        <nav>
                            <Link variant="button" color="textPrimary" href="#about" className={classes.link}>
                                About
                            </Link>
                            <Link variant="button" color="textPrimary" href="#features" className={classes.link}>
                                Features
                            </Link>
                            <Link variant="button" color="textPrimary" href="#reviews" className={classes.link}>
                                Reviews
                            </Link>
                            <Link variant="button" color="textPrimary" href="#pricing" className={classes.link}>
                                Pricing
                        </Link>
                            <Link variant="button" color="textPrimary" href="#contact" className={classes.link}>
                                Support
                        </Link>
                            <Button href="#" color="primary" variant="outlined" className={classes.link}>
                                Login
                            </Button>
                        </nav>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="website navigation">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="js">
                    <Drawer
                        variant="temporary"
                        anchor={'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            {/* Hero unit */}
            <main>
            <div className={classes.heroContent} id="about">
                <div className={classes.toolbar} />
                <Grid container alignItems="center" justify="center">
                    <Grid item container lg={10} spacing={4} alignItems="center" justify="center" direction="row">
                        <Grid item xs={12} md={5} container spacing={2} alignItems="center" justify="center" direction="column">
                            <Grid item container>
                                <Grid item>
                                    <Typography component="h3" variant="h3" className={classes.boldFont} gutterBottom>
                                        Management made easy
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" color="textSecondary">
                                        For property managers, owners, and management startups.
                                        Choose the property management software designed to inspire and power
                                        you to manage your rental properties.
                                </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container direction='row' spacing={2}>
                                <Grid item>
                                    <Button variant="contained" color="primary">Sign Up</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" href="#features" color="primary">Features</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={7} container alignItems="center" justify="center" direction="column">
                            <Grid item xs={12}>
                                <img src="/headerImage.jpg" className={classes.fullHeightWidthContainer} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Divider />
            {/* Hero unit */}
            <Container maxWidth="lg" component="section" className={classes.heroContent} style={{ backgroundColor: "rgb(247, 249, 250)" }} id="features">
                <Grid container spacing={10} alignItems="center" justify="center" direction="column">
                    <Grid item container spacing={2} alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <Typography component="h4" variant="h4" align="center" className={classes.boldFont}>
                                We are reimagining renting to help you achieve your dreams
                        </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography component="p" variant="h6" color="textSecondary" align="center">
                                Through Yarra, you can keep up-to-date rental properties and units records, tenant
                                details, rental agreements and occupancy records, resolve maintenance issues and
                                update property financials, from anywhere.
                        </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={4} alignItems="flex-start" justify="center" direction="row">
                        {
                            appFeatures.map((feature, featureIndex) => (
                                <Grid key={featureIndex} item container xs={12} md={3} direction="column" spacing={2} alignItems="center">
                                    <Grid item>
                                        {feature.icon}
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" className={classes.boldFont}>
                                            {feature.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="p" align="center" color="textSecondary">
                                            {feature.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            <Container maxWidth="lg" component="section" className={classes.heroContent}>
                <Grid container alignItems="center" justify="center">
                    <Grid item container lg={12} alignItems="center" justify="center" spacing={2} direction="row">
                        <Grid item container xs={12} md={6} spacing={2} direction="column" alignItems="center" justify="center" >
                            <Grid item xs={12}>
                                <Typography component="h5" variant="h4" className={classes.boldFont}>
                                    The right software means managing your portfolio is easy.
                            </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="textSecondary">
                                    Rather than worrying about the management of your properties,
                                    you can instead oversee management in one place thus providing a
                                    substantial increase in transparency, accountability, efficiency
                                    while keeping administration to a minimum.
                                    We also made sure to include all the modules and functionality that
                                    a property owner/manager could possibly need.
                            </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src="/easyManagement.jpg" className={classes.fullHeightWidthContainer} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            {/* Hero unit */}
            <Container maxWidth="lg" component="section" className={classes.heroContent}>
                <Grid container spacing={10} alignItems="center" justify="center" direction="column">
                    <Grid item container spacing={2} alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <Typography component="h3" variant="h4" className={classes.boldFont} align="center">
                                Featured Modules
                        </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography component="p" variant="h6" color="textSecondary" align="center">
                                Here are some modules in the app to keep properties, units details and records,
                                tenants details, rental agreements with tenants,
                                rent and other charges, payments to these charges, property expenses, property and
                                tenants income and charges statements.
                        </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={4} alignItems="stretch" justify="center" direction="row">
                        {
                            appModules.map((module, moduleIndex) => (
                                <Grid key={moduleIndex} item xs={12} md={6}>
                                    <Card key={moduleIndex} className={classes.fullHeightWidthContainer}>
                                        <CardActionArea>
                                            <CardMedia
                                                height="auto"
                                                width="auto"
                                                component="img"
                                                alt="Module Images"
                                                image={module.image}
                                                title={module.title}
                                            />
                                        </CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="h4">
                                                {module.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {module.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            {/* Hero unit */}
            <Container maxWidth="lg" component="section" className={classes.heroContent} style={{ backgroundColor: "rgb(247, 249, 250)" }}>
                <Grid container spacing={4} alignItems="center" justify="center" direction="row">
                    <Grid item container xs={12} md={4} spacing={2} alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <Typography component="h4" variant="h4" className={classes.boldFont}>
                                What's included
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained">EXPLORE OUR PACKAGES</Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={8} spacing={3} justify="space-between" alignItems="center" direction="row">
                        {
                            appServices.map((service, serviceIndex) => (
                                <Grid key={serviceIndex} item xs={12} md={4} container spacing={1} direction="row" wrap="nowrap">
                                    <Grid item>
                                        {service.icon}
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" noWrap>
                                            {service.title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            {/* End hero unit */}
            <Container maxWidth="md" component="section" className={classes.heroContent} id="pricing">
                <Grid container spacing={10} alignItems="center" justify="center" direction="column">
                    <Grid item container spacing={2} alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <Typography variant="h4" align="center" className={classes.boldFont} gutterBottom>
                                Choose the right plan for your team
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="center" color="textSecondary" component="p">
                                Pay monthly or yearly and cancel at any time
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={5} alignItems="center" justify="center">
                        {tiers.map((tier) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{ align: 'center' }}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        action={tier.title === 'Growing' ? <StarIcon /> : null}
                                        className={classes.cardHeader}
                                    />
                                    <CardContent>
                                        <Grid container spacing={1} alignItems="center" justify="center">
                                            <Grid item xs={12}>
                                                <div className={classes.cardPricing}>
                                                    <Typography component="h2" variant="h3" color="textPrimary">
                                                        {tier.price}
                                                    </Typography>
                                                    <Typography variant="h6" color="textSecondary">
                                                        /mo
                                                </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {tier.description.map((line) => (
                                                    <Typography component="p" variant="subtitle1" align="center" key={line}>
                                                        {line}
                                                    </Typography>
                                                ))}
                                            </Grid>
                                            <Grid item>
                                                <Button variant={tier.buttonVariant} color="primary">
                                                    {tier.buttonText}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            {/* Hero unit */}
            <Container maxWidth="md" component="section" className={classes.heroContent} id="reviews">
                <Grid container spacing={10} direction="column" style={{ backgroundColor: "rgb(247, 249, 250)" }}>
                    <Grid item xs={12} container spacing={2} alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <Typography variant="h4" className={classes.boldFont} align="center">
                                Trusted by Africa's most innovative companies – big and small
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="p" variant="h6" align="center" color="textSecondary">
                                Yarra empowers property owners and managers to deliver more than ever before by
                                enhancing up-to-date record keeping, data authenticity and transparency, smart analytics
                                and alerts, financial statements.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={4} alignItems="stretch" justify="center" direction="row">
                        {
                            appCustomers.map((customer, customerIndex) => (
                                <Grid key={customerIndex} item xs={12} md={6}>
                                    <Card className={classes.fullHeightWidthContainer}>
                                        <CardContent>
                                            <Grid className={classes.reviewBox} container spacing={1} direction="column">
                                                <Grid item container direction="row" spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <Avatar variant="rounded" className={classes.largeAvatar}>
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="subtitle1">
                                                            {customer.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {customer.title}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1" component="p" >
                                                        {customer.review}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            <Container maxWidth="md" component="section" className={classes.heroContent} id="contact">
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Typography component="h5" variant="h4" align="center" className={classes.boldFont}>
                            Get in touch with Us
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Formik
                            initialValues={messageValues}
                            validationSchema={messageSchema}
                            onSubmit={async (values, { resetForm, setStatus, setSubmitting }) => {

                            }}>
                            {({
                                values,
                                handleSubmit,
                                touched,
                                status,
                                errors,
                                handleChange,
                                handleBlur,
                                isSubmitting,
                            }) => (
                                    <form
                                        method="post"
                                        id="sendMessageForm"
                                        onSubmit={handleSubmit}
                                    >
                                        <Grid container justify="center" direction="column" spacing={4}>
                                            <Grid item container justify="center" direction="column" spacing={2}>
                                                <Grid item>
                                                    <FormControl fullWidth>
                                                        {status && (
                                                            <FormHelperText error={true}>{status.error}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item container justify="center" direction="row" spacing={2}>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            id="first_name"
                                                            label="First Name"
                                                            type="first_name"
                                                            value={values.first_name}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            helperText={touched.first_name && errors.first_name}
                                                            error={errors.first_name && touched.first_name}
                                                            InputLabelProps={{ shrink: true }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            id="last_name"
                                                            label="Last Name"
                                                            type="last_name"
                                                            value={values.last_name}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            helperText={touched.last_name && errors.last_name}
                                                            error={errors.last_name && touched.last_name}
                                                            InputLabelProps={{ shrink: true }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item container justify="center" direction="row" spacing={2}>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            id="email"
                                                            label="Email"
                                                            value={values.email}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            helperText={touched.email && errors.email}
                                                            error={errors.email && touched.email}
                                                            type="email"
                                                            InputLabelProps={{ shrink: true }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            id="subject"
                                                            label="Subject"
                                                            type="text"
                                                            value={values.subject}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            helperText={
                                                                touched.subject && errors.subject
                                                            }
                                                            error={errors.subject && touched.subject}
                                                            InputLabelProps={{ shrink: true }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        id="message"
                                                        label="Message"
                                                        type="text"
                                                        value={values.message}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={
                                                            touched.message && errors.message
                                                        }
                                                        error={errors.message && touched.message}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item container>
                                                <Grid item>
                                                    <Button
                                                        disabled={isSubmitting}
                                                        type="submit"
                                                        variant="outlined"
                                                        color="primary"
                                                        form="sendMessageForm"
                                                    >
                                                        Send Message
                                                        </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                        </Formik>
                    </Grid>
                </Grid>
            </Container>
            {/* Footer */}
            <Container maxWidth="lg" component="footer" className={classes.footer}>
                <Grid container spacing={4} justify="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="textSecondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
            </main>
        </ThemeProvider >
    );
}