import Header from "./Header";
import ChatList from "./ChatList";
import {useState} from "react";
import SearchUser from "./SearchUser.tsx";
import Notification from "./Notification.tsx";

function SideBar() {
  const [add, setAdd] =useState(false);

  const [notification, setNotification]=useState(false)

  function addChat() {
    setAdd((perv)=>!perv);
    setNotification(false)
  }

  function notificationChat() {
    setNotification((perv)=>!perv);
    setAdd(false)
  }

  return (
    <div className="flex flex-col h-full bg-white px-3">
        {!add && !notification && <><Header addChat={addChat} notificationChat={notificationChat} /><ChatList/></>}
        {add && <SearchUser addChat={addChat}/>}
        {notification && <Notification notificationChat={notificationChat}/>}
    </div>
  );
}

export default SideBar;
