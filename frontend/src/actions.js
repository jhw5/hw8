/**
 * Created by Jeffrey on 10/24/2016.
 */

// export const url =  'https://webdev-dummy.herokuapp.com';
export const url =  'https://glambition.herokuapp.com/';

// export const url =  'http://localhost:3000';


const Action = {
    NAV_PROFILE : 'NAV_PROFILE',
    NAV_MAIN : 'NAV_MAIN',
    NAV_LANDING : 'NAV_LANDING',
    UPDATE_HEADLINE : 'UPDATE_HEADLINE',
    UPDATE_PROFILE : 'UPDATE_PROFILE',
    LOCAL_LOGIN : 'LOCAL_LOGIN',
    GET_FOLLOWERS : 'GET_FOLLOWERS',
    GET_ARTICLES : 'GET_ARTICLES',
    UNFOLLOW : 'UNFOLLOW'
}
export default Action

const resource = (method, endpoint, payload) => {
    const options =  {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (payload) options.body = JSON.stringify(payload)

    console.log('The options for ', endpoint, options)
    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                // useful for debugging, but remove in production
                console.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
        .catch(err => console.error(err))
}


export function local_login(username, password) {
    return (dispatch) => resource('POST', 'login', {username , password})
        .then(r => {
            dispatch({
                type : Action.LOCAL_LOGIN,
                username : r.username,
            })
            dispatch(currentState())
        })
}

export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then(r => {
                dispatch({type : Action.NAV_LANDING})
            }
        )
    }
}


export function update_profile ({zipcode, email, password, passconf}) {
    return (dispatch) => {
        dispatch (update_values('zipcode', zipcode))
        dispatch (update_values('email', email))
        dispatch (update_values('password', password))
        // dispatch (update_values('passconf', passconf))

    }
}
export function update_headline(headline) {
    return (dispatch) => {
        dispatch (update_values('headline', headline))
    }
}



export function update_values (key, value) {
    return (dispatch) => {
        if (value) {
            const payload = {}
            payload[key] = value
            resource('PUT', key, payload).then((r) => {
                const action = {type : Action.UPDATE_PROFILE}
                action[key] = r[key]
                dispatch(action)
            })
        }
    }
}

export function unfollow(username) {
    return (dispatch) => {
        resource('DELETE', 'following/'+username).then(r =>{
            dispatch(get_followers())
        })
    }
}

export function add_follower(username) {
    return (dispatch) => {
        resource('PUT', 'following/'+username).then(r => {
            dispatch(get_followers())
        })
    }
}

export function add_article(payload) {
    return (dispatch) => {
        resource('POST', 'article', payload).then(r => {
            dispatch(get_articles())
        })
    }
}

export function add_comment(id, payload) {
    return (dispatch) => {
        resource('PUT', 'articles/'+id, payload).then(r => {
            dispatch(get_articles())
        })
    }
}

export function edit_comment(id, payload) {
    return (dispatch) => {
        resource('PUT', 'articles/'+id, payload).then(r => {
            dispatch(get_articles())
        })
    }
}

export function edit_article(id, payload) {
    return (dispatch) => {
        resource('PUT', 'articles/'+id, payload).then(r => {
            dispatch(get_articles())
        })
    }
}

export function get_profile() {
    return (dispatch) => {
        dispatch(get_values('avatars'))
        dispatch(get_values('zipcode'))
        dispatch(get_values('email'))
    }
}

export function get_values(key) {
    return (dispatch) => {
        resource('GET', key).then(r =>{
            const action = {type : Action.UPDATE_PROFILE}
            switch (key) {
                case 'avatars' :
                    action.avatar = r.avatars[0].avatar;
                case 'zipcode' :
                    action.zipcode = r.zipcode;
                case 'email' :
                    action.email = r.email; 
            } dispatch(action)
        })
    }
}

export function get_followers() {
    return (dispatch) => {
        resource('GET', 'following').then(r => {
            dispatch({
                type : Action.GET_FOLLOWERS,
                followers : r.following
            })
            Promise.all([
                resource('GET', 'avatars/'+r.following.join(',')).then(r => r.avatars),
                resource('GET', 'headlines/'+r.following.join(',')).then(r => r.headlines)
            ]).then(results => {
                //two arrays
                // results = [avatar, headlines]
                // follower = [{username, avatar, headline}]


                const followers = results[0].map(x => {
                    const res = results[1].filter(y => y.username == x.username)
                    if (res.length != 0) {
                        return {...x, headline : res[0].headline}
                    } else {
                        return x
                    }
                })
                console.log(followers)
                dispatch({
                    type: Action.GET_FOLLOWERS,
                    followers
                })
            })
        })
    }
}


export function get_articles() {
    return (dispatch) => {
        resource('GET', 'articles').then( r => {
            dispatch({
                type: Action.GET_ARTICLES,
                articles: r.articles
            })
        })
        }
    }


export function validation({username, email, zipcode, password, passwordC}) {
    return (dispatch) => {
        if (!username || !email || !zipcode || !password || !passwordC) {
            return "all fields need to be filled out"
        }
        if (username) {
            if (username.match(/.*$/) == false) {
                return "INVALID USERNAME"
            }
        }
        if (email) {
            if (email.match(/(.*)+[@]+(.*)[.]+(.*)$/) == false) {
                return "INVALID EMAIL"
            }
        }
        if (zipcode) {
            if (zipcode.match(/\d\d\d\d\d$/) == false) {
                return "INVALID ZIPCODE"
            }
        }
        if (password || passwardC) {
            if (passowrd != passwordC) {
                return "PASSWORDS MUST MATCH"
            }
        }
        return ''
    }
}



export function registration(username, email, zipcode, password, passwordC) {
    return (dispatch) => {
        const message = ''
            // validation(username, email, zipcode, password, passwordC)
        if (message.length != 0) {
            return "registration fail"
        } else{
            const payload = {username, email, zipcode, password, passwordC}
            resource('POST', 'register', payload).then(r => {
                console.log('register response', r)
                // return dispatch({})
            })
        }

    }
}

export function uploadAvatar(pic) {
    return (dispatch) => {
        if (pic) {
            console.log("this is the pic" + pic.target.files[0])
            const formData = new FormData()
            formData.append('image', pic.target.files[0])
            const KEYS = formData.get('image').toString()
            console.log('this is formData.get(image): ' + KEYS)
            for (var value of formData.values()) {
                console.log(value);
            }

            const endpoint = 'avatar'
            fetch(`${url}/${endpoint}`, {credentials: 'include', method : 'PUT', body : formData})


            // resource('PUT', 'avatar', formData, false).then(r => {
            //     dispatch({type : Action.UPDATE_PROFILE, avatar: r.avatar})
            // })
        }
    }
}


export function currentState() {
    return (dispatch) => {
        resource('GET', 'headlines').then((r) => {
            dispatch({
                type : Action.UPDATE_HEADLINE,
                username : r.headlines[0].username,
                headline : r.headlines[0].headline
            })
            dispatch({type : Action.NAV_MAIN})
            dispatch(get_profile())
            dispatch(get_followers())
            dispatch(get_articles())
        })
    }
}

