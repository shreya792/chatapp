import jwt from 'jsonwebtoken'
const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        masAge:15*24*60*60*1000, //days*hours*min*seconds*ms
        httpOnly:true,//prevent XSS attacks cress-site scripting attacks
        sameSite:"strict" ,// prevent cross-site request forgery (CSRf)  attacks
        secure:process.env.NODE_ENV !=="development"
    })



}
export default generateTokenAndSetCookie;