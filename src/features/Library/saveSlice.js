import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savedMusic:[],
    savedPodcast:[]
}

const saveSlice = createSlice({
    name:'mediaPlayer',
    initialState,
    reducers:{
        addMusic:(state,action)=>{
            state.savedMusic.push(action.payload)
        },

        addPodcast:(state,action)=>{
            state.savedPodcast.push(action.payload)
        }
    }
})

export default saveSlice.reducer;
console.log(saveSlice)
export const {addMusic,addPodcast} = saveSlice.actions
