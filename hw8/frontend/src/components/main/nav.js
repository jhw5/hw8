/**
 * Created by Jeffrey on 10/24/2016.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions'



export const Nav = ({dispatch}) => (
    <div>
        <button onClick={() => {dispatch({type:"NAV_MAIN"})}}>
            Home
        </button>
        <button onClick={() => {dispatch({type:"NAV_PROFILE"})}}>
            Profile
        </button>
        <input type="button" onClick={() => {dispatch(logout())}} value="LOGOUT"/>
    </div>

)

export default connect() (Nav)