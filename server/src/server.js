// import express from "express";
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { sequelize } from './models/index.js';
import boardRouter from './routes/board.route.js';
import userRouter from './routes/user.route.js';
import listRouter from './routes/list.routes.js';
import cardRouter from './routes/card.routes.js';
import ProfileRoute from './routes/profile.route.js';

// require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
sequelize.sync()

app.get("/api/health", (req, res) => {
    res.json({ message: "API is working!" });
});
app.use("/api/board",boardRouter);
app.use("/api/auth",userRouter)
app.use('/api/profile',ProfileRoute);
app.use("/api/card",cardRouter)
app.use("/api/list",listRouter)

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));