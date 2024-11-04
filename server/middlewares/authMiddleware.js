const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')

exports.verify=(req,res,next)=>{
    try{
        const Authorization=req.headers.authorization;
        if(!Authorization){
            throw new Error('Invalid token!')
        }
        const accessToken=Authorization.replace(/^Bearer\s+/, '')
        if(!accessToken){
            throw new Error('invalid token!')
        }
        const token=
        jwt.verify('jwtsecert',(err,res)=>{

        })

    }catch(err){
        console.log(err)
    }
}