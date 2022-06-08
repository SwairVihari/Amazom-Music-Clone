import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authentication/authSlice'
import mediaPlayerReducer from "./features/authentication/mediaplayerSlice";
import saveReducer from "./features/Library/saveSlice";
export const store = configureStore({
    reducer:{
        mediaPlayer:mediaPlayerReducer,
        auth:authReducer,
        library:saveReducer
    }
})