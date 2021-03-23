const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const readline = require('readline');
const fs = require('fs');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

let mainform = `<div><h1>HELLOE</h1>
<input type="text" id="name" placeholder="name">
<input type="text" id="email" placeholder="email">
<input type="text" id="subject" placeholder="subject">
<input type="text" id="message" placeholder="message">
<button onclick='formSubmit()'>submit</button>
<script src='validation.js'></script>
</div>`;

/* test form displayed on port 3001 */
app.get('/',(req, res)=>{
    res.send(mainform)
})

app.get('/validation.js',(req, res)=>{

    let fileContent = '';
 
    const readInterface = readline.createInterface({
        input: fs.createReadStream("C:\\Users\\deanl\\gittest\\node-server\\node-server\\validation.js"),
        //output: process.stdout,
        console: false
    });

    readInterface.on('line', function(line) {
       fileContent += line;
      });
      // possibly need to wait for promises
    // we need to wait unntil all of hte file has been read and then carry on here
    // we do not want to get here until all of the file is read into fileContents
console.log("fileContent is " + fileContent);
res.send(fileContent);
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