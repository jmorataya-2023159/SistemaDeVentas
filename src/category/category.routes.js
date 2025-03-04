import { Router } from "express"
import {addCategory,deleteCategory,getCategories,getCategoryById,updateCategory,} from './category.controller.js'
import {validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/add', [validateJwt],addCategory)
api.get('/',[validateJwt],getCategories)
api.get('/:id', [validateJwt], getCategoryById)
api.put('/:id',[validateJwt], updateCategory)
api.delete('/:id', [validateJwt], deleteCategory)
export default api