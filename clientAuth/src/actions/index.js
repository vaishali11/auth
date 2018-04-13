import axios from 'axios'
import { browserHistory } from 'react-router'
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER} from './types'
const API_URL = 'http://localhost:3090'


export const signinUser = ({email, password}) => (dispatch) =>{
  //if requst is good
    //update the state
    //save jwt token
    ///redirect to the route
    axios.post(`${API_URL}/signin`, {email, password})
    .then((res) => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', res.data.token)
        browserHistory.push('/feature')
    })
    .catch((err) => {
        dispatch(authError('Bad Login info'))
    })
}

export const authError = (error) =>{
    return {
        type: AUTH_ERROR,
        payload: error,
    }
}

export const signoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch({ type: UNAUTH_USER })
  }
}

export const signupUser = ({email, password}) => (dispatch) => {
  axios.post(`${API_URL}/signup`, {email, password})
  .then((res) => {
    dispatch({ type: AUTH_USER })
    localStorage.setItem('token', res.data.token)
    browserHistory.push('/feature')
  })
  .catch((err) => {
    dispatch(authError('Email is in use'))
  })
}
