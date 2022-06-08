import React,{useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import './App.css';
import LoginScreen from './Components/Login/LoginScreen';
import { loadUser } from './features/authentication/authSlice';
import Podcast from './Components/Podcast/Podcast';
import Library from './Components/Library/Library';
import Playlist from './Components/Playlist/Playlist';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import MediaPlayer from './Components/MediaPlayer/MediaPlayer';


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {profile,loading,error} = useSelector(store => store.auth)
  const {isPlaying, currentMusic} = useSelector(store => store.mediaPlayer)
  useEffect(()=>{
    dispatch(loadUser())
  },[])

  useEffect(()=>{
    if(!profile){
      navigate("/")
    }
  },[profile,loading,navigate])

  return (
    <>
    {profile && <Navbar/>}
    <Routes>
      <Route path='/' element={<LoginScreen/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/podcast' element={<Podcast/>}/>
      <Route path='/library' element={<Library/>}/>
      <Route path='/playlist' element={<Playlist/>}/>
    </Routes>
    {isPlaying && <MediaPlayer/>}
    </>
  );
}

export default App;
