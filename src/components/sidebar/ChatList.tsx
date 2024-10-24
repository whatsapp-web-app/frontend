import {getAvtarLabel} from "../../utils/helpers/getAvtarLable.ts";
import {useFindAllChatsQuery} from "../../services/chat/chat.service.ts";
import {FC, useMemo, useState} from "react";
import useAppSelector from "../../hooks/useAppSelector.tsx";
import {useChatContext} from "../../hooks/useChatProvider.tsx";


function ChatList() {
    const {data}=useFindAllChatsQuery()
    const [search,setSearch]=useState('')

    const {user}=useAppSelector(state=>state.authSlice)
    function searchItem(item:Chat){
        if(item.isGroup){
            return item.name.toLowerCase().includes(search.toLowerCase())
        }
        else {
            const name=item.participants.filter((c)=>c._id!==user?._id)[0].name
            return name.toLowerCase().includes(search.toLowerCase())
        }
    }

  return (
      <div className='space-y-2'>
        <input
            type="text"
            placeholder="Search"
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="flex-1 overflow-auto mt-1">
          {data?.filter((item)=>{
              return search.length===0?true:searchItem(item)}).map((item) => (
              <ChatCard key={item._id} item={item} />
          ))}
        </div>
      </div>
  );
}

export default ChatList;


type ChatCardProps={
    item:Chat
}

const ChatCard:FC<ChatCardProps> = ({item}) => {
    const {user}=useAppSelector(state=>state.authSlice)
    const name=item.isGroup?item.name:item.participants.filter((c)=>c._id!==user?._id)[0].name
    const {handleSelectedChat,selectedChat}=useChatContext();

    const selected=useMemo(()=>{
        return item._id===selectedChat?._id
    },[selectedChat])


  return (
      <div className={`p-4 border-b border-gray-200 cursor-pointer rounded-lg ${selected && "bg-gray-400"}`} onClick={()=>handleSelectedChat(item)}>
          <div className="flex items-center justify-between">
                <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center" >
                        <p>{getAvtarLabel(name)}</p>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-bold text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500">Last message</p>
                      </div>
                </div>
                <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">12:00</p>
                </div>
          </div>
    </div>
  );
};
