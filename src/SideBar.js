import React,{useState,useEffect} from 'react'
import "./SideBar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DonutLargeOutlined from "@material-ui/icons/DonutLarge";
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SideBarChat from './SideBarChat';
import db from './firebase';
import useStateValue from './reducer';
function SideBar() {
    const [rooms,setRooms] = useState([]);
    const [{user,dispatch}] = useStateValue();
    useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>{
            setRooms(snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data(),
            }))
            )
        })
        return () => {
            unsubscribe();
        }
    },[]);  
    return (
        <div className="sidebar">
                <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                    <DonutLargeOutlined />
                    </IconButton>
                    <IconButton>
                    <ChatIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                </div>
                </div>
                <div className="sidebar__search">
                    <div
                    className="sidebar__searchContainer">
                    <SearchOutlined />
                <input placeholder="Search or start new chat" type="text"/>
                    </div>
                </div>
                <div className="sidebar__chat">
                {rooms.map((room) =>(
                    <SideBarChat key={room.id} id={room.id}
                    name={room.data.name}/>
                ))}
                </div>
            </div>
    )
}

export default SideBar;
