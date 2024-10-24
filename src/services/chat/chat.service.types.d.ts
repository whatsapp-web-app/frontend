
type FindAllChatResponse=Array<Chat>

type Chat={
    _id: string,
    name: "",
    description: string,
    avatar: string,
    participants: Array<User>,
    admins: Array<User>,
    bannedUsers:Array<User>,
    isGroup: boolean,
    messages: Array<Message>,
    "createdAt": "2024-03-30T11:01:14.763Z",
    "updatedAt": "2024-03-30T11:01:14.763Z",
    "__v": 0
}

type Message={
    chatId: string
    createdAt: string
    receiver: string[]
    sender: string
    text: string
    updatedAt: string
    __v: number
    _id: string
}
