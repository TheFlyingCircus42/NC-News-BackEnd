/// A P P . J S  --> MAIN SERVER FILE

const express = require("express")
const app = express()
app.use(express.json())

/// NO END-POINT
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello World!' });
});

/// # 000 - Hello
const ncNewsHelloRouter = require('./routes/ncNews-Routes');
  app.use('/hello' , ncNewsHelloRouter)

/// # 001 - TOPICS
const topicsRouter = require('./routes/topics-routes');
  app.use('/api/topics' , topicsRouter)

/// 002 - ARTICLES
const articlesRouter = require('./routes/ncNews-Routes');
  app.use('/api/articles' , articlesRouter)


module.exports = app

