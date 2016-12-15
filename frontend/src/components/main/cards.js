/**
 * Created by Jeffrey on 10/24/2016.
 */


import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { add_article, add_comment, edit_article, edit_comment } from '../../actions'


export const Articles = ({articles, add_comment, edit_comment, edit_articles, username}) => {

    const _editComment = (x_id, commentId, author) => {
        const booleanValue = (username === author) ? true : false;
        let update;
        if (booleanValue) {
            return (
                <div>
                    <input placeholder="Edit this comment..." type="text" ref={(node) => update=node} />
                    <button onClick={() => edit_comment(x_id, {text:update.value, commentId:commentId})}> Edit comment </button>
                </div>
            )
        }
    }


    const _comments = (c, x_id) => {
        return (
            <div>
                <h5>{c.author} COMMENTS: </h5>
                <h6>{c.text}</h6>
                {_editComment(x_id, c.commentId, c.author)}
            </div>
        )
    }
    const _editArticle = (x_id, author) => {
        const booleanValue = (username === author) ? true : false;
        let edit_post;
        if (booleanValue) {
            return (
                <div>
                    <input placeholder="Edit post..." type="text" ref={(node) => edit_post=node} />
                    <button onClick={() => edit_articles(x_id, {text: edit_post.value})}>Edit post</button>
                </div>
            )
        }
    }


    const _articles = (x) => {
        let comment;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <h2>
                        <small>{x.author}: </small>
                        {x.text}
                    </h2>

                    <img src={x.img} />
                    {_editArticle(x._id, x.author)}
                </div>
                <div className="panel-body">
                    {x.comments.map(c => _comments(c, x._id))}
                </div>
                <input type="text" placeholder="Comment on this..." size="50" ref={(node) => comment=node} />
                <button onClick={() => add_comment(x._id, {text:comment.value, commentId:-1})}>Comment</button>
            </div>
        )
    }


    return (
        <div>
            {articles.map(x => _articles(x))}
        </div>
    )
}


export const Cards = ({articles, add_article, add_comment, edit_comment, edit_article, username}) => {
    let status;
    return (
        <div>
            <input placeholder="Say something..." type="text" ref={(node) => status=node} />
            <button onClick={() => add_article({text:status.value})}>Add Article</button>
            <div className="panel group" >
                <Articles articles={articles} add_comment={add_comment}
                          edit_articles={edit_article} edit_comment={edit_comment} username={username} />
            </div>

        </div>
    )
}



export default connect(
    (state) => {
        return {
            username : state.profile.username,
            articles : state.articles.articles
        }
    },
    (dispatch) => {
        return {
            add_article : (payload) => dispatch(add_article(payload)),
            add_comment : (id, payload) => dispatch(add_comment(id, payload)),
            edit_article : (id, payload) => dispatch(edit_article(id, payload)),
            edit_comment : (id, payload) => dispatch(edit_comment(id, payload))
        }
    }
)(Cards)





