import {createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState} from "react";




interface ChatContextType {
    selectedChat: Chat | null
    setSelectedChat: Dispatch<SetStateAction<Chat | null>>
    messages: Message[]
    setMessages: Dispatch<SetStateAction<Message[]>>
    loadingMessages: boolean
    setLoadingMessages: Dispatch<SetStateAction<boolean>>
    handleSelectedChat:(chat:Chat)=>void
    typing: boolean
    setTyping: Dispatch<SetStateAction<boolean>>
    handleChatTyping:()=>void
}

export const ChatContext=createContext({} as ChatContextType);

type Props = {
    children: ReactNode
}

function ChatProvider({children}:Readonly<Props>) {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [typing, setTyping] = useState(false)

    const handleSelectedChat=(chat:Chat)=>{
        setSelectedChat(chat)
        setMessages(chat.messages)
    }

    function handleChatTyping(){
        setTyping(true)
        setTimeout(()=>{
            setTyping(false)
        },1000)
    }


    const values=useMemo(()=>({
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
        loadingMessages,
        setLoadingMessages,
        handleSelectedChat,
        typing,
        setTyping,
        handleChatTyping
    }),[setSelectedChat,selectedChat,messages,setMessages,loadingMessages,setLoadingMessages,typing,setTyping])


    return (
        <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
    )
}


export default ChatProvider

