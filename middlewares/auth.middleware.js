const jwt  = require('jsonwebtoken')
const User = require('../api/models/user.model')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        
        const decoded  = jwt.verify(token, 'radhey')
       
        const user  = await User.findOne({ email:decoded.email, 'token': token})

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth