import React from 'react'
import Styles from './Navbar.module.css'
import logo from '../../Asset/images/logo.svg'
import {AiFillHome} from 'react-icons/ai'
import {FaPodcast} from 'react-icons/fa'
import {ImHeadphones} from 'react-icons/im'
import {FaUserCircle} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();

    const routeHandler = (route) => {
        navigate(route)
    }
  return (
    <>
    <div className={Styles.Container}>
        <div className={Styles.logoContainer}>
            <img src={logo} alt="Logo"/>
        </div>
        
        <div className={Styles.Navbar}>
        <div className={Styles.Navitems}>
                <div onClick={()=>{routeHandler("/home")}} className={Styles.Navitem}>
                    <AiFillHome/>
                    <div className={Styles.NavitemText}>Home</div>
                </div>

                <div onClick={()=>{routeHandler("/podcast")}} className={Styles.Navitem}>
                    <FaPodcast/>
                    <div className={Styles.NavitemText}>Podcasts</div>
                </div>

                <div onClick={()=>{routeHandler("/library")}} className={Styles.Navitem}>
                    <ImHeadphones/>
                    <div className={Styles.NavitemText}>Library</div>
                </div>
        </div>

        <div className={Styles.userDetails}>
            <FaUserCircle/>
        </div>
    </div>
    </div>
    </>
  )
}

export default Navbar