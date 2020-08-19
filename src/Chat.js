import React,{useState,useEffect} from 'react'
import "./Chat.css"
import { Avatar, IconButton } from "@material-ui/core";
import {useParams} from 'react-router-dom';
import db from './firebase';
import {SearchOutlined,AttachFile,MoreVert, InsertEmoticon, Mic} from "@material-ui/icons";
function Chat() {
    const [seed,setSeed] = useState('');
    const [input,setInput] = useState("");
    const {roomId} = useParams();
    const[roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    useEffect(()=>{
        if(roomId)
        {
            db.collection('rooms').doc(roomId)
            .onSnapshot((snapshot)=>(
                setRoomName(snapshot.data().name)))
                db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc')
                .onSnapshot((snapshot)=>(
                    setMessages(snapshot.docs.map((doc=>doc.data())))
                ))
        }
    },[roomId])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*500));
    },[roomId]);
    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed ',input);
        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at..</p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className={`chat__message ${true && "chat__receiver"}`}>
                <span className="chat__name">Sahid</span>Hey guys
                <span className="chat__timestamp">3:32am</span>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input type="text" value={input} onChange={e=>setInput(e.target.value)}placeholder="Type a message"/>
                    <button onClick={sendMessage}>Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}
 
export default Chat
