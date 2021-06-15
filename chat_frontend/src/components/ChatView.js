import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({

    content: {
        height: 'calc(100vh - 100px)',
        overflow: 'auto',
        padding: '25px',
        marginLeft: '300px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: '50px',
        width: 'calc(100% - 300px)',
        position: 'absolute'
      },
    
      userSent: {
        float: 'right',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
      },
    
      friendSent: {
        float: 'left',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
      },
    
      chatHeader: {
        width: 'calc(100% - 301px)',
        height: '50px',
        backgroundColor: '#344195',
        position: 'fixed',
        marginLeft: '301px',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '10px',
        boxSizing: 'border-box'
      }
    
    


}))



const ChatView=(props)=>{

    const classes=useStyles();
    
    useEffect(()=>{

      const container=document.getElementById(`chatview-container`);
      if(container)
      {
        container.scrollTo(0,container.scrollHeight);
      }

    })

    
    if(props.chat===undefined)
    {
    return(
      <main id="chatview-container" className={classes.content}></main>
    );
    }

    else
    {
      return (

        <div>
          <div className={classes.chatHeader}>Your conversation with {props.chat.users.filter((user)=>user!==props.user)[0]}</div>
          <main id="chatview-container" className={classes.content}>
            {
              props.chat.messages.map((msg,index)=>{
                return(
                  <div key={index} className={msg.sender===props.user?classes.userSent:classes.friendSent}>
                  {msg.message}
                  </div>
                )
              })
            }
          </main>
        </div>

      );
      
    }




}

export default ChatView;