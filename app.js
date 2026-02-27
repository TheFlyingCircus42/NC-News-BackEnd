/// A P P . J S  --> MAIN SERVER FILE

const express = require("express")
const app = express()

const path = require('path');

const cors = require('cors');

app.use(cors());

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

/// NO END-POINT                  <<----< REVISIT
app.get('/', (req, res) => {
res.status(200).send({ message: 'Hello World!' });
});

/// API only
app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});



/// # 000 - Hello
const ncNewsHelloRouter = require('./routes/ncNews-Routes');
  app.use('/hello' , ncNewsHelloRouter)

/// # 001 - TOPICS
const topicsRouter = require('./routes/topics-routes');
  app.use('/api/topics' , topicsRouter)

/// 002 - ARTICLES
const articlesRouter = require('./routes/articles-routes');
  app.use('/api/articles' , articlesRouter)

/// 003 - USERS
const usersRouter = require('./routes/users-routes')
  app.use('/api/users' , usersRouter)

  /// 08. CORE: DELETE /api/comments/:comment_id
const commentsRouter = require('./routes/comments-routes')
  app.use('/api/comments' , commentsRouter)

  /// 500 handler
  app.use((err , req , res , next) => 
    {
      if (err.status && err.message) 
        {
          res.status(err.status).send({ msg: err.message});
        } 
        else 
          {
            res.status(500).send({msg: "Internal Server Error"});
          }
    });

module.exports = app

