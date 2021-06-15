import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Send from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    sendBtn: {
        color: 'blue',
        cursor: 'pointer',
        '&:hover': {
          color: 'gray'
        }
      },
    
      chatTextBoxContainer: {
        position: 'absolute',
        bottom: '15px',
        left: '315px',
        boxSizing: 'border-box',
        overflow: 'auto',
        width: 'calc(100% - 300px - 50px)'
      },
    
      chatTextBox: {
        width: 'calc(100% - 25px)'
      }
    }))


const ChatextBox=(props)=>{

  const [chatext,setchattext]=React.useState("")

    const classes=useStyles();
    const usertyping=(e)=>e.keyCode===13?submitmessage():setchattext(e.target.value);

    const messagevalid=(txt)=>txt && txt.replace(/\s/g,'').length;

    const userclickedinput=()=>{
        console.log("user clicked input");
        props.messagereadfn();
      }
      
      const submitmessage=()=>{

        if(messagevalid(chatext) )
        {
          props.submitmessage(chatext);
          document.getElementById('chattextbox').value="";
        }
  
    }

    return(
        <div className={classes.chatTextBoxContainer}>
        <TextField placeholder='type your message...' onKeyUp={(e)=>usertyping(e)} id='chattextbox' className={classes.chatTextBox} onFocus={userclickedinput}></TextField>
        <Send onClick={submitmessage} className={classes.sendBtn}></Send>
        </div>
    );

}


export default ChatextBox