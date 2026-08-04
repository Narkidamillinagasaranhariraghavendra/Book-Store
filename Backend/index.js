import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import cors from "cors";
import bookRoute from './Routes/bookRoute.js';
import authRoute from './Routes/authRoute.js';

const app = express();
const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.mongoDBURL;

// middleware for parsing request body
app.use(express.json());

// middleware for handling cors policy
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/', (request, response) => {
    return response.status(200).send("welcome to Book Store API");
});

app.use('/auth', authRoute);
app.use('/books', bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });