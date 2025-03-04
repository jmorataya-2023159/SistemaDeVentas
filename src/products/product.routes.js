import {Router} from "express"
import {addProduct,deleteProduct,getProducts,getProductById,updateProduct} from './product.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/add', [validateJwt], addProduct)
api.get('/', [validateJwt], getProducts)
api.get('/:id', [validateJwt], getProductById)
api.put('/:id', [validateJwt], updateProduct)
api.delete('/:id',[validateJwt], deleteProduct)

export default api