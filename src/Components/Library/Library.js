import React from 'react'
import Styles from './Library.module.css'
import { useSelector, useDispatch } from 'react-redux'
import MusicCard from '../MusicCard/MusicCard'
const Library = () => {
  const {savedMusic, savedPodcast} = useSelector(store => store.library)
  return (
    <>
    <h3 className={Styles.Header}> Saved Music </h3>
    <div className={Styles.CardContainer}>
    {
    
      savedMusic.map((item)=> <MusicCard id={item.id} category={item.category} img={item.img} author_name={item.author_name} musicName={item.musicName} name={item.name} />)
    }
    </div>

    <h3 className={Styles.Header}> Saved Podcast </h3>
    <div className={Styles.CardContainer}>
    {
    
      savedPodcast.map((item)=> <MusicCard id={item.id} category={item.category} img={item.img} author_name={item.author_name} musicName={item.musicName} name={item.name} />)
    }
    </div>
    </>
  )
}

export default Library