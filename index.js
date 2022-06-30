const express = require('express')
const app = express();
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;


// connect the cluster
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://doctors-portal:3ZLbk0GRoV8GMacK@cluster0.yw3x3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const database = client.db("billingDatabase");
        const collection = database.collection("billing");

        // add a new bill  (POST API)
        app.post('/add-billing', async (req, res) => {
            const bill = req.body;
            const result = await productsCollection.insertOne(bill);
            res.json(result)
        })





    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running my billign')
})


app.listen(port, () => {
    console.log('running the server of billing')
})