import {createSlice} from '@reduxjs/toolkit'
const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state,action)=>{
            console.log("login started")
            state.isFetching=true
        },
        loginSuccess:(state,action)=>{
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginFailure:(state,action)=>{
            state.isFetching=false
            state.error =true
        },
        logOut:(state,action)=>{
            state.currentUser=null
            state.isFetching=false
            state.error=false
        }
    }
})

export const {loginStart,loginSuccess,loginFailure,logOut} = userSlice.actions
export default userSlice.reducer;