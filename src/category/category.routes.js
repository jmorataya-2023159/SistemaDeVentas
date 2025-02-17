import { Router } from "express"
import { addCategory, deleteCategory, listCategory, updateCategory,findCategoryById } from "./category.controller.js"
import { validateJwt } from "../middlewares/validate.jwt.js"

const api = Router()

api.post('/add',[validateJwt], addCategory)
api.get('/listC',[validateJwt],listCategory)
api.get('/get/:id',[validateJwt],findCategoryById)
api.put('/updateC/:id',[validateJwt], updateCategory)
api.delete('/deleteC/:id',[validateJwt], deleteCategory)

export default api