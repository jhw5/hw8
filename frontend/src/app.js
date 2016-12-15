import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Landing from './components/auth/landing'
import Main from './components/main/main'
import Profile from './components/profile/profile'



export const App = ({location}) => {
    let page
    if (location=='PROFILE') {
        page = <Profile />
    }
    else if (location=='MAIN') {
        page = <Main />
    }
    else {
        page = <Landing />
    }
    return (
        <div className="container-fluid">
            {page}
        </div>
    )
}


export default connect(
    (state) => {
        return {
            location: state.general.page
        }
    }
)(App)

