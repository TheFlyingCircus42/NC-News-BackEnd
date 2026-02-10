//// NC NEWS CONTROLLER 
/// SEND TO SERVICES -->


/// # 000 - Hello
const { fetchHello } = require('../services/ncNews-Services')
exports.fetchHello = (request , response) => 
    {
        fetchHello()
        .then( hello => 
            {
                response.status(200)
                .send({hello});
            })
    }

/// # 001 - TOPICS --- AMMEND PATHS

/// 002 ARTILCES
    /// FETCH ALL ARTICLES 
const { fetchArticles } = require('../services/ncNews-Services')
exports.fetchArticles = (request , response) =>
    {
        fetchArticles()
        .then( articles => 
            {
                response.status(200)
                .send({ articles });
            })
    }
    /// FETCH ARTICLE BY ID
const { fetchArticleByID } = require('../services/ncNews-Services')
exports.fetchArticleByID = (request , response) => 
    {
        const { article_id } = request.params;

        fetchArticleByID(article_id)
        .then((article) => 
            {
                response.status(200)
                .send({ article });
            })
    }
    /// task 05  FETCH ARTICLE COMMENTS BY ID
const { fetchArticleComments } = require('../services/ncNews-Services')
exports.fetchArticleComments = (request , response) => 
    {
        const { article_id } = request.params;

        fetchArticleComments(article_id)
        .then((comments) =>
            {
                response.status(200)
                .send({ comments })
            })
    }
    /// task 06 = POST COMMENT BY AERTICLE ID
const { postCommentToArticleID } = require('../services/ncNews-Services')
exports.postCommentToArticleID = (request , response ) => 
    {
        // const newComment = request.body;
        // console.log("new comment (ctrl lyr) >>>",newComment)
                // const mappedComment = 
        //     { author: newComment.username, body: newComment.body}
        // console.log("mapped comment ctrl lyr >>>> mappedComment" , mappedComment)
        const newComment =request.body
        console.log("ctrl lyr / newComment >>>",newComment)
        const { article_id } = request.params;

        postCommentToArticleID(article_id , newComment).then((comment)=> 
            {
                response.status(201)
                .send({ comment } )
            })
    }

/// 003 USERS
const { fetchUsers } = require('../services/ncNews-Services')
exports.fetchUsers = (request , response ) => 
    {
        fetchUsers()
        .then (users => 
            {
                response.status(200)
                .send({ users });
                
            });
    }



 