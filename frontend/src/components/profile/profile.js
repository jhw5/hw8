/**
 * Created by Jeffrey on 10/24/2016.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Update from './update'
import Nav from '../main/nav'


export const Profile = () => (
    <div>
        <Nav />
        <div className="text-center">
            <Update />
        </div>

    </div>
)

export default Profile