import React, { useEffect } from 'react';
import ChatListComponent from './chaList';
import {Button} from '@material-ui/core';
import firebase from 'firebase'; 
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import ChatView from './ChatView.js';
import ChatextBox from './ChatextBox';

const useStyles = makeStyles((theme) => ({


        logoutbtn: {
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          width: '300px',
          borderRadius: '0px',
          backgroundColor:blue,
          height: '35px',
          boxShadow: '0px 0px 2px black',
          color: 'white'
        }





}))


const DashBoard=(props)=>{
    const classes =useStyles();
    const [selectedChat,SetselectedChat]=React.useState(null);
    const [email,Setemail]=React.useState(null);
    const [chats,Setchats]=React.useState([])
    const [newChatform,SetnewChatForm]=React.useState(false);

    const newchatbtnclicked=()=>{

    }

    const selectChat=async (chatindex)=>{
      try {
    await SetselectedChat(chatindex);
      }
      catch(error){
        console.log(error)
      }
     messageread()
    }

    const handlelogout=()=>{

      firebase.auth().signOut();

    }

    const submitmessage=(msg)=>{

      const dockey=builddockey(chats[selectedChat].users.filter((user)=>user!==email)[0]);
      
      firebase
      .firestore()
      .collection('chats')
      .doc(dockey)
      .update({
        messages:firebase.firestore.FieldValue.arrayUnion({
          sender:email,
          message:msg,
          timestamp:Date.now()
        }),
        receiverhasread:false
      })
    }

    const builddockey=(friend)=>[email,friend].sort().join(':');


    const clickedchatwherenotsender=(index)=>{
      return(
      chats[index].messages[chats[index].messages.length-1].sender!==email
      );
    }


    const messageread=()=>{
      console.log(chats);
      console.log(selectedChat);
      const dockey=builddockey(chats[selectedChat].users.filter((user)=>user!==email)[0]);   
        console.log(dockey);

        if(clickedchatwherenotsender(selectedChat))
        {
          firebase
          .firestore()
          .collection('chats')
          .doc(dockey)
          .update({receiverhasread:true})
        }

        else
        {
          console.log('user was the sender');
        }
    }
    useEffect(()=>{

        firebase.auth().onAuthStateChanged(async _usr=>{
        
            if(!_usr)
            {
                props.history.push('/');
            }
            else
            {
                await firebase
                .firestore()
                .collection('chats')
                .where('users','array-contains',_usr.email)
                .onSnapshot(async res=>
                    {
                         const chats =res.docs.map(_doc=>_doc.data());
                         await Setemail(_usr.email)
                               Setchats(chats)
                             
                    })

                 
            }
            
            
        })




    },[]);



    return(
        <main>
        <ChatListComponent history={props.history} newchatbtnfn={newchatbtnclicked} selectChatfn={selectChat}
         chats={chats}
         useremail={email}   
         selectedChatIndex={selectedChat}
        />
        {newChatform==true?null:<ChatView user={email} chat={chats[selectedChat]}  />}
        {selectedChat!==null && !newChatform ? <ChatextBox submitmessage={submitmessage}/>:null}
        <Button className={classes.logoutbtn} onClick={handlelogout} variant='contained' color='primary' fullWidth> Log out</Button>
        
        </main>
    );

}


export default DashBoard;