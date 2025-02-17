import { Router } from "express"
import { register, login, deleteUser, updateUser, listUsers, getUserById, changePassword} from "./user.controller.js"
import { validateJwt } from "../middlewares/validate.jwt.js"

const api = Router()


api.post('/register', register)
api.post('/login',login)
api.get('/list',[validateJwt],listUsers)
api.get('/list/:id',[validateJwt],getUserById)
api.put('/update/:id',[validateJwt], updateUser)
api.put('/change/:id',[validateJwt],changePassword)
api.delete('/delete/:id',[validateJwt],deleteUser)


export default api