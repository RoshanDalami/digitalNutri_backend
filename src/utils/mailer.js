import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});


export async function sendMail(email,userId){
try {
  function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }
  
    const hashedToken = generateOTP()

    await User.findOneAndUpdate({_id:userId},{
        verificationToken:hashedToken,
        verificationTokenExpire:Date.now() + 3600
    })

    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
      const mailOptions = {
        from:'roshandalami0@gmail.com',
        to : email ,
        subject: 'Verify your email',
        html:`<p> Your verification Code is <h1>${hashedToken}</h1> </p>`
      }

      const mailresponse = await transport.sendMail
      (mailOptions);
      
      return mailresponse;
} catch (error) {
    console.log(error)
}
}