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

/* test form displayed on port 3001 */
let mainForm = `<div>
<input type="text" id="name" placeholder="name">
<input type="text" id="email" placeholder="email">
<input type="text" id="subject" placeholder="subject">
<input type="text" id="message" placeholder="message">
<button onclick="formSubmit('http://localhost:3001')">submit</button>
<script src='validation.js'></script>
</div>`;


var validationStr = "";

/* test form displayed on port 3001 */
app.get('/',(req, res)=>{

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.send(mainform)
})

app.get('/validation.js',(req, res)=>{

    
res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
res.send(validationStr);

/* charlie change
const validation = () => {
    let fileContent = '';

    const readInterface = readline.createInterface({
        input: fs.createReadStream("C:\\Users\\charl\\OneDrive\\Desktop\\Opensource\\node-server\\node-server\\validation.js"), //file location on local
        //output: process.stdout, //logs file in console
        console: false
    });

    readInterface.on('line', function(line) {
    fileContent += line;
    });

    return fileContent;
}

//trying to get validation in string format before used on line 52
let file = validation();
console.log('myfile: ' + file);
*/

app.get('/',(req, res)=>{
    res.send(mainForm)

})

app.get('/validation.js',(req, res)=>{
    res.send(file);
})



app.post('/', (req,res)=>{

    console.log("POST RECVED->" + JSON.stringify(req.body));
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

function preReadValidation()
{

    
 
    const readInterface = readline.createInterface({
        input: fs.createReadStream("C:\\Users\\deanl\\gittest\\node-server\\node-server\\validation.js"),
        //output: process.stdout,
        console: false
    });

    readInterface.on('line', function(line) {
       validationStr += line;
      });
   

}

preReadValidation();
const PORT = process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`server starting at port ${PORT}`);
})