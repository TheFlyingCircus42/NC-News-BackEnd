const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const request = require("supertest")

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
                                    expect(typeof articles[i].votes).toBe('number') //<<-- ?
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