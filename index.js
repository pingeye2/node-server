const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get('/',(req, res)=>{
    res.send('welcome to my portfolio')
})

app.post('/', (req,res)=>{

/* TODO - we need to create seperate threads to handle each request */
/* need to look at https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190*/

    let data = req.body
    let SMTPTransport = nodemailer.createTransport({
        service:'Gmail',
        port:465,
        auth:{
            user:'username', //email username and password
            pass: 'password'
        }
    });

    let mailOptions={
        from:data.email,
        to:'lankydragonqueries@gmail.com',
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