import React, {useEffect, useState} from 'react';
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
import firebase from "firebase";
import {history} from 'react-router-dom';

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



    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
        alignItems: 'center',
      },

      submit: {
        marginTop: theme.spacing.unit * 3,
      },

      hasAccountHeader: {
        marginTop:theme.spacing.unit*2,
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
    },

    logInLink: {
        width: '100%',
        textDecoration: 'none',
        color: '#303f9f',
        fontWeight: 'bolder',
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
      },

      errorText: {
        color: 'red',
        textAlign: 'center'
      }



}))


const Signup=(props)=>{

    const classes=useStyles();

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("");
    const [signuperror,setsignuperror]=useState("");

    const handleSubmit=(e)=>{

        e.preventDefault();

        if(password!=confirmpassword)
        {
            setsignuperror("passwords do not match");
            return;
        }

        firebase
                .auth()
                .createUserWithEmailAndPassword(email,password)
                .then(authres=>{
                    const userObj={
                        email:authres.user.email
                    };
                firebase
                    .firestore()
                    .collection('users')
                    .doc(email)
                    .set(userObj)
                    .then(()=>{props.history.push('/dashboard')

                    },dbError=>{
                        console.log(dbError);
                        setsignuperror("failed to add user");
                    })
                },authError=>{
                    console.log(authError);
                    setsignuperror("failed to add user");
                }
                )

        


    }

    return(
        <>  
        <main className={classes.main}>
        <CssBaseline>
        <Paper elevation={6} className={classes.Paper}>
        <Typography variant="h5">
        Login!!
        </Typography>

        <form className={classes.form} onSubmit={(e)=>handleSubmit(e)}>
        <FormControl required fullWidth margin='normal'>
            <InputLabel htmlFor="email-id" >Enter your email</InputLabel>
            <Input htmlFor="email-id" required type="email" autoFocus value={email} onChange={(e)=>setemail(e.target.value)}></Input>
        </FormControl>

        <FormControl required fullWidth margin='normal'>
            <InputLabel htmlFor="password" >Enter your password</InputLabel>
            <Input htmlFor="password" required type="password" value={password} onChange={(e)=>setpassword(e.target.value)} ></Input>
        </FormControl>

        <FormControl required fullWidth margin='normal'>
            <InputLabel htmlFor="confirm-password" >Renter your password</InputLabel>
            <Input htmlFor="confirm-password" required type="password" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} ></Input>
        </FormControl>

        {signuperror ? <Typography className={classes.errorText} component='h5' variant='h6'>
        {signuperror}
            </Typography> :null}

        <Button variant='contained' color='primary' type='submit' fullWidth className={classes.submit}> Signup </Button>

        <Typography className={classes.hasAccountHeader} >Already have an account?</Typography>
        <Link className={classes.logInLink} to='/'>click here</Link>
        </form>
        </Paper>
        </CssBaseline>
        </main>
        </>
      
    );

}


export default Signup;