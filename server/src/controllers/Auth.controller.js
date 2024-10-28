async function Auth(req,res,next) {
    res.status(200).json({user:{Email:req.user.Email,Name:req.user.Name},message:{sucess:true,msg:'Authorized'}});
}

export default Auth;