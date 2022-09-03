require("dotenv").config();
const express = require("express");
const app = express();

const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PW } = process.env;

const credentials = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DB,
  user: PG_USER,
  password: PG_PW,
};

// CONNECTION
const { Client } = require("pg");
const conn = new Client(credentials);

conn
  .connect()
  .then(() => console.log(`Connected to ${PG_DB} database`))
  .catch((err) => console.log(`Error connecting to ${PG_DB}.`));

// we need this to find the index.html file and
// have the server start it for us
app.use(express.static("../client"));

// How we parse the body from the client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("BL server root route");
});

// BLUEPRINTS - DONE by DBA

const user_id = 23;

// Read - GET
app.get("/bucket", (req, res) => {
  let query = `SELECT id AS _id,
                      description,
                      iscomplete,
                      id
                FROM bucketlist.bucketlist
                WHERE user_id = ${user_id};`;

  conn
    .query(query)
    .then((listItem) => {
      res.json(listItem.rows);
    })
    .catch((err) => {
      res.status(400).json({ message: "Not able to find data in database" });
    });
});

// Create - POST
app.post("/bucket", (req, res) => {
  let query = `INSERT INTO bucketlist.bucketlist (description, iscomplete, user_id)
                VALUES ('${req.body.description}', false, ${user_id})
                RETURNING *;`;

  conn
    .query(query)
    .then((listItem) => {
      console.log(listItem.rows[0]);
      res.json(listItem.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Not able to post data to database" });
    });
});

// Delete - DELETE
app.delete("/bucket/:id", (req, res) => {
  console.log(typeof req.params.id);

  let query = `DELETE FROM bucketlist.bucketlist
                WHERE id = ${req.params.id} AND user_id = ${user_id}
                RETURNING * ;`;

  conn
    .query(query)
    .then((listItem) => {
      console.log(listItem.rows[0]);
      res.json(listItem.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "Not able to delete data from database" });
    });
});

// Update - PUT
app.put("/bucket/:id", (req, res) => {
  let query = `UPDATE bucketlist.bucketlist
                  SET iscomplete = NOT iscomplete
                WHERE id = ${req.params.id}
                  AND user_id = ${userId}
                RETURNING *;`;

  conn
    .query(query)
    .then((listIem) => {
      res.status(200).json(listItem.rows[0]);
    })
    .catch((err) => res.status(444).json("There is an error updating db"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`BL API on port ${port}`));
