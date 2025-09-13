 import express from 'express';
 import dotenv from "dotenv";
 import connectDb from './src/Db/db.js';
 import authRoutes from './src/Routes/authRoutes.js'
 import cors from 'cors'
dotenv.config();
 const app = express()
const port = 3000
app.use(express.json());
connectDb();

app.get('/', (req, res) => {
  res.send('Hello World these side vansh!')
})
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

app.use('/api/v1/auth',authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}`)
})