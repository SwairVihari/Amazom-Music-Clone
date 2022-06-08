import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Styles from "./LoginScreen.module.css"
import logo from "../../Asset/images/logo.svg"
import { login } from '../../features/authentication/authSlice'
const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {profile,loading,error} = useSelector(store => store.auth)

    const loginWithGoogleHandler = () => {
        dispatch(login());
    }

    useEffect(()=>{
        if(profile){
            navigate("/home")
        }
    },[profile])


  return (
    <div className={Styles.Container}>
        <div className={Styles.box}>
            <img className={Styles.logo} src={logo} alt="logo"/>
            <p className={Styles.heading}>Login to enjoy seemless Music experience</p>
            <button onClick={loginWithGoogleHandler} className={Styles.button}>Login with Google</button>
            <button className={Styles.guestbutton}>Guest User</button>
        </div>
    </div>
  )
}

export default LoginScreen