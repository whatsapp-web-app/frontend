import {useChatContext} from "../../hooks/useChatProvider";
import SelectedChatHeader from "./SelectedChatHeader";
import useAppSelector from "../../hooks/useAppSelector.tsx";
import SendMessage from "./SendMessage.tsx";



export default function SelectedChat(){
    const {selectedChat}=useChatContext()
    const {user}=useAppSelector(state => state.authSlice)

    if(!selectedChat){
        return (
            <div>
                <p>select the chat</p>
            </div>
        )
    }



    return (
        <div className='h-full w-full flex flex-col justify-between'>
            <SelectedChatHeader/>
            <div className='flex-1 overflow-auto flex flex-col justify-end px-4'>

                {
                    selectedChat.messages.map((message)=>{
                        return(
                            <div key={message._id} className={`px-4 py-2 my-2 rounded-lg w-fit ${message.sender===user?._id?'bg-blue-500 text-white':'bg-gray-200 self-end'}`}>
                                {message.text}
                            </div>
                        )
                    })
                }

            </div>
           <SendMessage/>
        </div>
    )
}
