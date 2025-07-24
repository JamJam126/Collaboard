import express from "express"
import { addBoard, deleteBoard, getBoard, getBoardById, inviteUser, updateBoard } from "../controllers/board.controller.js"
import { authentication } from "../middleware/authentication.js"


const boardRouter = express.Router()

boardRouter.get("/", authentication, getBoard)
boardRouter.get("/:id", getBoardById)
boardRouter.post("/", authentication, addBoard)
boardRouter.put('/:id', updateBoard)
boardRouter.delete('/:id', deleteBoard)
//Invite user to board
boardRouter.post('/:boardId/invite',inviteUser)
export default boardRouter;