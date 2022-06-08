import React from 'react'
import Styles from './Podcast.module.css'
import podcast from '../../db/podcast'
import MusicCard from '../MusicCard/MusicCard'
const Podcast = () => {

  return (
    <>
    <h3 className={Styles.Header}> Podcast You Might Like </h3>
    <div className={Styles.CardContainer}>
    {
    
      podcast.map((item)=> <MusicCard category={item.category} id={item.id} img={item.img} author_name={item.author_name} musicName={item.musicName} name={item.name} />)
    }
    </div>
    </>
  )
}

export default Podcast