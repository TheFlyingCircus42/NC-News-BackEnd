/// A P P . J S  --> MAIN SERVER FILE

const express = require("express")
const app = express()
const db = require("./db/connection")
app.use(express.json())


const ncNewsRouter = require("./routes/ncNews-Routes");
app.use('/api/topics',ncNewsRouter);


module.exports = app






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