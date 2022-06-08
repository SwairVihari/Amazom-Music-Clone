import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { GoogleAuthProvider,signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export const login = createAsyncThunk('auth/login', 
async()=>{
    const provider = new GoogleAuthProvider();

        // provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")
        const res = await signInWithPopup(auth,provider);
        
        const accesToken = res.user.accessToken

        const profile = {
            name: res._tokenResponse.displayName,
            photoURL:res._tokenResponse.photoUrl,
        }

        sessionStorage.setItem("amc-access-token", accesToken)
        sessionStorage.setItem("amc-user", JSON.stringify(profile))
        
        return profile
})

export const loadUser = createAsyncThunk('auth/loadUser', 
()=>{
    let profile = sessionStorage.getItem("amc-user")

    if(profile){
        return profile
    }
    else{
        return null
    }
})

export const logout = createAsyncThunk('auth/logout', async()=>{
    await signOut(auth);
    sessionStorage.removeItem("amc-user");
    sessionStorage.removeItem("amc-access-token")
})



const initialState = {
    profile:null,
    loading:'',
    error:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,

    reducers:{
        clearErrors:(state)=>{
            state.error=null
        }
    },
      
    extraReducers:{
        [login.pending]:(state)=>{
            state.loading = true
        },
        [login.fulfilled]:(state,action)=>{
            state.loading = false
            state.profile = action.payload
        },
        [login.rejected]:(state)=>{
            state.loading=false
            state.error="There is Something Wrong"
        },

        [loadUser.pending]:(state)=>{
            state.loading = true
        },
        [loadUser.fulfilled]:(state,action)=>{
            state.loading = false
            state.profile = action.payload
        },
        [loadUser.rejected]:(state)=>{
            state.loading=false
            state.error="There is Something Wrong"
        },


        [logout.pending]:(state)=>{
            state.loading = true
        },
        [logout.fulfilled]:(state,action)=>{
            state.loading = false
            state.profile = null
        },
        [logout.rejected]:(state)=>{
            state.loading=false
            state.error="There is Something Wrong"
        },
    }

})

export default  authSlice.reducer 
export const {clearErrors} = authSlice.actions