const mailer = require("nodemailer");

// function

const sendingMail = async(to,subject,text)=>{
   
    //transporter
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"trupalm2211@gmail.com",
            pass:"eyyo orwk rgbi bprx"
        }
    })

    //mailOption (obj)
    const mailOption = {
        from:"trupalm2211@gmail.com",
        to:to,
        subject:subject,
        html: "<h1>"+text+"</h1>"
    }

    //mailres
    const mailRes = await transporter.sendMail(mailOption);
    console.log(mailRes);
    return mailRes
    
}
   
module.exports = {
    sendingMail
}
