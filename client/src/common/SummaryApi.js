export const baseURL ="http://localhost:8080"

const SummaryApi={
    register :{
        url:'/api/user/register',
        method:'POST',
    },
    login:{
        url:'/api/user/login',
        method:'POST',
    },
    forgot_password:{
        url:'/api/user/forgot-password',
        method:'POST',

    },
    forgot_password_otp_verification:{
        url:'/api/user/verify-forgot-password-otp',
        method:'PUT',

    },
    resetPassword:{
        url:'/api/user/reset-password',
        method:'PUT',
    }

}
export default SummaryApi