import User from './user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async(req, res)=>{
    try{
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        await user.save()
        return res.send({message: `Registered successfully, can be logged with username: ${user.username}`})
    }catch(error){
        console.error(error)
        return res.status(500).send({message: 'General error with registering user', error})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({username})
        if(user && await checkPassword(user.password, password)) {
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong data'})
    }catch(error){
        console.error(error)
        return res.status(500).send({message: 'General error',error})
    }
}
export const listUsers = async(req, res)=>{
    try{
        const {limit = 20, skip = 0 } = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if(users.length === 0) return res.status(404).send(
            {
                success: false,
                message:'Users not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Users found: ', 
                users,
                total: users.length
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                error
            }
        )
    }
}
export const getUserById = async(req, res)=>{
    try{
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).send(
            {
                sucess: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                error
            }
        )
    }
}
export const updateUser = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        if (!id) return res.status(400).send({ message: 'Invalid ID' });
        const updatedUser = await User.findByIdAndUpdate(id,data,{new:true})
        if (!updatedUser)return res.status(404).send({Message: 'User not found'})
            return res.send({message: 'User updated succesfully', updatedUser})
    } catch (error) {
        console.console.log(error);
        return res.status(500).send({message: 'General Error',error})
    }
}
export const changePassword = async (req, res) => {
    try {
        const { id } = req.params; 
        const { currentPassword, newPassword } = req.body; 
        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: 'User not found' });
        const passwordMatch = await checkPassword(user.password, currentPassword); 
        if (!passwordMatch) return res.status(400).send({ message: 'Incorrect password' });
        user.password = await encrypt(newPassword);
        await user.save();
        return res.send({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'General Error',error });
    }
}


export const deleteUser = async(req, res)=>{
    try {
        const id = req.params.id
        const deleteUser= await User.findByIdAndDelete(id)
        if (!deleteUser)return res.status(404).send({Message: 'User not found'})
            return res.send({message: 'User deleted succesfully'})
    } catch (err) {
        console.console.log(err);
        return res.status(500).send({message: 'General Error',err})
    }   
}