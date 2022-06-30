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
            const result = await collection.insertOne(bill);
            res.json(result)
        })


        // GET all billing info
        app.get('/billing-list', async (req, res) => {
            const cursor = collection.find({})
            const result = await cursor.toArray();
            res.send(result)
        });



        // delete an order 
        app.delete('/delete-billing/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await collection.deleteOne(query)
            res.json(result)
        })


        // update billing info
        app.put('/update-billing/:id', async (req, res) => {
            const id = req.params.id;
            const bill = req.body;
            const filter = { _id: ObjectId(id) }
            const updateDocs = {
                $set: {
                    bill: bill
                }
            }
            const result = await collection.updateOne(filter, updateDocs)
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