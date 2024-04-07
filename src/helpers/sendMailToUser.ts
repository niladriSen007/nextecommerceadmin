import { Admin } from '@/models/Admin';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

export const sendMailToUser = async (email: string, emailType: string, userId: string) => {
 try {
    const verifyTokenGenerator = uuidv4();
    const verifyTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    // Send email to user
    if(emailType == 'VERIFY'){
        await Admin.findByIdAndUpdate(userId,{
            $set:{
                verificationToken: verifyTokenGenerator,
                verificationTokenExpires: verifyTokenExpires
            }
        })
    }else{
        await Admin.findByIdAndUpdate(userId,{
            $set:{
                forgotPasswordToken: verifyTokenGenerator,
                forgotPasswordTokenExpires: verifyTokenExpires
            }
        })
    }


    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3de0ef750aa81b",
          pass: "9871fc2afa4e0a",
        },
      });

      const mailOptions = {
        from: "niladri@nil.com", // sender address
        to: email, // list of receivers
        subject:
          emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
        html: `<p>Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${verifyTokenGenerator}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }
          or copy and paste the link below in your browser. <br> ${
            process.env.DOMAIN
          }/verifyemail?token=${verifyTokenGenerator}
          </p>`,
      };

      const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", mailResponse.messageId);
    return mailResponse;
  


 } catch (error) {
    console.log("Error sending mail", error);
    throw new Error("Error sending mail");
 }
}