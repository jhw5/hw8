/**
 * Created by Jeffrey on 10/24/2016.
 */


import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


export const Search = () => (
    <div>
        <input type="text" placeholder="Search Articles..."></input>
        <input type="button" value="Search"/>
    </div>
)

export default connect()(Search)
// registration.propTypes = {
//     todoItems: PropTypes.arrayOf(PropTypes.shape({
//         ...ToDoItem.propTypes
//     }).isRequired).isRequired,
//     addTodo: PropTypes.func.isRequired
// }

// export default connect(
//     (state) => {
//         return {
//             todoItems: filterTodos(state.todoItems, state.visibilityFilter)
//         }
//     },
//     (dispatch) => {
//         return {
//             addTodo: (text) => dispatch({ type: 'ADD_TODO', text })
//         }
//     }
// )(Landing)






