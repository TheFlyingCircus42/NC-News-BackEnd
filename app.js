/// A P P . J S  --> MAIN SERVER FILE

const express = require("express")
const app = express()
app.use(express.json())

///
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello World!' });
});


/// # 000 - Hello
const ncNewsHelloRouter = require('./routes/ncNews-Routes');
app.use('/hello' , ncNewsHelloRouter)

/// # 001 - TOPICS
const topicsRouter = require('./routes/topics-routes');
app.use('/api/topics' , topicsRouter)



module.exports = app

///////////////////////////////////////
/// # 001 - Get All Topics
// const ncNewsRouter = require("./routes/ncNews-Routes");
// app.use('/api/topics',ncNewsRouter);

/// # 002 - Get All Articles
// app.use('api/article' , ncNewsRouter); //<<-- is it the smae router...?





// app.get("/", (request, response) => {
//     response.status(200).send({message: "hello from express"})
// })
// const { ident } = require("pg-format")
// const listen = ("./listener.js")
// const port = 8100
// const express = require("express")
// const ncNewsRouter = require() //<<--- !!!

// const app = express()

// app.use(express.json())

// app.use( URL / ROUTER) //<<--!!

// const db = require("./db/connection")
// const listen = ("./listener.js")
// const port = 8100
//module.exports = app