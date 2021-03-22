const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

/* Use to send email from contact from to one address. */
app.get('/',(req, res)=>{
    res.send('welcome to my portfolio')
})

app.post('/', (req,res)=>{


    let data = req.body
    let SMTPTransport = nodemailer.createTransport({
        service:'Gmail', //email service
        port:465, //Email service port number (465 for Gmail)
        auth:{
            user:'username', //send from email account username 
            pass: 'password' //send from email account password
        }
    });

    let mailOptions={
        from:data.email,
        to:'example@gmail.com', //email send to address
        subject: `Message from ${data.name}`,
        html:`
        
        <h3>Info</h3>
         <ul>
          <li>Name: ${data.name}</li>
          <li>Email: ${data.email}</li>
          <li>Subject: ${data.subject}</li>
        </ul>

          <h3>Message</h3>
          <p>${data.message}</p>

        `
    };

    SMTPTransport.sendMail(mailOptions, (error, response) => {

        if(error){
            res.send(error)
        } else {
            res.send('Success')
        }
    })

    SMTPTransport.close();
})

const PORT = process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`server starting at port ${PORT}`);
})