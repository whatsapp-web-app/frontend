import {createSlice} from "@reduxjs/toolkit";

const initialState:AuthState={
    isAuthenticated:false,
    user:null,
    token:''
}

const authSlice=createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        login:(state,action:{payload:LoginResponse})=>{
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.token=action.payload.access_token
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            state.user=null;
            state.token=''
        }
    }
})


export default authSlice;
export const AuthActions=authSlice.actions;
