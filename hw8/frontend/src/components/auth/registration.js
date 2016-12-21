/**
 * Created by Jeffrey on 10/24/2016.
 */
import React from 'React'
import { connect } from 'react-redux'
import { registration } from '../../actions'





export const Registration = ({register}) => {
    let username, email, zipcode, password, passwordC;
    return (
        <div>
            <h1>Register</h1>
            <form action="#">
                <p>Username</p>
                <input ref={node => username = node} />

                <p>Email Address</p>
                <input ref={node => email = node} />

                <p>Zip Code </p>
                <input ref={node => zipcode = node} />

                <p>Password </p>
                <input ref={node => password = node} />

                <p>Confirm Password </p>
                <input ref={node => passwordC = node} />

                <div>
                    <button onClick= { () => {register(username.value, email.value, zipcode.value, password.value, passwordC.value)}}>
                        Register
                    </button>
                </div>

            </form>
        </div>
    )
}

export default connect(
    null,
    (dispatch) => {
        return {
            register:
                (username, email, zipcode, password, passwordC) =>
                    dispatch(registration(username, email, zipcode, password, passwordC))
        }
    }
) (Registration)

// <input type="button" value="Update" onClick={ () => {
//     const payload = {
//         email : this.newEmail.value == this.props.oldEmail ? '' : this.newEmail.value,
//         zipcode : this.newZip.value == this.props.oldZip ? '' : this.newZip.value,
//         password : this.newPassword.value == this.props.oldPassword ? '' : this.newPassword.value,
//         passconf : this.newPassconf.value == this.props.oldPasswordconf ? '' : this.newPassconf.value
//     }
//     this.props.dispatch(update_profile(payload))
//     this.newEmail.value = null
//     this.newZip.value = null
//     this.newPassword.value = null
//     this.newPassconf.value = null
//
// }} />