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

/// USERS TESTS ///
describe("/api/users" , () => 
  {

        test('GET: 200: ... should return an object with key of users' , ()=>
          {
            return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body }) => 
              {
                expect(body).toHaveProperty('users')
              });
          });

        // return an object with key of users
    test('GET: 200: ... object should have a key of users with an array as the value', ()=>
      {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body }) => 
          {
            expect(body.users).toBeArray() 
          }) 
      });

        // each object to contain username / name / avatar_url
    test(`GET: 200: ... the array should contain user objects with the following properties and types:
            username : (string)
            name : (string) 
            avatar_url : (string)` , ()=>
              {
                return request(app)
                .get('/api/users')
                .expect(200)
                .then(({body})=>
                  {
                    const { users } = body;
                    users.forEach((user)=>
                      {
                        expect(user).toHaveProperty('username')
                        expect(typeof user.username).toBe('string')
                        expect(user).toHaveProperty('name')
                        expect(typeof user.username).toBe('string')
                        expect(user).toHaveProperty('avatar_url')
                        expect(typeof user.username).toBe('string')
                      }) 
                  })
              });
  });

