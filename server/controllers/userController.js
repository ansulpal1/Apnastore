import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import uploadImageClodinary from '../utils/uploadImageClodinary.js';
import gererateOtp from '../utils/gererateOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken'

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields',
                error:true,
                success:false
             });
        }
        const existingUser = await UserModel.findOne({ email });
       
        if (existingUser) {
            return res.status(400).json({ message: 'Email already Register',
                error:true,
                success:false
            })
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const payload={
            name,
            email,
            password:hashedPassword
        };
        const newUser = new UserModel(payload);
        const save=await newUser.save();
        const verifyEmailUrl=`${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail = await sendEmail({
            sendTo:email,
            subject:'Verify your email From ApnaStore',
            html:verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })
        return res.status(201).json({ message: 'User created successfully', 
            error:false,
            success:true,
            data: save
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false

        })

    }

}
//email verification

export async function verifyEmailController(req,res){
    try{

        const {code} =req.body;
        const user = await UserModel.findById({_id:code});
        if(!user){
            return res.status(400).json({ message: 'Invalid session',
                error:true,
                success:false
            })
        }
        const updateUser = await UserModel.updateOne({_id:code},{
            verify_email:true
        })
        return res.status(200).json({ message: 'Email verified successfully',
            error:false,
            success:true
        })

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
    
}

//login 
export async function loginController(req,res){
    try{
const {email,password}= req.body;

if ( !email || !password) {
    return res.status(400).json({ message: 'Please fill  all fields',
        error:true,
        success:false
     });
}
const user = await UserModel.findOne({email});
if(!user){
    return res.status(400).json({ message: 'User not Register ',
        error:true,
        success:false
    })
}
if(user.status== "Inactive" || user.status=="Suspended"){
    return res.status(400).json({ message: `Your account is ${user.status} Please contact on HelpDesk Email `,
        error:true,
        success:false
    })
}
const checkPassword = await bcryptjs.compare(password,user.password);
if(!checkPassword){
    return res.status(400).json({ message: 'Invalid Email or Password',
        error:true,
        success:false

    })
}

const accesstoken = await generatedAccessToken(user._id);
const refreshToken = await generatedRefreshToken(user._id);

const cookiesOption ={
    httpOnly: true,
   
    secure: true,
    sameSite: 'None',
}
res.cookie('accessToken',accesstoken,cookiesOption)
res.cookie('refreshToken',refreshToken,cookiesOption)

return res.json({message:'Login Successfully',
    error:false,
    success:true,
    data:{
        accesstoken,
        refreshToken
    }
})

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//logout
export async function logoutController(req,res){
    try{
        const userid = req.userId; 
        const cookiesOption ={
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }
        res.clearCookie("accessToken",cookiesOption)
        res.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken=await UserModel.findByIdAndUpdate(userid,{refresh_token:""})

        return res.json({
            message: 'Logout Successfully',
            error: false,
            success: true
        })

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
    
}
// upload user profile pic
export async function uploadAvatar(req, res) {
    try {
        const userid = req.userId; //auth
        const image = req.file //multer
        const upload = await uploadImageClodinary(image)
        const updateUser = await UserModel.findByIdAndUpdate(userid, { avatar: upload.url   })
        return res.json({
            message: 'Profile pic uploaded successfully',
            error: false,
            success: true,
            data:{
                _id:userid,
                avatar:upload.url
            }
        })
    
       

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

//update user details
export async function updateUserDetails(req, res) {
    try {
        const userid = req.userId; //auth
        const { name,mobile,password}=req.body;
        let hashPassword=""
        if(password){
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }
        const updateUser = await UserModel.updateOne({_id :userid}, {
            ...(name &&{name:name}),
           
            ...(mobile && {mobile:mobile}),
            ...(password && {password:hashPassword})

         })
         return res.json({
            message: 'User details updated successfully',
            error: false,
            success: true,
            data:updateUser
         })

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

        
    }

}
//forgot password
export async function forgotPasswordController(req, res) {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                message:"enter Email",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: 'User not found',
                error: true,
                success: false
            })
        }
        const otp = gererateOtp();
        const expireTime = new Date() +60*60*1000  //
        const updateOtp = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp:otp,
            forgot_password_expiry:new Date(expireTime).toISOString()
        })
        await sendEmail({
            sendTo:email,
            subject:" Forgot password recovery from apnaStore ",
            html:forgotPasswordTemplate({
                name:user.name,
                otp:otp
                
            })
    })


        return res.json({
            message: 'Otp sent to your email',
            error: false,
            success: true,
        })

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

//verify forgot  otp
export const verifyForgotPasswordOtp = async (req, res) => {
    try {
        
        const {email,otp} =req.body;
        if(!email || !otp){
            return res.status(400).json({
                message: 'Email and otp are required',
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: 'User not found',
                error: true,
                success: false
            })
        }
        const currentTime = new Date().toISOString;
        if( user.forgot_password_expiry < currentTime){
            return res.status(400).json({
                message: 'Otp expired',
                error: true,
                success: false
            })
        }
        if(user.forgot_password_otp !== otp){
            return res.status(400).json({
                message: 'Invalid otp',
                error: true,
                success: false
            })
        }

        return res.json({
            message: 'Otp verified successfully',
            error: false,
            success: true
        })




    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//reset password
export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message: 'Please fill all fields',
                error: true,
                success: false
            })
        }
        const user= await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: 'User not found',
                error: true,
                success: false
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: 'Passwords do not match',
                error: true,
                success: false
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        const updatePassword =await UserModel.findByIdAndUpdate(user._id,{
            password:hashedPassword
        })
        return res.json({
            message: 'Password reset successfully',
            error: false,
            success: true
        })



    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//refresh token ctroller
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];
        if (!refreshToken) {
            return res.status(401).json({
                message: 'Invalid token Login Please!!',
                error: true,
                success: false,
                });
        }
        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)
        if(!verifyToken){
            return res.status(401).json({
                message: 'Token expired',
                error: true,
                success: false

            })
        }
        const userId = verifyToken?._id
        const newAccessToken= await generatedAccessToken(userId)
        const cookiesOption ={
            httpOnly: true,
           
            secure: true,
            sameSite: 'None',
        }
        res.cookie('acccessToken',newAccessToken,cookiesOption)
        return res.json({
            message: ' New accessToken genreted successfully',
            error: false,
            success: true,
            data:{
                accessToken:newAccessToken

            }
        })


    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}