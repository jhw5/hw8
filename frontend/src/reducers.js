
import Action from './actions'
import { combineReducers } from 'redux'


function general(state = {page:''}, action) {
	switch (action.type) {
		case Action.NAV_PROFILE:
			return {...state, page: 'PROFILE'}
		case Action.NAV_MAIN:
			return {...state, page: 'MAIN'}
		case Action.NAV_LANDING:
			return {...state, page: 'LANDING'}
		default:
			return {...state}
	}
}

 
function profile(state = {username:'', email:'', headline:'', avatar:'', zipcode:''}, action) {
	switch (action.type) {
		case Action.UPDATE_PROFILE:
			if (action.headline) {
				return {...state, headline : action.headline}
			}
			if (action.email) {
				return {...state, email : action.email}
			}
			if (action.zipcode) {
				return {...state, zipcode : action.zipcode}
			}
			if (action.avatar) {
				return {...state, avatar : action.avatar}
			}
			if (action.username) {
				return {...state, username : action.username}
			}
			

		case Action.UPDATE_HEADLINE:
			return {...state,
				username : action.username, headline: action.headline
			}

		case Action.LOCAL_LOGIN:
			return {...state,
				username : action.username, headline: action.headline
			}
		default:
			return state
	}
}

function followers(state = {followers:[]}, action) {
	switch (action.type) {
		case Action.GET_FOLLOWERS:
				return {...state, followers: action.followers}

		default:
			return state
	}
}

function articles(state = {articles:[], avatar:[]}, action) {
	switch (action.type) {
		case Action.GET_ARTICLES:
			if (action.articles) {
				return {...state, articles: action.articles}
			}
		
		default:
			return state
	}
}


const Reducer = combineReducers({
	general, profile, followers, articles
})


export default Reducer

