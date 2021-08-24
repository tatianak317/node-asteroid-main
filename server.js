const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = (process.env.PORT || 3030);

const { MongoClient } = require('mongodb');
let clientInstance;
app.use(bodyParser.json())
// const { request } = require('express');

async function main() {
    const uri = "mongodb+srv://user-1:sox@cluster0.quxfa.mongodb.net/sample_airbnb?retryWrites=true&w=majority"; // connection key
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
    console.log("port started") // for showing the block has been entered
})

app.get('/notes', async (req, res) => {
    console.log("get recieved")
    const collectionContent = await clientInstance.db().collection("testCollection").find({}).toArray()
    return res.send(collectionContent)
})
app.post('/insertNote', async(req, res) => {    // post request to /insertNote route
    console.log(req.body) // logging request body to verify

    await clientInstance.db().collection("testCollection").insertOne({body: req.body})   // insert into test collection
    return res.send('Inserted Note') // see this within postman when insert has gone through 
})

