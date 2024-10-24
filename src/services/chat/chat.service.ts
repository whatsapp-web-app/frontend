import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "../../utils/baseQuery.ts";

const chatService=createApi({
    reducerPath:"chatService",
    baseQuery:baseQueryWithReAuth,
    endpoints:(builder)=>( {
        findAllChats:builder.query<FindAllChatResponse,void>({
            query:()=>({
                url:"/chat",
                method:"GET"
            })
        })
    })
})


export const {useFindAllChatsQuery}=chatService
export default chatService
