const { MongoClient } = require('mongodb');


async function main() {
    console.log("running collection cleanup")
    const uri = "mongodb+srv://user-1:sox@cluster0.quxfa.mongodb.net/sample_restaurants?retryWrites=true&w=majority"; // connection key
    const clientInstance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // declaring client, assigning to connection key
    
    try {
        await clientInstance.connect(); // wait for the connection 
        await clientInstance.db().collection("restaurants").deleteMany({ "cuisine": "American" })
    } catch(e) {
        console.log("ERROR", e) // if error in try block with connecting to client
    } finally { // when promise is resolved, runs whether it's an error or not
         clientInstance.close()
    }
}
main();