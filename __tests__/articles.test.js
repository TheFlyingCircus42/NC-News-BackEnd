const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const request = require("supertest")
const comments = require('../db/data/test-data/comments')

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

/// TEST FOR 002 ARTICLES (GET ALL ARTICLES)
describe("GET: /api/articles" , () => 
    {           
                /// RETURNS AN OBJECT W/ ARRAY ///
        test("GET: 200: responds with ...an object with the key of articles and the value of an array." , ()=>
            {
                return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body }) => 
                    {
                        const { articles } = body;
                        expect(Array.isArray(articles)).toBe(true)
                    })
            });
                    ///// ... ARRAY CONTAINS OBJECTS /////
        test("GET: 200: ... the returned array contains article objects", ()=> 
            {
                return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({body }) => 
                    {
                        const { articles } = body;
                        for(let i=0; i<articles.length; i++)
                            {
                                expect(typeof articles[i]).toBe("object")
                            }
                    })
            })
                    /// CHECK SHAPE --- WHAT HAPPENS IF A COLUMN IS EMPTY FROM DB ???? 
        test(`GET: 200: ... article objects should conatin the following properties and corresponding data types ofr their values:
            author (str),
            title, (str),
            article_id (num),
            topic (str),
            created_at(??),
            votes,
            article_img_url (str)` , () => 
                {
                    return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(({ body }) => 
                        {
                            const { articles } = body;
                            for (let i = 0 ; i < articles.length ; i++)
                                {
                                    expect(typeof articles[i].author).toBe('string')
                                    expect(typeof articles[i].title).toBe('string')
                                    expect(typeof articles[i].article_id).toBe('number')
                                    expect(typeof articles[i].topic).toBe('string')
                                    expect(typeof articles[i].created_at).toBe('string')
                                    expect(typeof articles[i].votes).toBe('number') 
                                    expect(typeof articles[i].article_img_url).toBe('string')
                                }
                            
                        });
                });
            test("GET: 200: ... should contain a count of all comments with thes article ID.  (this needs to fetched from DB & added to OBJ" , ()=> 
                {
                    return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then (({ body }) => 
                        {
                            const { articles } = body;
                            articles.forEach((article)=>
                                {
                                    expect(typeof article.comment_count).toBe('number')
                                })
                        });
                })
            test("GET: 200: ... the returned articles sould be sorted by date, in ascending order",()=>
                {
                    return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then (({ body }) => 
                        {
                            const { articles } = body;
                            expect(articles).toBeSortedBy('created_at') 
                        })
                })

            
            test("GET: 200: ... should not contain the article body property",()=>
                {
                    return request(app)
                    .get('/api/articles')
                    .expect(200)
                     .then (({ body }) => 
                        {
                            const { articles } = body;
                            articles.forEach((article)=>
                                {
                                    expect(article).not.toHaveProperty('body')
                                })
                        });
                })

    });

/// TEST FOR 004 GET ARTICLE BY ID
describe("GET: /api/articles/:article_id", ()=> 
    {
        test("GET: 200: - route is availabel" , () => 
            {
                return request(app)
                .get('/api/articles/1')
                .expect(200)
            })

        test("GET: - should return an object with a key of article" , () => 
            {
                return request(app)
                .get('/api/articles/2')
                .expect(200)
                .then(({ body }) => 
                    {
                        expect(body).toHaveProperty("article")
                    })
            })

        test("GET: - the article key should conatin a single article object", ()=> 
            {
                return request(app)
                .get('/api/articles/3')
                .expect(200)
                .then(({ body }) => 
                    {
                        const { article } = body
                        expect(article).toBeArray()
                        expect(typeof article[0]).toBe('object')//<<<--?
                        expect(article.length).toBe(1)
                    })

            })

        test("GET: - the article_id should match the requested ID no.", ()=> 
            {
                return request(app)
                .get('/api/articles/5')
                .expect(200)
                .then(({ body })=> 
                    {
                        const { article } = body
                       
                        expect(article[0].article_id).toBe(5)
                    })
            })


        test(`GET: - the article object should contain the following properties and values:
            author - string
            title - string
            article_id - number
            body - string
            topic - string 
            created_at - string
            votes - number
            article_img_url` , () => 
                {
                return request(app)
                .get('/api/articles/4')
                .expect(200)
                .then(({ body }) => 
                    {
                        const { article } = body
                        expect(typeof article[0].author).toBe('string')
                        expect(typeof article[0].title).toBe('string')
                        expect(typeof article[0].article_id).toBe('number')
                        expect(typeof article[0].body).toBe('string')
                        expect(typeof article[0].topic).toBe('string')
                        expect(typeof article[0].created_at).toBe('string')
                        expect(typeof article[0].votes).toBe('number')
                        expect(typeof article[0].article_img_url).toBe('string')

                    })
                })
    })

/// TASK 05 - Get all comments by article ID
describe("GET: /api/articles/:article_id/comments" , ()=> 
    {
        test('GET: 200: - /api/1/comments - route is availabe',()=>
            {
                
                return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                
            });

        test('GET: 200: - responds with an object, with a key of "comments" - which has the value of an array' , ()=>
            {
                return request(app)
                .get('/api/articles/3/comments')
                .expect(200)
                .then(({ body }) => 
                    {
                        expect(body).toHaveProperty("comments")
                    });
            });

        test('GET: 200: - the array on the comments key contains comment objects (if there any matches)' , ()=>
            {
               return request(app)
                .get('/api/articles/5/comments')
                .expect(200)
                .then(({ body }) => 
                    {
                        const { comments } = body
                        expect(comments).toBeArray()
                        if (comments.lenght > 0)
                            {
                                expect(typeof comments[0]).toBe('object')
                                expect(comments.length).toBe(1)
                            }
                    }); 
            });

        test('GET: 200: - if there are no comment matches then should return an empty array' , ()=>
            {
                return request(app)
                .get('/api/articles/2/comments')
                .expect(200)
                .then(({ body }) => 
                    {
                        if( comments.length > 0)
                            {
                                const { comments } = body;
                                expect(comments.length).toBe(0)
                            }
                    });
            });

        test(`GET: 200: - comment objects should have the following properties and values;
                    comment_id - number
                    votes - number
                    created_at - string
                    author - string
                    body - string
                    article_id - number` , () => 
                   {
                        return request(app)
                        .get('/api/articles/1/comments')
                        .expect(200)
                        .then(({ body }) => 
                        {
                            const { comments } = body;
                            comments.forEach(comment => 
                                {
                                    expect(typeof comment.comment_id).toBe('number')
                                    expect(typeof comment.votes).toBe('number')
                                    expect(typeof comment.created_at).toBe('string')
                                    expect(typeof comment.author).toBe('string')
                                    expect(typeof comment.body).toBe('string')
                                    expect(typeof comment.article_id).toBe('number')
                                });

                        });
                    });

        test('GET: 200: - the article ID on each comment object should match the requested article ID (if there are any matches)' , () => 
            {
                return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => 
                    {
                        const { comments } = body
                        comments.forEach(comment => 
                            {
                                  expect(comment.article_id).toBe(1)
                            });
                      
                    });

            });
                        /// ADD THIS.  !!!!!
        // test('GET: 200: - should return a message if no comments match teh article ID', ()=> {}) 
    });

// /// TASK 06 - POST COMMENT TO ARTICLE BY ID

// ??? Shpuld this endpoint be different? it matched the GET: article comments EP ??? !!!
describe("POST:/api/articles/:article_id/comments", ()=> 
    {
        test("POST: 201: route should be available",()=>{
            const newComment = {username: 'butter_bridge' , body: 'Is this thing on?'} ;

            return request(app)
            .post('/api/articles/1/comments')
            .send(newComment)
            .expect(201)
        })

        test('POST: 201:  should return an object with the key comment - which holds the comment object',()=>
            {
                const newComment = {username: 'icellusedkars' , body: 'This is a drill!'} ;

                return request(app)
                .post('/api/articles/1/comments')
                .send(newComment)
                .expect(201)
                .then (({ body }) => 
                    {
                        //const { returnComment } = body;
                        expect(body).toHaveProperty("comment")
                        expect(typeof body.comment).toBe("object")
                    })
            });
        test(`POST: 201: the "comment" object should have the followibg properties amd datat types:
            comment_id - number
            article_id - number
            body - string
            votes - number
            author - string
            created_at - string`, ()=>
                {

                    const newComment = {username: 'butter_bridge' , body: 'Is this thing on?'}

                    return request(app)
                    .post('/api/articles/2/comments')
                    .send(newComment)
                    .expect(201)
                    .then(({ body }) => 
                        {
                            
                            expect(typeof body.comment.comment_id).toBe("number")
                            expect(typeof body.comment.body).toBe('string')
                            expect(typeof body.comment.votes).toBe('number')
                            expect(typeof body.comment.author).toBe('string')
                            expect(typeof body.comment.created_at).toBe('string')
                        })
                })    
    })

describe("PATCH: 200: /api/articles/:article_id", () => {

    test("route exists", async () => {
        const newVotes = { inc_votes: 1 };

        await request(app)
            .patch('/api/articles/1')
            .send(newVotes)
            .expect(200);
    });

    test("returns updated article for POSITIVE votes", async () => {
        const newVotes = { inc_votes: 1 };

        const { body } = await request(app)
            .patch('/api/articles/1')
            .send(newVotes)
            .expect(200);

        expect(body.article.votes).toBe(101);
        expect(body.article.article_id).toBe(1);
    });

    test("returns updated article for NEGATIVE votes", async () => {
        const newVotes = { inc_votes: -1 };

        const { body } = await request(app)
            .patch('/api/articles/1')
            .send(newVotes)
            .expect(200);

        expect(body.article.votes).toBe(99);
        expect(body.article.article_id).toBe(1);
    });

});





// describe.only("PATCH: 200: /api/articles/:article_id" ,  () =>
//     {
//         test("PATCH: 200: /api/articles/:article_id should be available route", async ()=> 
//             {
//                 const newVotes = { "inc_votes" : 1 }

//                 return request (app)
//                 .patch('/api/articles/1')
//                 .send(newVotes)
//                 .expect(200)

//             })

//         test("PATCH: 200: /api/articles/:article_id should return an updated article for POSITIVE no of votes ", ()=> 
//             {
//                 const newVotes = { "inc_votes" : 1 }

//                 return request (app)
//                 .patch('/api/articles/1')
//                 .send(newVotes)
//                 .expect(200)
//                 .then(({body})=>
//                     {
//                         const { article } = body;

//                         expect(article.votes).toBe(101)
//                         expect(article.article_id).toBe(1)
//                     })
//             } )
//         test("PATCH: 200: /api/articles/:article_id should return an updated article for NEGATIVE no of votes" , ()=>
//             {
//                 const newVotes = { inc_votes : -1 }

//                 return request (app)
//                 .patch('/api/articles/1')
//                 .send(newVotes)
//                 .expect(200)
//                 .then(({body})=>
//                     {
//                         const { article } = body;

//                         expect(article.votes).toBe(99)
//                         expect(article.article_id).toBe(1)
//                     })
//             })

//     })