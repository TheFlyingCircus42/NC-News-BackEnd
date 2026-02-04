const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const request = require("supertest")

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end;
});

/// TEST FOR 001 Topics
describe("/api/topics" , () => {
  test("GET: 200 - responds with an array of Topic objects" , () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({ body }) => {
      const { topics } = body;
      // returns an array
      expect(Array.isArray(topics)).toBe(true)
      // array conatins objects
      expect(typeof topics[0]).toBe("object")
      // those objects have correct properties
      for (let i = 0 ; i < topics.length ; i++){
        expect(topics[i]).toHaveProperty('slug');
        expect(topics[i]).toHaveProperty('description');      
        // those properties contain the correct data type / shape
        expect(typeof topics[i].slug).toBe('string')
        expect(typeof topics[i].description).toBe('string')
      }
      
    });
  });
})