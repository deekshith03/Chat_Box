import React, {useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const firebase = require("firebase");

const useStyles = makeStyles((theme) => ({

    main:{

        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
        },

    },

    Paper:{

    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,

    },




}))

const Login=()=>{

    const classes=useStyles();

    return(
        <>
        <main className={classes.main}>
        <CssBaseline>
        <Paper elevation={6} className={classes.Paper}>
        <Typography variant="h5">
        Login!!
        </Typography>



        </Paper>
        </CssBaseline>
        </main>
        </>
    );

}


export default Login;