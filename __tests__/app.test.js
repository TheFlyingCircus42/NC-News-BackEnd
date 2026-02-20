const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const request = require("supertest")

console.log("CHECKING THIS FORM APP TEST")

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});


/// TEST FOR NO END POINT. <<< REVISIT
describe("/", () => {
  test("GET: 200 - responds with correct console.log", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(({ body }) => {
        const { message } = body;
        expect(typeof message).toBe("string");
        expect(message).toBe('Hello World!')
      });
  });
});

