const express = require('express')
const app = express();
const port = process.env.PORT || 5000;


// connect the cluster
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://doctors-portal:3ZLbk0GRoV8GMacK@cluster0.yw3x3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('running my billign')
})


app.listen(port, () => {
    console.log('running the server of billing')
})