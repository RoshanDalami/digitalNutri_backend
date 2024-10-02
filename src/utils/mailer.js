import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import nodemailer from 'nodemailer';
import { Code } from '../models/code.model.js';


export async function sendMail(email){
try {
  function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }
  
    const hashedToken = generateOTP();

    await Code.deleteMany({email:email});
    await Code.create({
      email:email,
      code:hashedToken,
      validTime : Date.now() + (36000 * 5)
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
export async function sendMailForgotPassword(email){
try {
  function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }
  
    const hashedToken = generateOTP();

    await Code.deleteMany({email:email});
    await Code.create({
      email:email,
      code:hashedToken,
      validTime : Date.now() + 36000
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
        from:'meroaahar2024@gmail.com',
        to : email ,
        subject: 'Password Reset',
        html:`<p> Your code for password reset is <h1>${hashedToken}</h1> </p>`
      }

      const mailresponse = await transport.sendMail
      (mailOptions);
      
      return mailresponse;
} catch (error) {
    console.log(error)
}
}