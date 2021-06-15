import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

const useStyles = makeStyles((theme) => ({

    root: {
        backgroundColor: theme.palette.background.paper,
        height: 'calc(100% - 35px)',
        position: 'absolute',
        left: '0',
        width: '300px',
        boxShadow: '0px 0px 2px black'
      },
      listItem: {
        cursor:'pointer',
      },
      newChatBtn: {
        borderRadius:'0%'
      },
      unreadMessage: {
        color: 'red',
        position: 'absolute',
        top: '0',
        right: '5px'
      }

}))

const ChatListComponent=(props)=>{

    const classes =useStyles();

    const newchat=()=>{
        
        props.newchatbtnfn()

    }

    const slectedchat=(index)=>{

        props.selectChatfn(index);

    }

    const userissender=(chat)=>{

       return( chat.messages[chat.messages.length-1].sender=== props.useremail);

    }


    if(props.chats.length > 0) {
        return(
        <main className={classes.root}>

            <Button variant='contained' fullWidth color='primary' className={classes.newChatBtn} onClick={newchat}>+new message</Button>
            <List>
            {
                props.chats.map((chat,index)=>{
                    return(
                        <div key={index}>
                        <ListItem onClick={()=>slectedchat(index)}
                        className={classes.ListItem}
                        selected={props.selectedChatIndex===index}
                        alignItems='flex-start'
                        >
                            <ListItemAvatar>
                                <Avatar alt="no img">{chat.users.filter(user=>user!==props.useremail)[0].split('')[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className={classes.listItem} primary={chat.users.filter(user=>user!==props.useremail)[0]}
                            secondary={
                                <><Typography component='span' color='textPrimary'>
                                    {chat.messages[chat.messages.length-1].message.substring(0,30)}
                                    </Typography>
                                </>
                            }>
                            </ListItemText>
                            {
                                chat.receiverhasread === false && !userissender(chat) ?<ListItemIcon><NotificationImportant className={classes.unreadMessage}></NotificationImportant></ListItemIcon> :null
                            }
                        </ListItem>

                        <Divider></Divider>
                        </div>
                    )
                })
            }

            </List>
        </main>
    );
        }

    else
    {
        console.log(props.useremail);
        console.log(props.chats)

        return (
            <div className={classes.root}>
          <Button variant="contained" 
            fullWidth 
            color='primary' 
            onClick={newchat} 
            className={classes.newChatBtn}>
              New Message
          </Button>
          <List></List>
        </div>
        )
    }

}

export default ChatListComponent;