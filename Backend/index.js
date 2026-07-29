import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoute from './Routes/bookRoute.js'

const app=express();
const PORT = process.env.PORT;
const mongoDBURL = process.env.mongoDBURL

//middleware for parsing request body
app.use(express.json());

//middleware for handdling cors policy
//option1:Allow all origins with default of cors(*)
//app.use(cors());
// middleware for handling cors policy
import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get('/',(request,response) =>{
    console.log(request)
    return  response.status(234).send("welocme to tutorial")
});

app.use('/books',bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log("App connected to databsse");
        app.listen(PORT,() =>{
    console.log(`App is listening to port ${PORT}`);
});

    })
    .catch((error) => {
        console.log(error);
    });