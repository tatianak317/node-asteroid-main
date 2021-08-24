async function main() {
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://user-1:sox@cluster0.quxfa.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
    const client = new MongoClient("mongodb+srv://user-1:sox@cluster0.quxfa.mongodb.net/sample_airbnb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });
  }
  main().catch(console.error);

