import express from "express"
import { createCard,updateCard,deleteCard } from "../controllers/card.controller.js"
import { authentication } from "../middleware/authentication.js"

const cardRouter=express.Router()

cardRouter.post("/",authentication,createCard)

cardRouter.put("/:id",authentication,updateCard)

cardRouter.delete("/:id",authentication,deleteCard)

export default cardRouter