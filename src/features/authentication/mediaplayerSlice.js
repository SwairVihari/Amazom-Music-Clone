 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying:false,
    currentMusic:null,
}

const mediaPlayerSlice = createSlice({
    name:'mediaPlayer',
    initialState,
    reducers:{
        startPlay:(state,action)=>{
            state.isPlaying=true;
            state.currentMusic=action.payload
        }
    }
})

export default mediaPlayerSlice.reducer;
console.log(mediaPlayerSlice)
export const {startPlay} = mediaPlayerSlice.actions
