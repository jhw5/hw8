/**
 * Created by Jeffrey on 10/24/2016.
 */
/**
 * Created by Jeffrey on 10/24/2016.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { update_profile } from '../../actions'




class Update extends Component {

    render() {
        return (
            <div>
                <img src={this.props.oldAvatar}/>

                <h1>Update Information</h1>
                <div>
                    <p>Email</p>
                    <input type="text" placeholder={this.props.oldEmail} ref={(node) => {this.newEmail = node}}/>
                    <p>Zip Code</p>
                    <input type="text" placeholder={this.props.oldZip} ref={(node) => {this.newZip = node}}/>
                    <p>Password</p>
                    <input type="text" placeholder="Password" ref={(node) => {this.newPassword = node}}/>
                    <p>Password Confirmation</p>
                    <input type="text" placeholder="Password" ref={(node) => {this.newPassconf = node}}/>

                </div>

                <input type="button" value="Update" onClick={ () => {
                    const payload = {
                        email : this.newEmail.value == this.props.oldEmail ? '' : this.newEmail.value,
                        zipcode : this.newZip.value == this.props.oldZip ? '' : this.newZip.value,
                        password : this.newPassword.value == this.props.oldPassword ? '' : this.newPassword.value,
                        passconf : this.newPassconf.value == this.props.oldPasswordconf ? '' : this.newPassconf.value
                    }
                    this.props.dispatch(update_profile(payload))
                    this.newEmail.value = null
                    this.newZip.value = null
                    this.newPassword.value = null
                    this.newPassconf.value = null

                }} />
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            oldEmail : state.profile.email,
            oldZip : state.profile.zipcode,
            oldPassword : state.profile.password,
            oldPasswordconf : state.profile.passconf,
            oldAvatar : state.profile.avatar
        }
    }
)(Update)





