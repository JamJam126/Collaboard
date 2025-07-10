import express from "express"
import { addBoard, deleteBoard, getBoard, getBoardById, updateBoard } from "../controllers/board.controller.js"


const boardRouter = express.Router()

boardRouter.get("/",getBoard)
boardRouter.get("/:id",getBoardById)
boardRouter.post("/",addBoard)
boardRouter.put('/:id',updateBoard)
boardRouter.delete('/:id',deleteBoard)
export default boardRouter;