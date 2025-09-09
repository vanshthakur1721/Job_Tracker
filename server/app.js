 import express from 'express';
 import dotenv from "dotenv";
 import connectDb from './src/Db/db.js';
dotenv.config();
 const app = express()
const port = 3000
app.use(express.json());
connectDb();

app.get('/', (req, res) => {
  res.send('Hello World these side vansh!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}`)
})