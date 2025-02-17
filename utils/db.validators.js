import User from '../src/user/user.model.js'

export const existUsername = async(username)=>{
    const alredyUsername = await User.findOne({username})
    if(alredyUsername){
        console.error(`Username ${username} is alredy taken.`)
        throw new Error(`Username ${username} is alredy taken.`)
    }
}