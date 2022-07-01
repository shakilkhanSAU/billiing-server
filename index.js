const express = require('express')
const app = express();
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;


//cors
const cors = require('cors')

// midleWare
app.use(cors());
app.use(express.json())


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
            const count = await collection.countDocuments();
            const page = req.query.page;
            const size = parseInt(req.query.size)
            let billing;
            if (page) {
                billing = await cursor.skip(page * size).limit(size).toArray()
            } else {
                billing = await cursor.toArray();
            }
            res.send({
                billing, count
            })
        });



        // delete an order 
        app.delete('/delete-billing/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await collection.deleteOne(query)
            console.log(result)
            res.json(result)
        })


        // update billing info
        app.put('/update-billing/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const bill = req.body;
            console.log(bill)
            const filter = { _id: ObjectId(id) }
            const updateDocs = {
                $set: bill
            }
            const result = await collection.updateOne(filter, updateDocs)

            res.json(result)
        })



        // creating user (sign up)
        app.post('/sign_up', function (req, res) {
            var name = req.body.name;
            var email = req.body.email;
            var pass = req.body.password;
            var phone = req.body.phone;

            var data = {
                "name": name,
                "email": email,
                "password": pass,
                "phone": phone
            }
            db.collection('details').insertOne(data, function (err, collection) {
                if (err) throw err;
                console.log("Record inserted Successfully");
            });


            // login

            return res.redirect('signup_success.html');
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