'use strict'

import jwt from 'jsonwebtoken'

export const validateJwt = async(req, res, next) => {
    try{
        let secretKey = process.env.SECRET_KEY
        let {token} = req.headers
        if(!token) return res.status(401).send(
            {
                message: 'Unauthorized'
            }
        )
        let user = jwt.verify(token, secretKey)
        req.user = user
        next()
    }catch(e){
        console.error(e)
        return res.status(401).send(
            {
                message: 'Invalid credentials'
            }
        )
    }
}