//// NC NEWS SERVICES
/// SEND TO MODEL -->


/// # 000 - Hello
const { fetchHello } = require('../models/ncNews-Model');
exports.fetchHello = () => 
    {
        return fetchHello();
    }

/// 001 Topics

/// 002 ARTICLES
    /// FETCH ALL ARTICLES
const { fetchArticles } = require('../models/ncNews-Model');
exports.fetchArticles = () => 
    {
        return fetchArticles();
    }
    /// FETCH ARTICLE BY ID
const { fetchArticleByID } = require('../models/ncNews-Model')
exports.fetchArticleByID = (article_id) => 
    {
        return fetchArticleByID(article_id);
    }

    /// task 05 FETCH COMMENTS BY ARTICLE ID
const { fetchArticleComments } = require('../models/ncNews-Model')
exports.fetchArticleComments = (article_id) => 
    {
        return fetchArticleComments(article_id);
    }

    /// task 06 Post Comment to article ID
const { postCommentToArticleID } = require('../models/ncNews-Model')
exports.postCommentToArticleID = (article_id , newComment) => 
    {
        return postCommentToArticleID({ article_id , ...newComment});
    }

    /// task 07 - patch votes by article id
const { patchVotesByArticleID } = require("../models/ncNews-Model")
exports.patchVotesByArticleID = (article_id , newVotes) =>
{
    return patchVotesByArticleID(article_id , newVotes)
}

/// 003 USERS
const { fetchUsers } = require('../models/ncNews-Model')
exports.fetchUsers = () => 
    {
        return fetchUsers();
    }

/// 08. CORE: DELETE /api/comments/:comment_id
const { deleteCommentById: deleteCommentModel } = require('../models/ncNews-Model');
exports.deleteCommentById = (comment_id) => 
    {
        const id = parseInt(comment_id);
            
console.log("Deleting comment with id:", comment_id, "parsed as:", id);

            if(isNaN(id))
                {
                   const err = new Error("Bad request");
                   err.status = 400;
                   return Promise.reject(err);
                   
                    // return Promise.reject({ status: 400, msg: "Bad request"});
                }
            
        return Promise.resolve()
        .then(() => deleteCommentModel(id))
        .then((deletedComment)=>
            {
console.log("deleted comment from then block", deletedComment)

                if (!deletedComment) 
                {
                    const err = new Error("Comment not found");
                    err.status = 404;
                    return Promise.reject(err);
                    
                    // return Promise.reject(
                    //     {
                    //         status: 404,
                    //         msg: "Comment not found"
                    //     });
                }
                return deletedComment
            })
                .catch((err)=>
                    {
console.error("error in catch block", err)
                        throw err;
                    })
    }