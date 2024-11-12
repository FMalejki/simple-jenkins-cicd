const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const prometheus = require('prom-client');
const app = express();
const register = new prometheus.Registry();
prometheus.collectDefaultMetrics({ register });

const pageViewCounter = new prometheus.Counter({
  name: 'page_views',
  help: 'nuber of page views'
})
register.registerMetric(pageViewCounter)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//deleted 1 dot . for purpose of running it inside a docker-compose environment
app.use(express.static(path.join(__dirname, './frontend')));


app.get('/', (req, res) => {
    pageViewCounter.inc()
    res.sendFile(path.join(__dirname, "./frontend", "index.html"));
});

app.get('/kontakt', (req,res) => {
    res.sendFile(path.join(__dirname, "./frontend" ,"contact.html"));
});

app.get('/galeria', (req,res) => {
    res.sendFile(path.join(__dirname, "./frontend", "gallery.html"));
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
})

/*app.get('/profile-picture', (req, res) => {
  const img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

const mongoUrlLocal = "mongodb://admin:admin@localhost:27017";
const mongoUrlDocker = "mongodb://admin:admin@mongodb";
const databaseName = "my-db";

const connectToMongo = async (url) => {
  try {
    const client = await MongoClient.connect(url);
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

app.post('/update-profile', async (req, res) => {
  const userObj = req.body;

  try {
    const client = await connectToMongo(mongoUrlLocal);
    const db = client.db(databaseName);
    userObj['userid'] = 1;

    const myquery = { userid: 1 };
    const newvalues = { $set: userObj };

    await db.collection("users").updateOne(myquery, newvalues, { upsert: true });
    await db.collection("users").insertOne({userid: 2},{ $set: userObj }, { upsert: true})
    client.close();

    res.send(userObj);
  } catch (error) {
    res.status(500).send("Error updating profile");
  }
});

app.get('/get-profile', async (req, res) => {
  try {
    const client = await connectToMongo(mongoUrlLocal);
    const db = client.db(databaseName);

    const myquery = { userid: 1 };
    const result = await db.collection("users").findOne(myquery);
    client.close();

    res.send(result ? result : {});
  } catch (error) {
    res.status(500).send("Error getting profile");
  }
});

*/

app.listen(3030, () => {
  console.log("app listening on port 3030!");
});