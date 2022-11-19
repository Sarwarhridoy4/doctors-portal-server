const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

//middlewires
app.use(cors())
app.use(express.json())


//database connection



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9rpk71q.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    
    try {
        const apppointmentOptionCollection = client.db('doctorsPortal').collection('appoinmentOption');
        //api for getting all slots
        app.get('/appointment-options', async (req, res) => {
            const query = {}
            const options = await apppointmentOptionCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally {
        
    }
}
run().catch(error=>console.log(error))


//routes
app.get('/', async (req, res) => {
    res.send(`Doctors Portal Server is running...`)
})

app.listen(port, () => {
    console.log('Server Running at:' + port);
})