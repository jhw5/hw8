/**
 * Created by Jeffrey on 10/24/2016.
 */


import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Registration from './registration'


export const Landing = () => (
    <div className = "row">
        <div className = "text-center col-md-4">
            <Registration></Registration>
        </div>
        <div className = "text-center col-md-4">
            <Login></Login>
        </div>

    </div>
)

export default Landing



