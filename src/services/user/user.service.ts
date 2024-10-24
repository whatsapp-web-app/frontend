import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "../../utils/baseQuery.ts";


const userService=createApi({
    reducerPath:'userService',
    baseQuery:baseQueryWithReAuth,
    endpoints:(builder)=>({
        searchUser:builder.query<Array<User>,string>({
            query:(q)=>({
                url:`user/search/${q}`,
                method:'GET'
            })
        })
    })
})


export const {useLazySearchUserQuery}=userService
export default userService
