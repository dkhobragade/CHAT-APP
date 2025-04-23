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
        html:'Check out this app'
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