import { Router } from "express"
import { addToCart, deleteCart, update, getCart } from "./shopCart.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/add',[validateJwt], addToCart)
api.delete('/:id',[validateJwt], deleteCart)
api.put('/:id',[validateJwt], update)
api.get('/',[validateJwt], getCart)



export default api