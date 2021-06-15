import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography, createChainedFunction } from '@material-ui/core';
import firebase from 'firebase'; 
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    main: {
        width: 'auto',
        display: 'block', 
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        position: 'absolute',
        width: '350px',
        top: '50px',
        left: 'calc(50% + 150px - 175px)'
      },
      input: {
      },
      form: {
        width: '100%',
        marginTop: theme.spacing.unit,
      },
      submit: {
        marginTop: theme.spacing.unit * 3
      },
      errorText: {
        color: 'red',
        textAlign: 'center'
      }


}))


const Newchat=(props)=>{

    const classes=useStyles();

    const [username,setusername]=useState(null);
    const [message,setmessage]=useState(null);

    const gotochat=()=>props.goToChatFn(builddockey(),message);

    const createchat=()=>
    {
        props.newChatSubmitFn({
            sendTo: username,
            message: message
          });
    }

    const submitNewChat=async (e)=>{

        e.preventDefault();
        
        const userexists= await userExists();
        
        if(userexists)
        {
            const chatexists=await chatExists();
            chatexists ? gotochat() : createchat();
        }

    }

    const builddockey=()=>{

        return([firebase.auth().currentUser.email,username].sort().join(':'));

    }

    const chatExists = async ()=>{

        const dockey= builddockey();

        const chat= await firebase
        .firestore()
        .collection('chats')
        .doc(dockey)
        .get();

        console.log(chat.exists);

        return chat.exists;

    }


    const userExists= async() =>{

        const usersnapshot = await firebase
        .firestore()
        .collection('users')
        .get();

        const exists=usersnapshot.docs
        .map(doc=> doc.data().email)
        .includes(username);

        return exists;
    }

    return(
        <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">Send A Message!</Typography>
          <form className={classes.form} onSubmit={(e)=>submitNewChat(e)}>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-username'>
                  Enter Your Friend's Email
              </InputLabel>
              <Input required 
                className={classes.input}
                autoFocus 
                onChange={(e) =>setusername(e.target.value)} 
                id='new-chat-username'>
              </Input>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-message'>
                  Enter Your Message
              </InputLabel>
              <Input required 
                className={classes.input}
                onChange={(e) => setmessage(e.target.value)} 
                id='new-chat-message'>
              </Input>
            </FormControl>
            <Button fullWidth variant='contained' color='primary' className={classes.submit} type='submit'>Send</Button>
          
          </form>
          {
            this.state.serverError ? 
            <Typography component='h5' variant='h6' className={classes.errorText}>
              Unable to locate the user
            </Typography> :
            null
          }
        </Paper>
        </main>
    );



}


export default Newchat;


