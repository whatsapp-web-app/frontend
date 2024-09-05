import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "../../utils/baseQuery.ts";



const authService=createApi({
    reducerPath:'authApi',
    baseQuery:baseQueryWithReAuth,
    tagTypes:['auth'],
    endpoints:(builder)=>({
        login:builder.mutation<LoginResponse,LoginRequest>({
            query:(credentials)=>({
                url:'/auth/login',
                method:'POST',
                body:credentials
            })
        })
    })
})


export const {useLoginMutation}=authService;
export default authService;
