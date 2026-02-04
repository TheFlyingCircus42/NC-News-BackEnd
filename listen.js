//// L I S T E N . J S  --> Listener file

const app = require("./app")
const port = 8500

app.listen(port, (err) => {
    if (err){
        console.log(err);
    }else {
        console.log(`Listening on port ${port}`)        
    }
});


//module.exports = app.listen


// const app = require("./app")

// const port = 8500

// app.listen(8500, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(`Listening on port ${port}:`)
//     }
// });

// module.exports = app.listen
