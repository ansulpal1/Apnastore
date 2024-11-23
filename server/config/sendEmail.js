import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();
//RESEND PAYED API CODE FOR PROFESSIONAL USE ONLY
// if(!process.env.RESEND_API){
//     console.error('RESEND_API is not set');
// }

// const resend = new Resend(process.env.RESEND_API);

// const sendEmail =async({sendTo,subject,html})=>{
//     try{
//         const { data, error } = await resend.emails.send({
//             from: 'ApnaStore <onboarding@resend.dev>',
//             to: sendTo,
//             subject: subject,
//             html: html,
//           });
//           if (error) {
//             return console.error({ error });
//           }
//           return data;
//     }catch(error){
//         console.error(error);

//     }
// }



// import nodemailer from 'nodemailer'



// const transporter = nodemailer.createTransport({
//     host:  process.env.SMPT_HOST,
//     port:process.env.SMPT_PORT,
//     secure: true, // true for port 465, false for other ports
//     auth: {
//       user:  process.env.SMPT_MAIL,
//       pass: process.env.SMPT_PASSWORD,
//     },
//   });
  
  
//   async function sendEmail({sendTo, subject, html }) {
    
//     const info = await transporter.sendMail({
//       from:  process.env.SMPT_MAIL,
//       to: sendTo,
//       subject: subject,
//       html: html
//     });
  
   
//   }
  
//   sendEmail().catch(console.error);

// export default sendEmail;




import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
    },
});

async function sendEmail({ sendTo, subject, html }) {
    try {
        const info = await transporter.sendMail({
            from:`"ApnaStore" <${process.env.SMPT_MAIL}>`,
            to: sendTo,
            subject: subject,
            html: html,
        });
        console.log("Email sent: %s", info.messageId);
        return info; 
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
}

export default sendEmail;

