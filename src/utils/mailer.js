import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});


export async function sendMail(email,userId){
try {
    const hashedToken = await bcrypt.hash(process.env.ACCESS_TOKEN,10);
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
        html:`<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email </p>`
      }

      const mailresponse = await transport.sendMail
      (mailOptions);
      
      return mailresponse;
} catch (error) {
    console.log(error)
}
}