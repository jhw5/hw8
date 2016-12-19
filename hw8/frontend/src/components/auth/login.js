/**
 * Created by Jeffrey on 10/24/2016.
 */
/**
 * Created by Jeffrey on 10/23/2016.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {local_login} from '../../actions'


const Login = ({dispatch}) => {
    let username, password
    return (
        <div>
            <h1>Login</h1>
            <div>
                <p>Username</p>
                <input ref={(data) => {username = data}}></input>
            </div>
            <div>
                <p>Password</p>
                <input ref={(data) => {password = data}}></input>
            </div>
            <div>
                <input type="button" 
                       onClick={() => {dispatch(local_login(username.value, password.value))}} value="LOGIN"/>
            </div>
        </div>
    )
}



export default connect() (Login)





//export { url, login, logout }