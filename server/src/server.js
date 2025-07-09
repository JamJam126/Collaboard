// import express from "express";
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { sequelize } from './models/index.js';

// require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
sequelize.sync()

app.get("/api/health", (req, res) => {
    res.json({ message: "API is working!" });
});

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));