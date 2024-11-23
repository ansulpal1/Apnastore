import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const location =useLocation();
useEffect(()=>{
 if(!location?.state?.email){
     navigate('/forgot-password')
}
 },[])

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (value) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Automatically focus the next input if valid number
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleBackspace = (element, index) => {
    const updatedOtp = [...otp];
    if (otp[index] === "") {
      // Focus on the previous field if empty
      if (element.previousSibling) {
        element.previousSibling.focus();
      }
    } else {
      // Clear the current field
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: { otp: otpValue ,
            email: location?.state?.email
        },
        
      });
      

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setOtp(new Array(6).fill(""));
        navigate("/reset-password",
          {
            state: {
              data:response.data,
              email:location?.state?.email 
            }
          }
        );
      }
    } catch (error) {
       
      AxiosToastError(error);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");


//   ressend otp

const resendOtp = async (e) => {
    e.preventDefault()

    try {
        const response = await Axios({
            ...SummaryApi.forgot_password,
            data:{ 
                email:location?.state?.email
            }
        })
        if (response.data.error) {
            toast.error(response.data.message)
        }
        if (response.data.success) {
            toast.success("Otp resend to your email.")
           
            setOtp(new Array(6).fill(""));

        }
    } catch (error) {
        AxiosToastError(error)
    }


}

  return (
    <section className="w-full container mx-auto px-4">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <p className="font-semibold text-lg text-center">OTP Verification</p>
          <p className="text-center text-sm text-gray-600">
            Please enter the 6-digit OTP sent to your email.
          </p>
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") handleBackspace(e.target, index);
                }}
                className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:border-primary-200 bg-blue-50"
              />
            ))}
          </div>

          <button
            disabled={!isOtpComplete}
            className={`${
              isOtpComplete
                ? "bg-secondary-300 hover:bg-green-700"
                : "bg-gray-500"
            } text-white py-2 rounded-lg font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>
        <p className="text-center">
          Didn’t receive the OTP?{" "}
          <button
            type="button"
            className="font-semibold text-secondary-300 hover:text-green-800"
            onClick={resendOtp}
          >
            Resend
          </button>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
