// domain.com/vertifytoken/ksjdfkjafks //this is batter for server components
// domain.com/vertifytoken?toke=dksjaslkfjksjll //this is better for client components

import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'def1b656d4450d',
        pass: '806df114df71ce',
        //TODO: add these credentials to .env file
      },
    });

    const mailOptions = {
      from: 'pranto@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'verify your email' : 'Reset your password',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a>to ${
        emailType === 'VERIFY' ? 'Verify your email' : 'reset your password'
      } or copy and pasete the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verify?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
