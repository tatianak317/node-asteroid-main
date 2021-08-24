const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = (process.env.PORT || 3030);

const { MongoClient } = require('mongodb');
let clientInstance;
app.use(bodyParser.json())


async function main() {
    const uri = "mongodb+srv://user-1:sox@cluster0.quxfa.mongodb.net/Game?retryWrites=true&w=majority"; // connection key
    clientInstance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // declaring client, assigning to connection key
    
    try {
        await clientInstance.connect(); // wait for the connection 
    } catch(e) {
        console.log("ERROR", e) // if error in try block with connecting to client
    } finally { // when promise is resolved, runs whether it's an error or not
    }
}
main();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(port, () => { // listenting for connections on port entered
    console.log("game server started") // for showing the block has been entered
})
app.post('/createAccount', async (req, res) => {  
    console.log("request", req.body)
    const user = await clientInstance.db().collection("Users").findOne({ "body.username": req.body.username })
    if (user) {     // it doesnt add a duplicate, but still gives error first time you create
        return res.status(401).send({statusMessage: "Username already exists"})
    } else {
        await clientInstance.db().collection("Users").insertOne({body: req.body})   // insert into test collection
        return res.status(201).send({username: req.body.username, statusMessage: "Your account has been created"})
    }
    
})

app.post('/login', async (req, res) => {
    await clientInstance.db().collection("Users")
    const result = await clientInstance.db().collection("Users").findOne({"body.username": req.body.username, "body.password": req.body.password})
    if (result) {
        return res.status(200).send({username: req.body.username, highScore: result.body.highScore, statusMessage: "You have been logged in."})
    } else {
        return res.status(401).send({statusMessage: "Invalid credentials"})
    }
})
app.post('/updateScore', async (req, res) => {
    console.log("in update score")
    // await clientInstance.db().collection("Users")
    console.log("request in update score", req.body)
    const user = await clientInstance.db().collection("Users").findOne({ "body.username": req.body.username })
    console.log("user found?", user)
    const newData = user
    newData.body.highScore = req.body.highScore
    if (user) {
        await clientInstance.db().collection("Users").updateOne({ "body.username": req.body.username }, { $set: { body: {username: user.body.username, password:user.body.password, highScore: req.body.highScore} } })
        return res.status(200).send({username: req.body.username, highScore: req.body.highScore, statusMessage: "score updated"})
    } else {
        return res.status(401).send({statusMessage: "Invalid credentials"})
    }
})
app.get('/', async (req, res) => {
    res.status(200).send("test")
})