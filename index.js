// Necessary modules
const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mongo Client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@lawwayscluster.hxfz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongo Function
async function run() {
  try {
    await client.connect();

    const database = client.db("lawwaysDatabase");
    const lawyerCollection = database.collection("lawyers");
    const reviewCollection = database.collection("reviews");
    const serviceCollection = database.collection("services");
    const orderCollection = database.collection("orders");

    // GET all lawyers
    app.get("/lawyers", async (req, res) => {
      const cursor = lawyerCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // GET all reviews
    app.get("/reviews", async (req, res) => {
      const cursor = reviewCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // GET all services
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // GET service by id
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.json(result);
    });

    // POST a order
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

// Testing endpoint
app.get("/", (req, res) => {
  res.send("Service Website Is Running 🔥");
});

app.listen(port, () => {
  console.log(`Server running at port ${port} 🔥🔥`);
});
