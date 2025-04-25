import nodeMailer from 'nodemailer'

export const sendEmail=async(req,res)=>{

    const transporter = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL,
            pass:process.env.GMAIL_PASS
        }
    })


    const {email}= req.body

    const mailOptions={
        from:'dikshantkhobragade12@gmail.com',
        to:email,
        subject:'Check out this app',
        html:htmlSyntax
    }

    try{
        await transporter.sendMail(mailOptions)
        res.json({ message: "Email sent successfully!" });
    }
    catch(err){
        console.log("Error while sending email",err)
        res.status(500).json({
            message:'Internal Server Error(EMAIL)'
        })
    }

}


const htmlSyntax=`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Check Our App</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd;">
          <tr>
            <td style="padding: 20px; text-align: center;">
              <h1 style="font-size: 24px; color: #333333; margin: 0 0 20px;">Discover Our Amazing App!</h1>
              <p style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px;">
                Ready to explore? Check out our app and experience its awesome features today!
              </p>
              <a href="https://chat-app-b431.onrender.com" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px;">Check the App Now</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
              <p style="font-size: 14px; color: #999999; margin: 0;">
                © 2025 YourAppName. All rights reserved.<br>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>`