const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../model/user")
const { signupschema, signinschema } = require("../helpers/validator")
const user = require("../model/user")

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, username: name }, 'secretkey', {expiresIn: '15m'})
}

function generateRefreshToken(id, name) {
    return jwt.sign({ userId: id, username: name }, 'secretkey', {expiresIn: '7d'})
}

exports.signup = async (req, res) => {
    try {
        await signupschema.validateAsync(req.body)
        const { name, username, email, password } = req.body
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = new User({
                name,
                username,
                email,
                password: hash
            })
            await user.save(user)
            res.status(201).json({ message: 'Successfully created new user' })
        })

    } catch (err) {
        // console.log(err);
        res.status(400).json({ error: err })
    }

}
exports.signin = async (req, res) => {
    try {
        signinschema.validateAsync(req.body)
        const { email, password } = req.body
        console.log(req.body)
        const user = await User.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (err) {
                    throw new Error('Something went wrong!')
                }
                if (response === true) {
                    const token=generateAccessToken(user);
                    res.cookie('accesstoken', token,
                        { httpOnly: true, maxAge: 15 * 60 * 1000 })
                    res.cookie('refreshtoken', generateRefreshToken(user),
                        { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
                    res.status(200).json({
                        success: true,
                        message: "User logged in successfully",
                        token
                    })
                }
                else {
                    res.status(400).json({ success: true, message: "Password is incorrect"})
                }
            })
        } else {
            res.status(404).json({ success: true, message: "User doesn't exist" })
        }

    } catch (err) {
        console.log(err)
    }
}
// export const verifyToken=()=>{
//     try {
//         const Authorization = req.headers.authorization;
//         if (!Authorization) {
//           throw new Error("No token found!");
//         }
//         const accessToken = Authorization.replace('Bearer ', '');
//         if (!accessToken) {
//             throw new Error("No token found!");
//         }
//         const token = verifyToken(accessToken);
//         res.cookie('token', token, {
//           httpOnly: true,
//         });
//         res.send()
//       } catch (error) {
//         console.log(error)
//       }
// }
// export const changepassword=()=>{

// }
exports.logout=()=>{
    try{
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.send('logged out and token cleared!')
    }catch(err){

    }
}
// export const refreshToken=()=>{

// }
