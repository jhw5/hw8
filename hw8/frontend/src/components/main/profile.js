/**
 * Created by Jeffrey on 10/24/2016.
 */


import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { update_headline , uploadAvatar, unfollow, add_follower} from '../../actions'

export const Prof = ({update_head, headline, avatar, update_Avatar}) => {
    let newHeadline;

    const _updateHeadlines = () => {
        if (newHeadline && newHeadline.value) {
            // update_headline(newHeadline.value)
            update_head(newHeadline.value)
            newHeadline.value=''
        }
    }
    return (
        <div>
            <div className="container col-md-3">
                <img src={avatar} class="img-responsive" width="160px"/>
            </div>
            <input type="file" accept="image/*" onChange={(e) =>update_Avatar(e)} />

            <p>{headline}</p>
            <input type="text" placeholder="Update status..." ref={ (node) => newHeadline = node } />
            <button onClick={() => _updateHeadlines(newHeadline)}>Update</button>
        </div>
    )
}

export const Followers = ({followers, unfollow}) => {

    const _follow = ({username, avatar, headline}) => {
        return (
            <div>
                <img src={avatar} width="10%"/>
                <p>{username}</p>
                <p>{headline}</p>
                <button onClick={()=> unfollow(username)}>UNFOLLOW</button>
            </div>
        )
    }


    return (
        <div>
            {followers.map(x =>_follow(x))}
        </div>
    )
}
export const Profile = ({update_head, headline, avatar, followers, username, update_Avatar, unfollow, add_follower }) => {
    let something;
    return (
        <div>
            <Prof update_head={update_head} headline={headline} avatar={avatar} update_Avatar={update_Avatar} />

            <Followers followers={followers} unfollow={unfollow} />
            
            <input type="text" ref={node => something = node} />
            <button onClick={() => add_follower(something.value)}>ADD FOLLOWER</button>
        </div>
    )
}



export default connect(
    (state) => {
        return {
            username : state.profile.username,
            headline : state.profile.headline,
            avatar : state.profile.avatar,
            followers : state.followers.followers,
        }
    },
    (dispatch) => {
        return {
            update_head: (headline) => dispatch(update_headline(headline)),
            update_Avatar: (file) => dispatch(uploadAvatar(file)),
            unfollow: (username) => dispatch(unfollow(username)),
            add_follower: (username) => dispatch(add_follower(username))
        }
    }
)(Profile)







// update_head: (headline) => dispatch({ type: 'UPDATE_HEADLINE', headline })









// <div className = "text-center">
//     <img className="col-md-12" src={this.props.avatar} />
// <div><h2>{this.props.headline}</h2></div>
//
// <input type="text" placeholder="Update Status..."
// ref={(data) => {this.nextStatus = data}} />
//
// <input type="button" value="Update" onClick={ () => {
//     this.props.dispatch(update_headline(this.nextStatus.value))
//     this.nextStatus.value = ''
// }} />
//
// </div>





//
// /**
//  * Created by Jeffrey on 10/24/2016.
//  */
//
//
// import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { update_headline, get_followers } from '../../actions'
//
// export const Prof = ({username, update_headline, avatar, followers, avatars}) => {
//     let newHeadline;
//
//     const _updateHeadlines = () => {
//         if (newHeadline && newHeadline.value) {
//             upda
//         }
//     }
//     return (
//         <div>
//             <p>{followers}</p>
//             <p></p>
//         </div>
//     )
// }
// class Profile extends Component {
//     render() {
//         return (
//             <div>
//                 <div className = "text-center">
//                     <h4>Welcome</h4>
//                     <h5>{this.props.username}</h5>
//                 </div>
//                 <div className = "text-center">
//                     <img className="col-md-12" src={this.props.avatar} />
//                     <div><h2>{this.props.headline}</h2></div>
//
//                     <input type="text" placeholder="Update Status..."
//                            ref={(data) => {this.nextStatus = data}} />
//
//                     <input type="button" value="Update" onClick={ () => {
//                     this.props.dispatch(update_headline(this.nextStatus.value))
//                     this.nextStatus.value = ''
//                     }} />
//
//                 </div>
//                 <Prof />
//             </div>
//         )
//     }
// }
//
// export default connect(
//     (state) => {
//         return {
//             username : state.profile.username,
//             headline : state.profile.headline,
//             avatar : state.profile.avatar,
//             followers : state.followers.following,
//             avatars : state.followers.avatars
//
//         }
//     }, action
// )(Profile)

















