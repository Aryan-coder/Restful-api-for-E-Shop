const nodemailer = require('nodemailer');

let store = []

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: 'nodemailer2000@gmail.com',
       pass: 'nodemailer2000nodemailer2000'
    }
});

const generateOTP = () =>{
    return(Math.floor(100000 + Math.random() * 900000))
}

const deleteOTP = (email,otp) =>{
    store = store.filter(data=>data.otp!=otp && data.email != email)
}

const sendOTP = (email) => {

    const otp = generateOTP()

    const message = {
        from: 'nodemailer2000@gmail.com', 
        to: email,        
        subject: 'e-mail verification', 
        text: 'OTP - '+otp 
    };

    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
          store.push({email: email, otp: otp})
          setTimeout(60000,()=>{deleteOTP(email,otp)})
          return(otp)
        }
    });
    
}

const varifyOTP = (email,otp) =>{
    const varified = store.find(data=>data.email==email && data.otp == otp)
    if(varified){
        return(true)
    }
    return(false)
}

module.exports = {varifyOTP, sendOTP}