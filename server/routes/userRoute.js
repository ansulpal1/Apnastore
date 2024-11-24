import { Router } from "express";
import { forgotPasswordController, loginController, logoutController, refreshToken, registerUserController, resetPassword, updateUserDetails, uploadAvatar, userDetailes, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter =Router();
userRouter.post('/register',registerUserController);
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.post('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetPassword)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details',auth,userDetailes)


export default userRouter;
