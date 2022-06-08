import { Slider } from '@mui/material'
import React,{useRef, useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {BsPlayCircleFill} from 'react-icons/bs'
import {BsPauseCircleFill} from 'react-icons/bs'
import {MdSkipNext, MdSkipPrevious} from 'react-icons/md'
import {ImVolumeHigh} from 'react-icons/im';
import {ImVolumeLow} from 'react-icons/im';
import {AiFillSave, AiOutlineSave} from 'react-icons/ai'
import {ImLoop} from 'react-icons/im'
import Styles from './MediaPlayer.module.css'
import music from '../../db/music'
import { startPlay } from '../../features/authentication/mediaplayerSlice'
import { addMusic, addPodcast } from '../../features/Library/saveSlice'
import podcastDB from '../../db/podcast'


const MediaPlayer = () => {
    const [isPlayingPause, setIsPlayingPause] = useState(false);
    const [seekTime, setSeekTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isRepeatClicked, setIsRepeatClicked] = useState(false)
    const [currentMusicData, setCurrentMusicData] = useState(false)
    const [isBanner, setIsBanner] = useState(false)
    const [volume, setVolume] = useState(50);
    const [isSaved, setIsSaved] = useState(false)
    const audioElement = useRef();
    const dispatch = useDispatch();

    const {currentMusic} = useSelector(store=>store.mediaPlayer)
    const {savedMusic, savedPodcast} = useSelector(store => store.library)

    useEffect(()=>{
      setInterval(()=>{
        if(audioElement.current !== null){
          setCurrentTime(audioElement.current.currentTime)
        }
      })
    })



    useEffect(()=>{
      
      if(currentMusic.category==="music"){
      let musicdata = music.filter((item)=>item.id===currentMusic.id)[0]
      setCurrentMusicData(musicdata)
      }
      
      if(currentMusic.category==="podcast"){
      let musicdata = podcastDB.filter((item)=>item.id===currentMusic.id)[0]
      setCurrentMusicData(musicdata)
      }
      console.log(currentMusicData)
    },[currentMusic,currentMusicData])

    useEffect(()=>{
      audioElement.current.onloadeddata = () => {
        if (audioElement.current != null)
            setDuration(audioElement.current.duration)
    };
    },[duration])

    useEffect(()=>{
      isPlayingPause ? audioElement.current.play().then(()=>{}): audioElement.current.pause()
      audioElement.current.loop = isRepeatClicked;
      audioElement.current.volume = volume / 100;
      
    })

    

    const seekChangeHandler = (event) => {
          audioElement.current.currentTime =(event.target.value*(duration/100));
          setSeekTime(currentTime)
      }

    
      useEffect(()=>{
        setSeekTime(currentTime/(duration/100))
      },[currentTime,duration])
    
      function formatTime(secs) {
        const t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        let s = t.toTimeString().substr(0, 8);
        if (secs > 86399)
            s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
        return s.substring(3);
    }

  const audioPlayPauseHandler = ()=>{
    let prevState = isPlayingPause
    setIsPlayingPause(!prevState)
  }

  const NextSongHandler = () =>{
    if(currentMusic.id===(music.length-1)){
     let data = music[0]
      dispatch(startPlay({...data}))
    }
    else{
    const data = music.filter((item)=>item.id===currentMusic.id+1)[0];
    dispatch(startPlay({...data}))
    }
  }

  const PrevSongHandler = () =>{
    if(currentMusic.id===0){
     let data = music[0]
      dispatch(startPlay({...data}))
    }
    else{
    const data = music.filter((item)=>item.id===currentMusic.id-1)[0];
    dispatch(startPlay({...data}))
    }
  }

  const IsRepeatedHandler = () => {
    setIsRepeatClicked(!isRepeatClicked)
  }

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const bannerHandler = () => {
    setIsBanner(!isBanner);
  }

  const saveHandler = () => {
    console.log(currentMusicData.category);
    if(currentMusicData.category==="music"){
    dispatch(addMusic(currentMusicData))
    }
    if(currentMusicData.category==="podcast"){
      dispatch(addPodcast(currentMusicData))
    }
  }

  return (
    <>
    {
    isBanner && <div className={Styles.banner}>
      <div className={Styles.bannerOverlay}></div>
     {
      currentMusicData && <img src={require(`../../Asset/album/img/${currentMusicData.img}`)} alt="logo"/>
    } 

{
      currentMusicData && <img className={Styles.bannerSmallImage} src={require(`../../Asset/album/img/${currentMusicData.img}`)} alt="logo"/>
    } 
       
    </div>
    }
       <div className={Styles.Container}>
        <audio ref={audioElement} src={require(`../../Asset/album/music/${currentMusic.musicName}`)} preload='metadata' />
         {!isNaN(seekTime) && <Slider style={{position:"fixed", padding:"0"}} size='small' aria-label="small" valueLabelDisplay="on" value={seekTime} onChange={seekChangeHandler}/>}
        {
          currentMusic && (
        <div className={Styles.part1}>
        <img onClick={bannerHandler} className={Styles.mediaPlayerImg} src={require(`../../Asset/album/img/${currentMusic.img}`)} alt="logo"/>
         <div className={Styles.mediaPlayerTextContainer}>       
        <p className={Styles.mediaPlayerMusicName}>{currentMusic.name}</p>
        <p className={Styles.mediaPlayerAuthorName}>{currentMusic.author_name}</p>
        </div>      
        </div>)
}

        <div className={Styles.part2}>
          <ImLoop
          style={{color:`${isRepeatClicked ? 'blue' : 'white'}`}}
          onClick={IsRepeatedHandler}
           className={Styles.loop}
           onMouseOver={({target})=>target.style.color="#159FBF"}
          onMouseOut={({target})=>target.style.color=`${ isRepeatClicked ? `159FBF` : 'white'}`}/>
          <MdSkipPrevious
          onMouseOver={({target})=>target.style.color="#159FBF"}
          onMouseOut={({target})=>target.style.color="white"}
           onClick={PrevSongHandler} className={Styles.playpause}/>
          {
            !isPlayingPause ? 
            <BsPlayCircleFill
            onMouseOver={({target})=>target.style.color="#159FBF"}
            onMouseOut={({target})=>target.style.color="white"} 
             onClick={audioPlayPauseHandler} className={Styles.playpause}/> : 
             <BsPauseCircleFill
             onMouseOver={({target})=>target.style.color="#159FBF"}
             onMouseOut={({target})=>target.style.color="white"}
              onClick={audioPlayPauseHandler} className={Styles.playpause}/>
          }
           <MdSkipNext
           onMouseOver={({target})=>target.style.color="#159FBF"}
           onMouseOut={({target})=>target.style.color="white"}
           onClick={NextSongHandler} className={Styles.playpause}/>

        <ImLoop
          style={{color:`${isRepeatClicked ? 'blue' : 'white'}`}}
          onClick={IsRepeatedHandler}
           className={Styles.loop}
           onMouseOver={({target})=>target.style.color="#159FBF"}
          onMouseOut={({target})=>target.style.color=`${ isRepeatClicked ? `159FBF` : 'white'}`}/>
        
        </div>

        <div className={Styles.part3}>
          <div onClick={saveHandler}>
          {!isSaved ? <AiFillSave className={Styles.volume}/> : <AiOutlineSave/>}
          </div>
        <ImVolumeLow className={Styles.volume} />
        <Slider className={Styles.Volumebar} aria-label="Volume" value={volume} onChange={handleVolumeChange}  />
        <ImVolumeHigh className={Styles.volume} />
        </div>
    </div>
    
  
    </>
  )
}

export default MediaPlayer