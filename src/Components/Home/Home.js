import React from 'react'
import Styles from './Home.module.css'
import music from '../../db/music'
import podcast from '../../db/podcast'
import MusicCard from '../MusicCard/MusicCard'
const Home = () => {

  return (
    <>
    <h3 className={Styles.Header}> Songs You Might Like </h3>
    <div className={Styles.CardContainer}>
    {
    
      music.map((item)=> <MusicCard id={item.id} category={item.category} img={item.img} author_name={item.author_name} musicName={item.musicName} name={item.name} />)
    }
    </div>

    <h3 className={Styles.Header}> Podcast You Might Like </h3>
    <div className={Styles.CardContainer}>
    {
    
      podcast.map((item)=> <MusicCard category={item.category} id={item.id} img={item.img} author_name={item.author_name} musicName={item.musicName} name={item.name} />)
    }
    </div>


    <h3 className={Styles.Header}> Songs </h3>
    <div className={Styles.CardContainer}>
    {
    
      music.map((item)=> <MusicCard category={item.category}  id={item.id} img={item.img} author_name={item.author_name} musicName={item.musicName} name={item.name} />)
    }
    </div>
    </>
  )
}

export default Home