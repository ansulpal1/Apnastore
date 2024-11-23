
const forgotPasswordTemplate = ({ name, otp}) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background-color: #ff5722;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px;
            line-height: 1.6;
            color: #444;
          }
          .highlight {
            color: #ff5722;
            font-weight: bold;
          }
          .otp-box {
            margin: 20px 0;
            padding: 15px;
            background-color: #fff3e0;
            border: 2px dashed #ff5722;
            font-size: 20px;
            text-align: center;
            font-weight: bold;
            color: #d84315;
            letter-spacing: 2px;
          }
          .btn {
            display: inline-block;
            background-color: #ff5722;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            margin: 20px 0;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s;
          }
          .btn:hover {
            background-color: #e64a19;
          }
          .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #666;
            background-color: #f9f9f9;
          }
          .footer a {
            color: #ff5722;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">ApnaStore Password Reset</div>
          <div class="content">
            <p>Hi <span class="highlight">${name}</span>,</p>
            <p>We received a request to reset your password. Use the OTP below to proceed with resetting your password:</p>
            <div class="otp-box">${otp}</div>
            <p>Click the button below to reset your password quickly:</p>
           
            <p>If you didn't request this, you can  ignore this email or <a href="#">contact us</a>.</p>
          </div>
          <div class="footer">
            <p>Need help? <a href="#">Visit Support</a> or reply to this email.</p>
            <p>&copy; 2024 <strong>ApnaStore</strong>. All Rights Reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  export default forgotPasswordTemplate;
  