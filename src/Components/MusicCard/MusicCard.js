import React from 'react'
import { useDispatch } from 'react-redux'
import  {startPlay}  from '../../features/authentication/mediaplayerSlice'
import Styles from "./MusicCard.module.css"
import music from '../../db/music'

const MusicCard = ({id,author_name,musicName,name,img,category}) => {
  const dispatch = useDispatch()
  const mediaHandler = () => {
  console.log("media")
  dispatch(startPlay({id,author_name,musicName,name,id,img,category}))
}
  return (
      (<div onClick={mediaHandler} className={Styles.Card}>
        <div className={Styles.ImgContainer}>
            <img className={Styles.img} src={require(`../../Asset/album/img/${img}`)} alt="album"/>
        </div>

        <div className={Styles.Text}>
            <p className={Styles.name}>{name}</p>
            <p className={Styles.author}>{author_name}</p>
        </div>
    </div>)
  )
}

export default MusicCard