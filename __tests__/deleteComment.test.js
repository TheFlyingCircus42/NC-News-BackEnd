const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const request = require("supertest")
// const comments = require('../db/data/test-data/comments')

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe('DELETE /api/comments/:comment_id', ()=> 
    {
        test('204: deletes the comment and responds with no content', ()=>
            {
                return request(app)
                .delete('/api/comments/1')
                .expect(204)
                .then(({body}) => 
                    {
                        expect(body).toEqual({});
                    });
            });

        test('404: responds with comment not found when given a comment that does not exist', ()=>
            {
                return request(app)
                .delete('/api/comments/9999')
                .expect(404)
                .then(({body})=>
                    {
                        expect(body.msg).toBe('Comment not found');
                    });
            });
        
        test('400: responds with bad request when given an invalid id',()=>
            {
                return request(app)
                .delete('/api/comments/not-a-number')
                .expect(400)
                .then(({body})=>
                    {
                        expect(body.msg).toBe('Bad request')
                    });
            })
    });
